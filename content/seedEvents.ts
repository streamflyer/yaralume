import type { ClimateEvent } from "@/lib/events";

// Bundled seed events for the five launch cities. Dates are generated relative
// to "now" so the fallback list always looks alive during development. In
// production these come from Supabase (Fridays for Future ingest + manual
// submissions); this array is only the offline/dev fallback.
//
// TODO(nico): replace with real, verified local events before launch and keep
// the Supabase `events` table richly seeded per city.

function inDays(days: number, hour = 18): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

export const seedEvents: ClimateEvent[] = [
  {
    id: "seed-zh-1",
    title: "Klimastreik – Freitagsdemo",
    city: "Zürich",
    location: "Ni-Platz / Helvetiaplatz",
    description:
      "Wöchentlicher Klimastreik. Offen für alle, bring gerne Freund:innen mit.",
    starts_at: inDays(4, 17),
    source: "manual",
  },
  {
    id: "seed-be-1",
    title: "Podium: Klimapolitik in der Schweiz",
    city: "Bern",
    location: "Universität Bern, Hauptgebäude",
    description:
      "Diskussion mit Vertreter:innen aus Politik und Wissenschaft. Anschliessend Apéro.",
    starts_at: inDays(9, 19),
    source: "manual",
  },
  {
    id: "seed-bs-1",
    title: "Repair Café & Klimagespräche",
    city: "Basel",
    location: "Quartiertreffpunkt Gundeli",
    description:
      "Gemeinsam reparieren statt wegwerfen – und über den Alltag im Klimawandel reden.",
    starts_at: inDays(12, 14),
    source: "manual",
  },
  {
    id: "seed-wi-1",
    title: "Velo-Demo für sichere Wege",
    city: "Winterthur",
    location: "Bahnhofplatz",
    description: "Kritische Masse für eine velofreundliche Stadt.",
    starts_at: inDays(16, 18),
    source: "manual",
  },
  {
    id: "seed-sg-1",
    title: "Filmabend: Dokumentation & Austausch",
    city: "St. Gallen",
    location: "Kinok, Lokremise",
    description:
      "Klima-Dokumentarfilm mit anschliessendem Gespräch in ruhiger Runde.",
    starts_at: inDays(20, 20),
    source: "manual",
  },
  {
    id: "seed-zh-2",
    title: "Klima-Café: Sorgen teilen",
    city: "Zürich",
    location: "Kafi Freud",
    description:
      "Offener Austausch für alle, die sich Sorgen ums Klima machen. Niederschwellig, kein Vorwissen nötig.",
    starts_at: inDays(25, 19),
    source: "manual",
  },
];
