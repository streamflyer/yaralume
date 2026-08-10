-- ClimateBuddy — Supabase schema (v1)
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query).
-- Covers the MVP: private check-ins, curated events, and creators.
-- Community tables are intentionally deferred (plan §7).

-- =========================================================
-- 1. CHECK-INS  (private wellbeing data — sensitive)
-- =========================================================
create table if not exists public.check_ins (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  mood        smallint not null check (mood between 1 and 5),
  note        text check (char_length(note) <= 280),
  created_at  timestamptz not null default now()
);

create index if not exists check_ins_user_created_idx
  on public.check_ins (user_id, created_at desc);

alter table public.check_ins enable row level security;

-- Each user can only ever see/insert/modify their OWN check-ins.
drop policy if exists "own check-ins select" on public.check_ins;
create policy "own check-ins select" on public.check_ins
  for select using (auth.uid() = user_id);

drop policy if exists "own check-ins insert" on public.check_ins;
create policy "own check-ins insert" on public.check_ins
  for insert with check (auth.uid() = user_id);

drop policy if exists "own check-ins update" on public.check_ins;
create policy "own check-ins update" on public.check_ins
  for update using (auth.uid() = user_id);

drop policy if exists "own check-ins delete" on public.check_ins;
create policy "own check-ins delete" on public.check_ins
  for delete using (auth.uid() = user_id);

-- =========================================================
-- 2. EVENTS  (curated + user-submitted, moderated)
-- =========================================================
create table if not exists public.events (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  city         text not null,
  location     text,
  description  text,
  starts_at    timestamptz not null,
  ends_at      timestamptz,
  source       text default 'manual',   -- 'manual' | 'fridaysforfuture' | ...
  url          text,
  status       text not null default 'pending', -- 'pending' | 'approved' | 'rejected'
  submitted_by uuid references auth.users (id) on delete set null,
  created_at   timestamptz not null default now()
);

create index if not exists events_status_starts_idx
  on public.events (status, starts_at);

alter table public.events enable row level security;

-- Anyone (even signed-out) can read APPROVED, upcoming events.
drop policy if exists "approved events readable" on public.events;
create policy "approved events readable" on public.events
  for select using (status = 'approved');

-- Signed-in users can submit events; they land as 'pending' for moderation.
drop policy if exists "users submit events" on public.events;
create policy "users submit events" on public.events
  for insert with check (auth.uid() = submitted_by and status = 'pending');

-- NOTE: approving/editing events is done by you via the Supabase dashboard,
-- or later a service-role admin tool. No public update/delete policy on purpose.

-- =========================================================
-- 3. CREATORS  (curated directory — read-only to clients)
-- =========================================================
create table if not exists public.creators (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  vibe       text not null check (vibe in ('science','solutions','policy','local')),
  platform   text not null,
  handle     text,
  url        text not null,
  blurb      text,
  active     boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.creators enable row level security;

drop policy if exists "active creators readable" on public.creators;
create policy "active creators readable" on public.creators
  for select using (active = true);
-- You manage this table from the dashboard; no client writes.

-- =========================================================
-- Done. Community (threads, posts, reports) comes in a later migration.
-- =========================================================
