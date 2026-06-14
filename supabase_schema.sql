-- ============================================================
-- Nexyovi Complete Database Schema
-- Uses Supabase Native Auth (GoTrue) for Admin Login
-- IDEMPOTENT: Safe to run multiple times in Supabase SQL Editor
-- Last Updated: 2026-06-11
-- ============================================================

-- ── STEP 1: CREATE YOUR ADMIN USER ──────────────────────────
-- DO NOT use SQL to create the admin user — it is unreliable on hosted Supabase.
--
-- Instead, create the user in the Supabase Dashboard:
--   1. Go to Authentication → Users
--   2. Click "Add user" → "Create new user"
--   3. Email:    admin@nexyovi.com
--   4. Password: (your password)
--   5. ✅ Check "Auto Confirm User"
--   6. Click "Create User"
--
-- After creating the user there, your /admin login will work immediately.
-- ─────────────────────────────────────────────────────────────

-- ── STEP 1b: ENABLE REALTIME ON KEY TABLES ────────────────────
-- Run this so the admin dashboard gets live updates instantly.
-- (Safe to run multiple times)
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.jobs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.testimonials;
ALTER PUBLICATION supabase_realtime ADD TABLE public.team;
ALTER PUBLICATION supabase_realtime ADD TABLE public.partners;
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_content;
ALTER PUBLICATION supabase_realtime ADD TABLE public.settings;
-- ─────────────────────────────────────────────────────────────

-- ============================================================
-- STEP 2: TABLES
-- ============================================================

-- ── JOBS TABLE ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.jobs (
  id          uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  title       text    NOT NULL,
  department  text    NOT NULL,
  location    text    NOT NULL,
  type        text    NOT NULL,
  description text,
  created_at  timestamptz DEFAULT timezone('utc', now()) NOT NULL
);

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read jobs"  ON public.jobs;
DROP POLICY IF EXISTS "Public manage jobs" ON public.jobs;
CREATE POLICY "Public read jobs"   ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Public manage jobs" ON public.jobs FOR ALL    USING (true);

-- Seed real job openings
INSERT INTO public.jobs (title, department, location, type, description) VALUES
(
  'Senior Full Stack Engineer',
  'Engineering',
  'Addis Ababa, Ethiopia (Hybrid)',
  'Full-time',
  'We are looking for a seasoned Full Stack Engineer to design, build, and maintain scalable web applications. You will work across the entire stack — React/TypeScript on the frontend, Node.js/Python on the backend — and collaborate with our product and design teams to ship high-quality features. 5+ years of experience required.'
),
(
  'AI/ML Engineer',
  'Artificial Intelligence',
  'Addis Ababa, Ethiopia (On-site)',
  'Full-time',
  'Join our AI team to build cutting-edge machine learning models and intelligent agents. You will develop predictive models, fine-tune LLMs, and integrate AI capabilities into our client platforms. Proficiency in Python, PyTorch/TensorFlow, and experience with MLOps pipelines required.'
),
(
  'DevOps & Cloud Engineer',
  'Infrastructure',
  'Remote (Africa)',
  'Full-time',
  'Own our cloud infrastructure on AWS and Azure. Design CI/CD pipelines, manage Kubernetes clusters, implement monitoring and observability, and ensure 99.9% uptime for all client systems. Terraform, Docker, and strong Linux skills required.'
),
(
  'Cybersecurity Analyst',
  'Security',
  'Addis Ababa, Ethiopia (On-site)',
  'Full-time',
  'Protect our clients'' critical infrastructure. Perform penetration testing, security audits, vulnerability assessments, and build automated threat detection systems. Experience with OWASP, network security, and incident response required.'
),
(
  'Mobile Application Developer',
  'Engineering',
  'Addis Ababa, Ethiopia (Hybrid)',
  'Full-time',
  'Build beautiful, high-performance mobile applications for iOS and Android using React Native and Flutter. You will work with enterprise clients to deliver apps with millions of users. 3+ years of mobile development experience required.'
),
(
  'Backend Developer (Python/Node.js)',
  'Engineering',
  'Remote (Africa)',
  'Full-time',
  'Design and build robust REST APIs, microservices, and data pipelines. Work with PostgreSQL, Redis, and message queues to power high-traffic systems. Experience with distributed systems and API security is a plus.'
),
(
  'UI/UX Designer',
  'Design',
  'Addis Ababa, Ethiopia (Hybrid)',
  'Full-time',
  'Craft stunning, accessible, and user-centric interfaces for enterprise software. You will own the design process from research and wireframing to high-fidelity prototypes and design systems. Proficiency in Figma required.'
),
(
  'Project Manager / Scrum Master',
  'Operations',
  'Addis Ababa, Ethiopia (On-site)',
  'Full-time',
  'Lead cross-functional engineering teams to deliver complex software projects on time and within budget. Facilitate Agile ceremonies, manage client relationships, and ensure delivery excellence. PMP or Scrum certification preferred.'
)
ON CONFLICT DO NOTHING;


-- ── TESTIMONIALS TABLE ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.testimonials (
  id         uuid  DEFAULT gen_random_uuid() PRIMARY KEY,
  author     text  NOT NULL,
  role       text  NOT NULL,
  content    text  NOT NULL,
  image_url  text,
  linkedin   text,
  created_at timestamptz DEFAULT timezone('utc', now()) NOT NULL
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read testimonials"   ON public.testimonials;
DROP POLICY IF EXISTS "Public manage testimonials" ON public.testimonials;
CREATE POLICY "Public read testimonials"   ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public manage testimonials" ON public.testimonials FOR ALL    USING (true);

-- Add linkedin column if it doesn't exist yet (safe migration)
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS linkedin text;

INSERT INTO public.testimonials (author, role, content, linkedin) VALUES
(
  'Yonas Bogale',
  'Founder & CEO, Nexyovi',
  'At Nexyovi, we don''t just build software — we build the infrastructure that powers organizations across Africa and beyond. Every project we take on is a commitment to excellence, security, and real impact.',
  'https://www.linkedin.com/in/yonas-bogale'
),
(
  'Amadou Daffe',
  'CEO & Co-Founder, Gebeya',
  'They connected us with top-tier Ethiopian engineering talent and built our core platform in parallel. They brought deep technical expertise and a true partnership mindset. Our time-to-market dropped dramatically. Gebeya''s collaboration with Nexyovi has been transformative for our pan-African expansion.',
  'https://et.linkedin.com/in/amadoudaffe'
),
(
  'Rediet Tsigeberhan',
  'CEO, Arifpay',
  'We needed a secure payment gateway that could handle Ethiopia''s unique banking landscape. Nexyovi built it — integrating with four banks and processing live transactions on day one. Their focus on security and reliability has been a game-changer for our platform.',
  'https://www.linkedin.com/in/rediet-tsigeberhan-97615642'
),
(
  'Dr. Elias Tadesse',
  'Chief Innovation Officer, NIB International Bank',
  'Nexyovi engineered a foundational AI ecosystem that allowed us to scale transaction volume by 400% without added latency. Their technical superiority is undeniable.',
  NULL
),
(
  'Dawit Mekonnen',
  'Chief Technology Officer, Ministry of Health',
  'They delivered our health infrastructure platform ahead of schedule, navigating complex compliance requirements seamlessly. The system now serves users across regional hospitals and clinics nationwide.',
  'https://linkedin.com'
),
(
  'Tigist Hailemariam',
  'Head of Digital, Commercial Bank of Ethiopia',
  'We needed a complete digital transformation — from legacy systems to modern cloud infrastructure. Nexyovi handled the migration with zero downtime and trained our team on the new stack. Their engineering discipline is world-class.',
  NULL
),
(
  'Binyam Alemu',
  'VP of Product, Ethio Telecom',
  'The mobile app they built for us had over 50k downloads in the first month. But what impressed me most was how they thought about scalability from day one — we haven''t had a single performance issue even as traffic grew.',
  NULL
)
ON CONFLICT DO NOTHING;


-- ── TEAM TABLE ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.team (
  id         uuid  DEFAULT gen_random_uuid() PRIMARY KEY,
  name       text  NOT NULL,
  role       text  NOT NULL,
  bio        text  NOT NULL,
  img        text,
  linkedin   text,
  initials   text,
  color      text,
  created_at timestamptz DEFAULT timezone('utc', now()) NOT NULL
);

ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read team"   ON public.team;
DROP POLICY IF EXISTS "Public manage team" ON public.team;
CREATE POLICY "Public read team"   ON public.team FOR SELECT USING (true);
CREATE POLICY "Public manage team" ON public.team FOR ALL    USING (true);

-- Add columns if they don't exist yet (safe migration)
ALTER TABLE public.team ADD COLUMN IF NOT EXISTS linkedin  text;
ALTER TABLE public.team ADD COLUMN IF NOT EXISTS initials  text;
ALTER TABLE public.team ADD COLUMN IF NOT EXISTS color     text;

INSERT INTO public.team (name, role, bio, linkedin, initials, color) VALUES
('Yonas Bogale', 'Founder & CEO', 'Visionary leader with 12+ years in tech and business strategy across two continents. Drives Nexyovi''s mission to become Africa''s leading technology firm.', 'https://www.linkedin.com/in/yonas-bogale/', 'YB', '#F5A800'),
('Amanuel Tesfaye', 'Chief Technology Officer', 'Software architect and engineer with deep expertise in distributed systems, cloud infrastructure, and AI/ML deployment at scale.', 'https://linkedin.com/in/amanuel-tesfaye/', 'AT', '#8b5cf6'),
('Selamawit Hailu', 'Chief Product Officer', 'Leads product vision and strategy. Passionate about building scalable systems and ensuring user-centric design across all client engagements.', 'https://linkedin.com/in/selamawit-hailu/', 'SH', '#10b981'),
('Eyerusalem Bogale', 'VP of Operations', 'Operations leader with 10+ years driving efficiency and scaling processes across tech startups. Keeps delivery running like clockwork.', 'https://linkedin.com/in/eyerusalem-bogale', 'EB', '#ff7f50'),
('Mikayel Alemu', 'Full Stack Engineer', 'Expert in React, Node.js, and PostgreSQL. Builds the full-stack foundation that every enterprise project relies on.', '#', 'MK', '#ef4444'),
('Sara Denbel', 'Mobile Application Developer', 'Specialist in React Native and Flutter. Delivers high-performance mobile apps for iOS and Android with millions of users.', '#', 'SD', '#14b8a6'),
('Henok Alemu', 'DevOps Engineer', 'Keeps everything running — cloud infrastructure, CI/CD pipelines, Kubernetes deployments, and 99.9% uptime SLAs.', '#', 'HA', '#06b6d4'),
('Betelhem Assefa', 'AI/ML Engineer', 'Builds predictive models and intelligent agents that automate complex workflows and deliver measurable business outcomes.', '#', 'BA', '#F5A800'),
('Nahom Girmachew', 'Backend Developer', 'Powers APIs, data pipelines, and business logic. Expert in Python, Node.js, microservices, and high-throughput distributed systems.', '#', 'NG', '#a855f7'),
('Biruk Mamo', 'Security Engineer', 'Hardens infrastructure, performs penetration testing, and builds automated threat detection. Ensures Nexyovi''s security-first promise.', '#', 'BM', '#84cc16'),
('Liya Wondesen', 'Data Engineer', 'Designs and maintains data infrastructure, ETL pipelines, and analytics platforms that power client insights.', '#', 'LW', '#0ea5e9'),
('Tsion Wondimu', 'Project Manager', 'Certified Scrum Master and PMP who ensures every project is delivered on time, within scope, and to the highest quality standard.', '#', 'TW', '#f59e0b')
ON CONFLICT DO NOTHING;


-- ── MESSAGES TABLE ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.messages (
  id         uuid  DEFAULT gen_random_uuid() PRIMARY KEY,
  name       text  NOT NULL,
  email      text  NOT NULL,
  company    text,
  service    text,
  message    text  NOT NULL,
  status     text  DEFAULT 'unread',
  created_at timestamptz DEFAULT timezone('utc', now()) NOT NULL
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can insert messages" ON public.messages;
DROP POLICY IF EXISTS "Anyone can manage messages" ON public.messages;
CREATE POLICY "Anyone can insert messages" ON public.messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can manage messages" ON public.messages FOR ALL    USING (true);


-- ── SETTINGS TABLE ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.settings (
  id           text PRIMARY KEY,
  org_name     text NOT NULL,
  email        text NOT NULL,
  phone        text NOT NULL,
  address      text NOT NULL,
  logo_url     text,
  social_links jsonb,
  updated_at   timestamptz DEFAULT timezone('utc', now()) NOT NULL
);

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read settings"   ON public.settings;
DROP POLICY IF EXISTS "Public manage settings" ON public.settings;
CREATE POLICY "Public read settings"   ON public.settings FOR SELECT USING (true);
CREATE POLICY "Public manage settings" ON public.settings FOR ALL    USING (true);

INSERT INTO public.settings (id, org_name, email, phone, address, logo_url, social_links)
VALUES (
  'global',
  'Nexyovi',
  'contact@nexyovi.com',
  '+251945628075',
  'Bole Sub-city, Wereda 03, Bole Road near Edna Mall, Addis Ababa, Ethiopia',
  '',
  '{
    "github":    "https://github.com/nexyovi",
    "linkedin":  "https://linkedin.com/company/nexyovi",
    "twitter":   "https://twitter.com/nexyovi",
    "youtube":   "#",
    "instagram": "#",
    "facebook":  "#",
    "telegram":  "#",
    "whatsapp":  "+251945628075",
    "tiktok":    "#",
    "discord":   "#",
    "slack":     "#"
  }'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  org_name     = EXCLUDED.org_name,
  email        = EXCLUDED.email,
  phone        = EXCLUDED.phone,
  address      = EXCLUDED.address,
  social_links = EXCLUDED.social_links,
  updated_at   = now();


-- ── PARTNERS TABLE ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.partners (
  id         uuid  DEFAULT gen_random_uuid() PRIMARY KEY,
  name       text  NOT NULL,
  logo_url   text,
  created_at timestamptz DEFAULT timezone('utc', now()) NOT NULL
);

ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read partners"   ON public.partners;
DROP POLICY IF EXISTS "Public manage partners" ON public.partners;
CREATE POLICY "Public read partners"   ON public.partners FOR SELECT USING (true);
CREATE POLICY "Public manage partners" ON public.partners FOR ALL    USING (true);

INSERT INTO public.partners (name, logo_url) VALUES
('Ethio Telecom',              'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Ethio_telecom_logo.svg/512px-Ethio_telecom_logo.svg.png'),
('Commercial Bank of Ethiopia','https://upload.wikimedia.org/wikipedia/en/5/5e/Commercial_Bank_of_Ethiopia_logo.svg'),
('Zemen Bank',                 'https://upload.wikimedia.org/wikipedia/commons/6/68/Zemen_Bank_logo.svg'),
('INSA Ethiopia',              'https://upload.wikimedia.org/wikipedia/en/7/70/INSA_Ethiopia_logo.svg'),
('Addis Ababa University',     'https://upload.wikimedia.org/wikipedia/en/6/60/Addis_Ababa_University_logo.svg'),
('AASTU',                      'https://upload.wikimedia.org/wikipedia/en/4/4f/AASTU_logo.svg'),
('IBM',                        'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg'),
('AWS',                        'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg'),
('Oracle',                     'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg'),
('HP',                         'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg')
ON CONFLICT DO NOTHING;


-- ── SITE CONTENT TABLE ───────────────────────────────────────
-- Stores every CMS-editable section as a JSON blob.
-- section_id keys must match what SiteContext.tsx uses.
CREATE TABLE IF NOT EXISTS public.site_content (
  section_id text PRIMARY KEY,
  content    jsonb NOT NULL,
  updated_at timestamptz DEFAULT timezone('utc', now()) NOT NULL
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read site content"   ON public.site_content;
DROP POLICY IF EXISTS "Public manage site content" ON public.site_content;
CREATE POLICY "Public read site content"   ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Public manage site content" ON public.site_content FOR ALL    USING (true);

-- Hero Section
INSERT INTO public.site_content (section_id, content) VALUES (
  'hero',
  '{
    "title":         "Where Intelligence Meets Infrastructure.",
    "subtitle":      "We engineer military-grade cloud ecosystems, secure distributed ledgers, and deep-learning protocols for sovereign enterprises. Zero compromise. Infinite scale.",
    "cta_primary":   "Book a Strategy Session",
    "cta_secondary": "See Our Work"
  }'::jsonb
) ON CONFLICT (section_id) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

-- Trust Metrics
INSERT INTO public.site_content (section_id, content) VALUES (
  'metrics',
  '[
    {"number": "99.9%",  "label": "Infrastructure Uptime"},
    {"number": "24/7",   "label": "System Monitoring"},
    {"number": "12+",    "label": "Years Experience"},
    {"number": "150+",   "label": "Projects Delivered"},
    {"number": "50+",    "label": "Enterprise Clients"},
    {"number": "4",      "label": "African Countries"}
  ]'::jsonb
) ON CONFLICT (section_id) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

-- About / Company
INSERT INTO public.site_content (section_id, content) VALUES (
  'about',
  '{
    "tagline":      "We build the backbone of the digital economy.",
    "description":  "Nexyovi is an elite software engineering firm headquartered in Addis Ababa, Ethiopia, with a global delivery footprint. We partner with sovereign enterprises, fast-growth startups, and government institutions to engineer the systems that power modern economies.",
    "founded":      "2012",
    "headquarters": "Addis Ababa, Ethiopia",
    "clients":      "50+"
  }'::jsonb
) ON CONFLICT (section_id) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

-- Services
INSERT INTO public.site_content (section_id, content) VALUES (
  'services',
  '[
    {
      "id":    "software",
      "title": "Software Engineering",
      "desc":  "Custom platforms, SaaS products, and enterprise applications engineered for massive concurrency and global scale."
    },
    {
      "id":    "infrastructure",
      "title": "Infrastructure & Networking",
      "desc":  "Cloud architecture, zero-trust networks, server deployments, and continuous reliability engineering."
    },
    {
      "id":    "ai",
      "title": "Artificial Intelligence",
      "desc":  "Predictive models, intelligent agents, and custom LLM integrations that automate complex workflows and drive ROI."
    },
    {
      "id":    "security",
      "title": "Cybersecurity",
      "desc":  "Security audits, infrastructure hardening, compliance, penetration testing, and continuous threat monitoring."
    },
    {
      "id":    "mobile",
      "title": "Mobile Development",
      "desc":  "High-performance iOS and Android applications built with React Native and Flutter for millions of users."
    },
    {
      "id":    "data",
      "title": "Data Engineering",
      "desc":  "Data pipelines, analytics platforms, real-time dashboards, and business intelligence solutions."
    }
  ]'::jsonb
) ON CONFLICT (section_id) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

-- Portfolio / Case Studies
INSERT INTO public.site_content (section_id, content) VALUES (
  'portfolio',
  '[
    {
      "title":    "Aura Intelligence Platform",
      "category": "AI & Data Science",
      "desc":     "Distributed ML pipeline for predictive maintenance in industrial manufacturing clusters. Deployed across 3 facilities.",
      "metrics":  "70% Reduced Downtime, Sub-10ms Latency"
    },
    {
      "title":    "SEC-Net Global Firewall",
      "category": "Cybersecurity",
      "desc":     "Advanced zero-trust network infrastructure for secure cross-continental data transmission for a government ministry.",
      "metrics":  "Enterprise-grade Threat Mitigation, AI-Driven Auditing"
    },
    {
      "title":    "ArifPay Banking Gateway",
      "category": "FinTech",
      "desc":     "Secure payment gateway integrating with 4 Ethiopian banks and processing live transactions from day one.",
      "metrics":  "4 Banks Integrated, Day-1 Live Transactions"
    },
    {
      "title":    "Ministry of Health Platform",
      "category": "HealthTech",
      "desc":     "National health infrastructure platform serving regional hospitals and clinics across Ethiopia.",
      "metrics":  "Delivered Ahead of Schedule, Full Compliance"
    }
  ]'::jsonb
) ON CONFLICT (section_id) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

-- Bottom CTAs
INSERT INTO public.site_content (section_id, content) VALUES (
  'ctas',
  '{
    "title":       "Let''s Build Together",
    "subtitle":    "Ready to scale? Let''s talk.",
    "description": "Book your strategy session today. We take on a limited number of new clients each quarter to ensure maximum quality and dedicated attention.",
    "buttonText":  "Book a Strategy Session",
    "benefits":    ["Free AI audit + 2-3 ROI ideas", "Prioritized roadmap outline, zero cost", "Strict NDA, fully confidential"]
  }'::jsonb
) ON CONFLICT (section_id) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

-- Footer
INSERT INTO public.site_content (section_id, content) VALUES (
  'footer',
  '{
    "tagline":   "Engineering the future, from Addis Ababa to the world.",
    "copyright": "© 2026 Nexyovi Technologies. All rights reserved."
  }'::jsonb
) ON CONFLICT (section_id) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

-- Why Nexyovi / Value Propositions
INSERT INTO public.site_content (section_id, content) VALUES (
  'why_nexyovi',
  '[
    {
      "icon":  "shield",
      "title": "Security-First Engineering",
      "desc":  "Every system we build is hardened from the ground up. We implement zero-trust architecture, penetration testing, and continuous monitoring as standard practice — not afterthoughts."
    },
    {
      "icon":  "zap",
      "title": "Elite Engineering Speed",
      "desc":  "We move fast without breaking things. Our battle-tested Agile delivery process means you get production-ready software in weeks, not months."
    },
    {
      "icon":  "globe",
      "title": "Africa-Native, Global-Grade",
      "desc":  "We understand the local infrastructure landscape better than any international firm — while building to global standards that scale beyond borders."
    },
    {
      "icon":  "cpu",
      "title": "AI-Augmented Development",
      "desc":  "We integrate cutting-edge AI tools and workflows into every project, giving our clients a competitive edge through intelligent automation and data-driven decisions."
    }
  ]'::jsonb
) ON CONFLICT (section_id) DO UPDATE SET content = EXCLUDED.content, updated_at = now();


-- ============================================================
-- STEP 3: STORAGE BUCKET (for logo & team image uploads)
-- ============================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('nexyovi_assets', 'nexyovi_assets', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Read"   ON storage.objects;
DROP POLICY IF EXISTS "Public Insert" ON storage.objects;
DROP POLICY IF EXISTS "Public Update" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete" ON storage.objects;

CREATE POLICY "Public Read"   ON storage.objects FOR SELECT USING (bucket_id = 'nexyovi_assets');
CREATE POLICY "Public Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'nexyovi_assets');
CREATE POLICY "Public Update" ON storage.objects FOR UPDATE USING (bucket_id = 'nexyovi_assets');
CREATE POLICY "Public Delete" ON storage.objects FOR DELETE USING (bucket_id = 'nexyovi_assets');
