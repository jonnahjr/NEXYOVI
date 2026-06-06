-- Run this in Supabase SQL Editor to confirm the admin email
UPDATE auth.users
SET email_confirmed_at = now(),
    updated_at = now()
WHERE email = 'admin@nexyovi.com';
