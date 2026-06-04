-- ============================================================
-- Nexyovi Full Database Schema (Corporate Tech Agency)
-- FRONTEND-ONLY CUSTOM LOGIN EDITION
-- IDEMPOTENT: Safe to run multiple times in Supabase SQL Editor
-- ============================================================

-- ── ADMIN USERS TABLE (CUSTOM LOGIN) ──
CREATE TABLE IF NOT EXISTS public.admin_users (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  password text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Seed the initial custom admin user
INSERT INTO public.admin_users (email, password)
VALUES ('admin@nexyovi.com', 'Jonnahjnr@0945628075')
ON CONFLICT (email) DO NOTHING;

-- ── JOBS TABLE ──
CREATE TABLE IF NOT EXISTS public.jobs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  department text not null,
  location text not null,
  type text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view jobs" ON public.jobs;
DROP POLICY IF EXISTS "Only admins can modify jobs" ON public.jobs;
CREATE POLICY "Anyone can view jobs" ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Anyone can modify jobs" ON public.jobs FOR ALL USING (true);

-- ── TESTIMONIALS TABLE ──
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid default gen_random_uuid() primary key,
  author text not null,
  role text not null,
  content text not null,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Only admins can modify testimonials" ON public.testimonials;
CREATE POLICY "Anyone can view testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Anyone can modify testimonials" ON public.testimonials FOR ALL USING (true);

-- Seed all testimonials
INSERT INTO public.testimonials (author, role, content, image_url) VALUES
(
  'Michael Rodriguez',
  'CTO, Fintech Global',
  'Nexyovi transformed our security infrastructure in record time. Their AI-driven approach is truly next-gen.',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
),
(
  'Abeba Tekle',
  'Director, Ethio-Tech',
  'The level of technical expertise in their Addis Ababa hub is world-class. A vital partner for our African expansion.',
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200'
),
(
  'Jameson Blake',
  'CEO, Quantum Systems',
  'Fast, secure, and incredibly professional. They don''t just build software; they engineer solutions.',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
),
(
  'Dr. Elias Tadesse',
  'Chief Innovation Officer, NIB International Bank',
  'Nexyovi engineered a foundational AI ecosystem that allowed us to scale transaction volume by 400% without latency. Their technical superiority is undeniable.',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200'
)
ON CONFLICT DO NOTHING;

-- ── TEAM TABLE ──
CREATE TABLE IF NOT EXISTS public.team (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text not null,
  bio text not null,
  img text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view team" ON public.team;
DROP POLICY IF EXISTS "Only admins can modify team" ON public.team;
CREATE POLICY "Anyone can view team" ON public.team FOR SELECT USING (true);
CREATE POLICY "Anyone can modify team" ON public.team FOR ALL USING (true);

-- ── MESSAGES TABLE ──
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  company text,
  service text,
  message text not null,
  status text default 'unread',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can insert messages" ON public.messages;
DROP POLICY IF EXISTS "Only admins can view messages" ON public.messages;
DROP POLICY IF EXISTS "Only admins can update messages" ON public.messages;
DROP POLICY IF EXISTS "Only admins can delete messages" ON public.messages;
CREATE POLICY "Anyone can manage messages" ON public.messages FOR ALL USING (true);

-- ── SETTINGS TABLE ──
CREATE TABLE IF NOT EXISTS public.settings (
  id text primary key,
  org_name text not null,
  email text not null,
  phone text not null,
  address text not null,
  logo_url text,
  social_links jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view settings" ON public.settings;
DROP POLICY IF EXISTS "Only admins can modify settings" ON public.settings;
CREATE POLICY "Anyone can view settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Anyone can modify settings" ON public.settings FOR ALL USING (true);

INSERT INTO public.settings (id, org_name, email, phone, address, logo_url, social_links)
VALUES (
  'global',
  'Nexyovi',
  'contact@nexyovi.com',
  '+251938617252',
  'Addis Ababa, Ethiopia',
  '',
  '{"github":"https://github.com/nexyovi","linkedin":"https://linkedin.com/company/nexyovi","twitter":"https://twitter.com/nexyovi","youtube":"#","instagram":"#","discord":"#","slack":"#"}'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- ── SITE CONTENT TABLE ──
CREATE TABLE IF NOT EXISTS public.site_content (
  section_id text primary key,
  content jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view site content" ON public.site_content;
DROP POLICY IF EXISTS "Only admins can modify site content" ON public.site_content;
CREATE POLICY "Anyone can view site content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Anyone can modify site content" ON public.site_content FOR ALL USING (true);

INSERT INTO public.site_content (section_id, content) VALUES (
  'hero',
  '{"title": "Where Intelligence Meets Infrastructure.", "subtitle": "We engineer military-grade cloud ecosystems, secure distributed ledgers, and deep-learning protocols for sovereign enterprises. Zero compromise. Infinite scale.", "cta_primary": "Deploy with Nexyovi", "cta_secondary": "View Documentation"}'::jsonb
) ON CONFLICT (section_id) DO NOTHING;

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================

INSERT INTO storage.buckets (id, name, public) 
VALUES ('nexyovi_assets', 'nexyovi_assets', true)
ON CONFLICT (id) DO NOTHING;

-- Allow ALL operations for anyone (since we bypass GoTrue auth)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Auth Insert" ON storage.objects;
DROP POLICY IF EXISTS "Auth Update" ON storage.objects;
DROP POLICY IF EXISTS "Auth Delete" ON storage.objects;

CREATE POLICY "Public Read" ON storage.objects FOR SELECT USING (bucket_id = 'nexyovi_assets');
CREATE POLICY "Public Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'nexyovi_assets');
CREATE POLICY "Public Update" ON storage.objects FOR UPDATE USING (bucket_id = 'nexyovi_assets');
CREATE POLICY "Public Delete" ON storage.objects FOR DELETE USING (bucket_id = 'nexyovi_assets');
