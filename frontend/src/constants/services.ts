import { Code, BrainCircuit, Cloud, Shield, Database, Network } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ServiceDetailConfig {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  capabilities: { title: string; desc: string }[];
  techStack: string[];
  caseStudies: { title: string; outcome: string }[];
}

export const SERVICES: Record<string, ServiceDetailConfig> = {
  software: {
    id: 'software',
    title: 'Software Engineering',
    description: 'Enterprise architectures engineered for absolute scalability, extreme performance, and security.',
    icon: Code,
    capabilities: [
      { title: 'Custom Core Systems', desc: 'Bespoke ERPs, ledgers, and operations platforms.' },
      { title: 'Microservices Design', desc: 'Independent, resilient, and fault-isolated services.' },
      { title: 'Legacy Modernization', desc: 'Refactoring and cloud-native replatforming.' },
      { title: 'API Development', desc: 'Secure, high-performance REST and GraphQL APIs.' }
    ],
    techStack: ['React', 'Next.js', 'Node.js', 'Go', 'Rust', 'GraphQL'],
    caseStudies: [
      { title: 'Payment Infrastructure', outcome: 'Reduced latency to 180ms.' },
      { title: 'Supply Chain Visibility', outcome: 'Lowered fuel costs by 18%.' }
    ]
  },
  ai: {
    id: 'ai',
    title: 'Artificial Intelligence',
    description: 'Production-grade ML pipelines, NLP systems, and intelligent automation workflows.',
    icon: BrainCircuit,
    capabilities: [
      { title: 'AI Agents', desc: 'Autonomous agents for complex workflows.' },
      { title: 'LLM Integrations', desc: 'Custom trained models and fine-tuning.' },
      { title: 'RAG Systems', desc: 'Secure retrieval-augmented generation on proprietary data.' },
      { title: 'ML Pipelines', desc: 'Continuous model training and drift detection.' }
    ],
    techStack: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'LangChain'],
    caseStudies: [
      { title: 'Customer Support AI', outcome: 'Deflected 40% of tier 1 tickets.' },
      { title: 'Predictive Maintenance', outcome: 'Reduced downtime by 30%.' }
    ]
  },
  cloud: {
    id: 'cloud',
    title: 'Cloud & Infrastructure',
    description: 'Multi-cloud architectures, global networking, and resilient DevOps pipelines.',
    icon: Cloud,
    capabilities: [
      { title: 'Multi-Cloud Architecture', desc: 'AWS, Azure, and GCP strategies.' },
      { title: 'Kubernetes Orchestration', desc: 'Scalable container management.' },
      { title: 'DevOps Pipelines', desc: 'CI/CD automation and shift-left security.' },
      { title: 'Observability', desc: 'Full-stack monitoring and alerting.' }
    ],
    techStack: ['AWS', 'Azure', 'Kubernetes', 'Docker', 'Terraform'],
    caseStudies: [
      { title: 'Cloud Migration', outcome: 'Reduced hosting costs by 45%.' },
      { title: 'Global CDN Deployment', outcome: 'Sub-100ms global latency.' }
    ]
  },
  security: {
    id: 'security',
    title: 'Cybersecurity',
    description: 'Zero-trust architecture, SOC operations, and continuous threat monitoring.',
    icon: Shield,
    capabilities: [
      { title: 'Zero-Trust Networks', desc: 'Identity-aware infrastructure access.' },
      { title: 'Penetration Testing', desc: 'Automated and manual security audits.' },
      { title: 'Compliance Automation', desc: 'SOC 2, ISO 27001, PCI-DSS compliance.' },
      { title: 'Threat Intelligence', desc: 'Proactive defense and incident response.' }
    ],
    techStack: ['Wazuh', 'Splunk', 'CrowdStrike', 'HashiCorp Vault'],
    caseStudies: [
      { title: 'Enterprise Ransomware Defense', outcome: 'Zero successful breaches in 2 years.' },
      { title: 'Compliance Modernization', outcome: 'Achieved SOC 2 in 4 months.' }
    ]
  },
  data: {
    id: 'data',
    title: 'Data Systems',
    description: 'Real-time streaming, modern data warehouses, and intelligent analytics.',
    icon: Database,
    capabilities: [
      { title: 'Data Warehousing', desc: 'Snowflake and BigQuery implementations.' },
      { title: 'Streaming Pipelines', desc: 'Kafka-based real-time event processing.' },
      { title: 'Business Intelligence', desc: 'Interactive dashboards and reporting.' },
      { title: 'Data Governance', desc: 'Access controls and lineage tracking.' }
    ],
    techStack: ['Kafka', 'Snowflake', 'dbt', 'PostgreSQL', 'Redis'],
    caseStudies: [
      { title: 'Real-Time Analytics', outcome: 'Processed 10B+ events daily.' },
      { title: 'Data Lake Migration', outcome: 'Enabled 10x faster query execution.' }
    ]
  },
  managed: {
    id: 'managed',
    title: 'Managed Technology',
    description: 'SLA-backed support, reliability engineering, and technical advisory for production systems that need steady operational oversight.',
    icon: Cloud,
    capabilities: [
      { title: '24/7 Monitoring', desc: 'Continuous alerting, triage, and operational visibility for critical systems.' },
      { title: 'Incident Response', desc: 'Structured escalation, recovery coordination, and post-incident reviews.' },
      { title: 'Preventive Maintenance', desc: 'Patch management, performance tuning, and infrastructure hygiene.' },
      { title: 'Technical Advisory', desc: 'Roadmapping, capacity planning, and architecture guidance for internal teams.' }
    ],
    techStack: ['Grafana', 'Prometheus', 'Docker', 'Terraform', 'PostgreSQL'],
    caseStudies: [
      { title: 'Platform Operations Retainer', outcome: 'Reduced Sev-1 incident response time by 55%.' },
      { title: 'Reliability Improvement Program', outcome: 'Improved service availability to 99.95% across core workloads.' }
    ]
  },
  networking: {
    id: 'networking',
    title: 'Infrastructure & Networking',
    description: 'Enterprise networking, SD-WAN, and high-availability core routing.',
    icon: Network,
    capabilities: [
      { title: 'SD-WAN Deployments', desc: 'Global resilient network architecture.' },
      { title: 'Edge Computing', desc: 'Low-latency distributed processing.' },
      { title: 'Core Routing', desc: 'High-throughput enterprise backbones.' },
      { title: 'Network Security', desc: 'Next-gen firewalls and intrusion prevention.' }
    ],
    techStack: ['Cisco', 'Palo Alto', 'Juniper', 'Cloudflare'],
    caseStudies: [
      { title: 'Global Office Network', outcome: '99.999% uptime across 40 locations.' },
      { title: 'Edge Video Processing', outcome: 'Reduced streaming latency by 70%.' }
    ]
  }
};
