import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Send, Shield, X } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import chatbotLogo from '../assets/ChatGPT Image May 18, 2026, 10_08_54 AM.png';
import { useToast } from '../context/ToastContext';
import { containsXssPattern, sanitizeText, stripHtml } from '../lib/sanitize';

// ════════════════════════════════════════════════════════════
// 🔒 AI SECURITY CONFIGURATION
// ════════════════════════════════════════════════════════════

// Max message length
const MAX_MESSAGE_LENGTH = 2000;

// Rate limiting: max messages per time window
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const RATE_LIMIT_MAX_MESSAGES = 10;

// Prompt injection patterns to block
const PROMPT_INJECTION_PATTERNS = [
  // Classic injections
  /ignore\s+(all\s+)?(previous|above|prior)\s+instructions/i,
  /ignore\s+(everything|all)\s+(i|and)\s+(said|wrote|typed)/i,
  /forget\s+(all\s+)?(previous|above|prior)\s+instructions/i,
  /disregard\s+(all\s+)?(previous|above|prior)\s+instructions/i,
  
  // System prompt extraction
  /print\s+(your\s+)?(system\s+)?prompt/i,
  /reveal\s+(your\s+)?(system\s+)?prompt/i,
  /what\s+is\s+your\s+(system\s+)?prompt/i,
  /show\s+(me\s+)?(your\s+)?(system\s+)?(prompt|instructions)/i,
  /output\s+(your\s+)?(system\s+)?(prompt|instructions)/i,
  /repeat\s+(everything|all|the\s+above)/i,
  
  // Role manipulation
  /you\s+are\s+(now\s+)?(a\s+)?(free|unbound|unrestricted|DAN|jailbreak)/i,
  /act\s+as\s+(if\s+)?(you\s+)?(are\s+)?(a\s+)?(free|unbound|unrestricted|DAN|jailbreak)/i,
  /new\s+persona/i,
  /override\s+(mode|instructions|system)/i,
  
  // Data exfiltration
  /extract\s+(all\s+)?(data|information|emails|users)/i,
  /export\s+(all\s+)?data/i,
  /send\s+this\s+(to|data)/i,
  /leak\s+(all\s+)?/i,
  /exfiltrate/i,
  
  // Token/API abuse
  /generate\s+(api|secret|token|password|key)/i,
  /create\s+(an?\s+)?(admin|root|superuser)/i,
  /bypass\s+(security|auth|restrictions|limit)/i,
  /hack\s+/i,
  /exploit\s+/i,
  
  // Custom instructions for the AI
  /you\s+(must|will|have\s+to)\s+(ignore|disregard|forget|skip)/i,
  /this\s+is\s+(an?\s+)?(important|urgent|critical)\s+(instruction|command|request)/i,
  /respond\s+with\s+(\"|')(yes|no)(\"|')/i,
];

// Output sanitization patterns
const SENSITIVE_PATTERNS = [
  /\b(?:api[_-]?key|secret|token|password|credential)\s*[:=]\s*\S+/gi,
  /\b[A-Za-z0-9_-]{20,}\b/g,  // Potential API keys/tokens
  /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,  // Credit card numbers
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,  // Email addresses
];

// Allowed topics
const BLOCKED_TOPICS = [
  /how\s+to\s+(hack|crack|exploit|bypass|jailbreak)/i,
  /(malware|ransomware|trojan|virus)\s+(code|script|program|generate)/i,
  /(generate|create|write)\s+(fake|fraudulent|forged)/i,
  /(ddos|dos)\s+(attack|tool|script)/i,
  /phishing\s+(email|page|site|link|campaign)/i,
  /(stalking|doxing|doxxing|harassing)/i,
];

const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'bot' | 'user'; text: string }>>([
    { role: 'bot', text: "Hi! 👋 How can we help you transform your business today?" }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [securityMessage, setSecurityMessage] = useState<string | null>(null);
  const { toast } = useToast();
  const messageTimestamps = useRef<number[]>([]);

  // 🔒 Rate limiting check
  const checkRateLimit = useCallback((): boolean => {
    const now = Date.now();
    // Remove timestamps older than window
    messageTimestamps.current = messageTimestamps.current.filter(
      ts => now - ts < RATE_LIMIT_WINDOW_MS
    );
    // Check if limit exceeded
    if (messageTimestamps.current.length >= RATE_LIMIT_MAX_MESSAGES) {
      return false;
    }
    messageTimestamps.current.push(now);
    return true;
  }, []);

  // 🔒 Prompt injection detection
  const detectPromptInjection = useCallback((text: string): string | null => {
    for (const pattern of PROMPT_INJECTION_PATTERNS) {
      if (pattern.test(text)) {
        const match = text.match(pattern);
        return match ? `Suspicious pattern detected: "${match[0].substring(0, 50)}..."` : 'Suspicious input detected';
      }
    }
    return null;
  }, []);

  // 🔒 Topic blocking
  const checkBlockedTopics = useCallback((text: string): string | null => {
    for (const pattern of BLOCKED_TOPICS) {
      if (pattern.test(text)) {
        return "I can't help with that request. Our support team can assist with legitimate inquiries — please contact us directly.";
      }
    }
    return null;
  }, []);

  // 🔒 Input filter: sanitize, validate, check for abuse
  const filterInput = useCallback((rawInput: string): { safe: boolean; sanitized: string; error?: string } => {
    // Strip HTML tags
    const noHtml = stripHtml(rawInput);
    
    // Trim and limit length
    const trimmed = noHtml.trim().substring(0, MAX_MESSAGE_LENGTH);
    
    if (!trimmed) {
      return { safe: false, sanitized: '', error: 'Please enter a message.' };
    }

    // Check rate limit
    if (!checkRateLimit()) {
      return { safe: false, sanitized: '', error: 'You\'re sending messages too quickly. Please wait a moment.' };
    }

    // Check for prompt injection
    const injectionDetected = detectPromptInjection(trimmed);
    if (injectionDetected) {
      console.warn('[AI_SECURITY] Prompt injection blocked:', injectionDetected);
      return { safe: false, sanitized: trimmed, error: injectionDetected };
    }

    // Check for XSS patterns
    if (containsXssPattern(trimmed)) {
      console.warn('[AI_SECURITY] XSS pattern blocked in chat input');
      return { safe: false, sanitized: trimmed, error: 'Invalid characters detected.' };
    }

    // Check blocked topics
    const topicBlocked = checkBlockedTopics(trimmed);
    if (topicBlocked) {
      return { safe: false, sanitized: trimmed, error: topicBlocked };
    }

    return { safe: true, sanitized: trimmed };
  }, [checkRateLimit, detectPromptInjection, checkBlockedTopics]);

  // 🔒 Output sanitizer: strip sensitive data before displaying
  const sanitizeOutput = useCallback((text: string): string => {
    let sanitized = text;
    // Mask sensitive patterns
    for (const pattern of SENSITIVE_PATTERNS) {
      sanitized = sanitized.replace(pattern, '[REDACTED]');
    }
    return sanitized;
  }, []);

  // 🔒 Handle sending a message
  const handleSend = () => {
    if (!inputValue.trim() || isProcessing) return;

    // Run input through security filter
    const filtered = filterInput(inputValue);
    
    if (!filtered.safe) {
      if (filtered.error) {
        // Show error as a bot message (not a toast for injection attempts - silent fail)
        const isInjection = filtered.error.includes('Suspicious pattern');
        if (isInjection) {
          // For injection attempts, just add a neutral message (don't reveal detection)
          setMessages(prev => [
            ...prev,
            { role: 'user', text: sanitizeText(inputValue, 100) + '...' },
            { role: 'bot', text: "I'm not sure how to help with that. Could you rephrase your question? I can help with inquiries about our engineering services, AI solutions, cybersecurity, and cloud infrastructure." }
          ]);
        } else {
          // For other security issues, show the error
          setMessages(prev => [
            ...prev,
            { role: 'bot', text: filtered.error! }
          ]);
          setSecurityMessage(filtered.error);
          setTimeout(() => setSecurityMessage(null), 5000);
        }
      }
      setInputValue('');
      return;
    }

    // Add user message
    setMessages(prev => [...prev, { role: 'user', text: filtered.sanitized }]);
    setIsProcessing(true);
    setInputValue('');

    // Simulate AI processing with sanitized output
    setTimeout(() => {
      const botResponse = generateResponse(filtered.sanitized);
      const sanitizedResponse = sanitizeOutput(botResponse);
      setMessages(prev => [...prev, { role: 'bot', text: sanitizedResponse }]);
      setIsProcessing(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[360px] bg-[#111827] border border-white/10 rounded-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={chatbotLogo}
                  alt="Nexyovi"
                  className="w-8 h-8 rounded-full object-cover relative"
                />
                <div>
                  <h4 className="text-white font-bold text-xs">Nexyovi Assistant</h4>
                  <p className="text-emerald-400 text-xs font-black uppercase tracking-widest">Online</p>
                </div>
              </div>
              {/* Security indicator */}
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-emerald-400/60" />
                <button onClick={() => setChatOpen(false)} className="text-white/60 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 h-[300px] overflow-y-auto bg-black/40 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3 ${
                    msg.role === 'user'
                      ? 'bg-[#F5A800] text-black rounded-tr-sm'
                      : 'bg-white/10 border border-white/5 text-white/90 rounded-tl-sm'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-white/10 border border-white/5 rounded-2xl rounded-tl-sm p-3">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Security warning */}
            <AnimatePresence>
              {securityMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 py-2 bg-amber-500/10 border-t border-amber-500/20 flex items-center gap-2"
                >
                  <AlertTriangle size={12} className="text-amber-400 shrink-0" />
                  <p className="text-amber-400 text-[10px] font-medium">{securityMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  // Limit input length client-side
                  if (e.target.value.length <= MAX_MESSAGE_LENGTH) {
                    setInputValue(e.target.value);
                  }
                }}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                placeholder="Ask about our services..."
                maxLength={MAX_MESSAGE_LENGTH}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 pb-3 pr-10 text-sm text-white focus:outline-none focus:border-[#F5A800] transition-colors placeholder:text-white/50"
                disabled={isProcessing}
              />
              <button
                onClick={handleSend}
                disabled={isProcessing || !inputValue.trim()}
                className="absolute right-7 top-1/2 -translate-y-1/2 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
              <p className="text-white/20 text-[9px] mt-1 text-right font-mono">
                {inputValue.length}/{MAX_MESSAGE_LENGTH}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setChatOpen(!chatOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
          chatOpen ? 'bg-white/10 border border-white/20 text-white' : 'bg-[#F5A800] text-white'
        }`}
      >
        {chatOpen ? <X size={24} /> : <div className="w-6 h-6 rounded-full border-[3px] border-white relative"><div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-white" /></div>}
      </button>
    </div>
  );
};

// 🔒 Safe response generator (no external AI calls yet - static responses)
function generateResponse(input: string): string {
  const lower = input.toLowerCase();
  
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return "Hello! 👋 I'm the Nexyovi assistant. I can help you with information about our software engineering, AI solutions, cybersecurity, cloud infrastructure, and enterprise networking services. What are you interested in?";
  }
  
  if (lower.includes('service') || lower.includes('offer') || lower.includes('capability')) {
    return "Nexyovi offers four core capabilities:\n\n**1. Software Engineering** — Custom platforms, SaaS products, and enterprise applications.\n**2. AI & Automation** — Predictive models, intelligent agents, and custom LLM integrations.\n**3. Cloud & Infrastructure** — Zero-trust networks, cloud architecture, and reliability engineering.\n**4. Cybersecurity** — Security audits, hardening, compliance, and threat monitoring.\n\nWhich area interests you most?";
  }
  
  if (lower.includes('contact') || lower.includes('email') || lower.includes('reach')) {
    return "You can reach us at:\n📧 info@nexyovi.com\n📞 +251 93 861 7252\n📍 Addis Ababa, Ethiopia\n\nOr submit a project inquiry through our Contact page!";
  }
  
  if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing') || lower.includes('budget')) {
    return "Our engagements are tailored to each client's specific needs. We offer flexible engagement models including team augmentation, project-based delivery, and managed services. Book a strategy call for a custom quote!";
  }
  
  if (lower.includes('ai') || lower.includes('machine learning') || lower.includes('llm')) {
    return "Our AI practice covers:\n• Custom LLM integration and fine-tuning\n• Predictive analytics and forecasting models\n• Intelligent process automation\n• Computer vision solutions\n• Natural language processing\n\nWe work with OpenAI, Anthropic, and open-source models. What's your use case?";
  }
  
  if (lower.includes('security') || lower.includes('cyber') || lower.includes('pentest')) {
    return "Our cybersecurity services include:\n• Comprehensive security audits (OWASP, NIST)\n• Penetration testing\n• Infrastructure hardening\n• Compliance readiness (GDPR, SOC 2, HIPAA)\n• Security monitoring setup\n• Incident response planning\n\nWe're a security-first organization ourselves — all our systems run with enterprise-grade protection.";
  }

  return "Thanks for your message! Our team will review your inquiry and get back to you. For immediate assistance, please email info@nexyovi.com or call +251 93 861 7252.";
}

export default Chatbot;
