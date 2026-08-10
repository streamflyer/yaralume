// Crisis & support resources (Switzerland, German).
//
// IMPORTANT (plan §10): ClimateBuddy is NOT therapy and NOT a crisis service.
// This copy signposts to real Swiss help. Surface it (a) always accessible from
// the Wellbeing Space header, and (b) proactively after a very low check-in.
// Do not make promises about confidentiality on the app's behalf.

export const disclaimer =
  "ClimateBuddy ist Unterstützung im Alltag – aber keine Therapie und kein Notfalldienst. " +
  "Wenn es dir sehr schlecht geht, wende dich bitte an eine der folgenden Stellen.";

export type Resource = {
  name: string;
  phone?: string;
  url?: string;
  note: string;
};

export const swissResources: Resource[] = [
  {
    name: "Die Dargebotene Hand",
    phone: "143",
    url: "https://www.143.ch",
    note: "Sorgen-Telefon, rund um die Uhr, kostenlos und vertraulich.",
  },
  {
    name: "Pro Juventute – Beratung 147",
    phone: "147",
    url: "https://www.147.ch",
    note: "Für Kinder und Jugendliche, rund um die Uhr.",
  },
  {
    name: "Notfall",
    phone: "144",
    note: "Medizinischer Notfall (Sanität). Allgemeiner Notruf: 112.",
  },
];
