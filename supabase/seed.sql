-- Optional seed data for Supabase. Run AFTER schema.sql.
-- Replace these placeholders with real, verified events and creators.

-- Curated creators (mirror content/creators.ts, but this is the source of truth
-- once the backend is live).
insert into public.creators (name, vibe, platform, url, blurb) values
  ('Climate scientist explainer', 'science', 'YouTube', 'https://www.youtube.com/', 'Verständliche Erklärungen zu Klimadaten – ohne Panikmache.'),
  ('Solutions-focused creator', 'solutions', 'Instagram', 'https://www.instagram.com/', 'Fokus auf Fortschritte und Menschen, die handeln.'),
  ('Climate policy journalist', 'policy', 'Newsletter', 'https://www.example.com/', 'Ordnet politische Entscheide ruhig und faktenbasiert ein.'),
  ('Schweizer Klima-Stimme', 'local', 'Podcast', 'https://www.example.ch/', 'Klimathemen aus Schweizer Perspektive, auf Deutsch.')
on conflict do nothing;

-- Example approved event (adjust the date to a real upcoming one).
insert into public.events (title, city, location, description, starts_at, source, status) values
  ('Klimastreik – Freitagsdemo', 'Zürich', 'Helvetiaplatz', 'Wöchentlicher Klimastreik. Offen für alle.', now() + interval '4 days', 'manual', 'approved')
on conflict do nothing;
