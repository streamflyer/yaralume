# Yaralume 🌱

A calm companion app for people worried about climate change. The **Wellbeing
Space** is the front door — a private daily check-in, grounding exercises, and a
gentle bridge from *feeling* to *doing* — wired to news, local events (Zürich,
Bern, Winterthur, Basel, St. Gallen), and curated voices.

Built with **Expo (React Native)** for iOS, Android, and web from one codebase,
with **Supabase** as the backend. See `../Yaralume_Product_Plan.md` for the
full product plan.

> ⚠️ **Not therapy.** Yaralume offers everyday support, not clinical
> treatment or crisis services. The Help screen signposts to Swiss resources
> (Die Dargebotene Hand 143, Pro Juventute 147, Notruf 144/112). Keep this
> framing everywhere.

---

## What's in this scaffold

```
yaralume/
├── app/                      # expo-router screens
│   ├── _layout.tsx           # root stack (tabs + modals)
│   ├── (tabs)/               # 🌱 Space · 📰 News · 📍 Events · 🎙️ Stimmen
│   │   ├── index.tsx         # Wellbeing Space (home) — the heart
│   │   ├── news.tsx          # placeholder (to build)
│   │   ├── events.tsx        # events list, 5 cities, seed fallback
│   │   └── creators.tsx      # curated creators directory
│   ├── check-in.tsx          # daily mood check-in (modal)
│   ├── exercise/[id].tsx     # exercise detail
│   ├── exercises-all.tsx     # full exercise library
│   └── help.tsx              # crisis / support resources (modal)
├── components/               # MoodTrend, ExerciseCard, OneStepBridge, ComingSoon
├── content/                  # exercises.ts, crisis.ts, creators.ts, seedEvents.ts (German)
├── lib/                      # supabase.ts, checkins.ts, events.ts, theme.ts
└── supabase/                 # schema.sql, seed.sql
```

**Works offline out of the box.** Without a Supabase config, the app runs in
*local-only* mode: check-ins are stored on-device (AsyncStorage) and events fall
back to bundled seed data. Add a `.env` to enable cloud sync.

---

## Run it locally

Prerequisites: **Node 18+** and the Expo tooling (`npx` is enough — no global
install needed).

```bash
cd yaralume
npm install
npx expo start
```

Then press `w` for web, `i` for iOS simulator, `a` for Android — or scan the QR
code with the **Expo Go** app on your phone.

> Tip: after `npm install`, run `npx expo install --check` once to align native
> package versions with your installed Expo SDK.

---

## Connect Supabase

1. In your Supabase project: **SQL → New query**, paste `supabase/schema.sql`,
   run it. (Optionally run `supabase/seed.sql` too.)
2. **Settings → API**: copy the **Project URL** and the **anon public** key.
3. Copy `.env.example` to `.env` and fill them in:

   ```
   EXPO_PUBLIC_SUPABASE_URL=https://YOUR-ref.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. Restart `npx expo start`. Check-ins now sync for signed-in users and events
   load from your `events` table (approved + upcoming only).

**Auth note:** the scaffold stores check-ins locally and only syncs when a user
is signed in. For the simplest path, enable **Anonymous sign-ins** in Supabase
(Authentication → Providers) and call `supabase.auth.signInAnonymously()` on
first launch, or add a proper email/magic-link sign-in screen later.

---

## Push to GitHub

```bash
cd yaralume
git init
git add .
git commit -m "Yaralume scaffold: Wellbeing Space + Supabase"
git branch -M main
git remote add origin git@github.com:<your-username>/yaralume.git
git push -u origin main
```

`.env` is gitignored — your keys stay local.

---

## Deploy the web build to Vercel

Expo can export a static web build that Vercel serves directly.

```bash
npx expo export --platform web   # outputs to ./dist
```

In Vercel: **New Project → import your GitHub repo**, then set:

- **Build command:** `npx expo export --platform web`
- **Output directory:** `dist`
- **Environment variables:** add `EXPO_PUBLIC_SUPABASE_URL` and
  `EXPO_PUBLIC_SUPABASE_ANON_KEY` (same values as `.env`).

Every push to `main` then redeploys the website automatically. (Mobile apps ship
separately via `eas build` to TestFlight / Play — see Expo Application Services
when you're ready for the beta.)

---

## Build order (from the plan)

1. **Wellbeing Space** — ✅ scaffolded. Refine tone, expand exercises to 12–15,
   add anonymous auth + cloud sync.
2. **Creators** — ✅ directory scaffolded. Replace placeholders with real,
   verified voices (incl. Swiss/DACH).
3. **Events** — ✅ list + filter scaffolded. Seed all 5 cities richly; add a
   submission form and a map view; wire Fridays for Future ingest.
4. **News (thin)** — placeholder. Add a capped, curated daily feed from one
   source; highlight constructive/solutions items.
5. **Community** — deferred until the base is warm (moderation-first).

## Content & safety TODOs

- [ ] Expand `content/exercises.ts` to 12–15 items; have a climate-aware
      professional sanity-check the wellbeing copy.
- [ ] Confirm all crisis numbers/links in `content/crisis.ts` are current.
- [ ] Replace `content/creators.ts` + `seed.sql` placeholders with verified
      handles and links.
- [ ] Add a privacy note / consent for storing mood data; keep it minimal.
- [ ] Verify licensing before ingesting any news feed or the FFF event map.
```
