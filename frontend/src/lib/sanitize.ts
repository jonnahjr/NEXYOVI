/**
 * ════════════════════════════════════════════════════════════
 * 🔒 INPUT SANITIZATION UTILITY
 * Frontend input sanitization to prevent XSS and injection attacks
 * ════════════════════════════════════════════════════════════
 *
 * React's built-in JSX escaping handles most XSS prevention,
 * but we still sanitize user inputs before sending to the server
 * to prevent stored XSS and ensure data integrity.
 */

// Strip HTML tags from a string
export const stripHtml = (value: string): string => {
  return value.replace(/<[^>]*>/g, '');
};

// Trim whitespace and limit length
export const sanitizeText = (value: string, maxLength: number = 5000): string => {
  if (typeof value !== 'string') return '';
  return stripHtml(value).trim().substring(0, maxLength);
};

// Sanitize email: lowercase, trim, basic format check
export const sanitizeEmail = (email: string): string => {
  if (typeof email !== 'string') return '';
  return email.trim().toLowerCase().substring(0, 320);
};

// Sanitize URL: basic validation, strip dangerous protocols
export const sanitizeUrl = (url: string): string => {
  if (typeof url !== 'string') return '';
  const trimmed = url.trim().substring(0, 2000);
  // Only allow http, https, mailto, tel protocols
  if (/^(https?:\/\/|mailto:|tel:)/i.test(trimmed)) {
    return trimmed;
  }
  // If no protocol, prepend https://
  if (trimmed.includes('.')) {
    return `https://${trimmed}`;
  }
  return '';
};

// Sanitize phone number: keep only digits, +, -, (, ), spaces
export const sanitizePhone = (phone: string): string => {
  if (typeof phone !== 'string') return '';
  return phone.replace(/[^0-9+\-() ]/g, '').trim().substring(0, 20);
};

// Check if a string contains suspicious patterns (XSS attempts)
export const containsXssPattern = (value: string): boolean => {
  if (typeof value !== 'string') return false;
  const suspicious = [
    /<script[\s>]/i,
    /javascript\s*:/i,
    /onerror\s*=/i,
    /onload\s*=/i,
    /onclick\s*=/i,
    /onmouseover\s*=/i,
    /onfocus\s*=/i,
    /onblur\s*=/i,
    /onchange\s*=/i,
    /onsubmit\s*=/i,
    /expression\s*\(/i,
    /vbscript\s*:/i,
    /data\s*:\s*text\/html/i,
    /<embed[\s>]/i,
    /<object[\s>]/i,
    /<iframe[\s>]/i,
    /<frame[\s>]/i,
    /<form[\s>]/i,
    /<input[\s>]/i,
    /<svg[\s>]/i,
    /<math[\s>]/i,
    /&#x?[0-9a-f]{2,8};/i,  // Hex/dec entities (potential obfuscation)
    /\\x[0-9a-f]{2}/i,       // Hex escapes
    /\\u[0-9a-f]{4}/i,       // Unicode escapes
  ];
  return suspicious.some(pattern => pattern.test(value));
};

// Sanitize form data object recursively
export const sanitizeFormData = <T extends Record<string, any>>(data: T): T => {
  const sanitized: Record<string, any> = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeText(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = Array.isArray(value)
        ? value.map(item => typeof item === 'string' ? sanitizeText(item) : item)
        : sanitizeFormData(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized as T;
};

// Validate form data and return errors object
export const validateFormData = (
  data: Record<string, any>,
  rules: Record<string, { required?: boolean; email?: boolean; minLength?: number; maxLength?: number; pattern?: RegExp; custom?: (value: any) => string | null }>
): Record<string, string> => {
  const errors: Record<string, string> = {};

  for (const [field, rule] of Object.entries(rules)) {
    const value = data[field];

    // Check required
    if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
      errors[field] = `${field} is required`;
      continue;
    }

    if (!value) continue;

    const strValue = String(value);

    // Check min length
    if (rule.minLength && strValue.length < rule.minLength) {
      errors[field] = `${field} must be at least ${rule.minLength} characters`;
    }

    // Check max length
    if (rule.maxLength && strValue.length > rule.maxLength) {
      errors[field] = `${field} must not exceed ${rule.maxLength} characters`;
    }

    // Check email format
    if (rule.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(strValue)) {
      errors[field] = `Invalid email format`;
    }

    // Check pattern
    if (rule.pattern && !rule.pattern.test(strValue)) {
      errors[field] = `${field} has invalid format`;
    }

    // Custom validation
    if (rule.custom) {
      const customError = rule.custom(value);
      if (customError) {
        errors[field] = customError;
      }
    }

    // Check for XSS patterns
    if (containsXssPattern(strValue)) {
      errors[field] = `${field} contains invalid characters`;
    }
  }

  return errors;
};

/**
 * ════════════════════════════════════════════════════════════
 * USAGE EXAMPLES:
 *
 * // In a form component:
 * import { sanitizeText, validateFormData } from '../lib/sanitize';
 *
 * const handleSubmit = (e) => {
 *   e.preventDefault();
 *   const formData = { name: sanitizeText(inputName), email: sanitizeEmail(inputEmail) };
 *   const errors = validateFormData(formData, {
 *     name: { required: true, maxLength: 100 },
 *     email: { required: true, email: true, maxLength: 320 },
 *   });
 *   if (Object.keys(errors).length > 0) return setErrors(errors);
 *   // Submit sanitized data
 * };
 * ════════════════════════════════════════════════════════════
 */
