// Grounding exercises for the Wellbeing Space (German, v1).
//
// These are self-help, psycho-educational prompts inspired by evidence-based
// approaches for climate distress (CBT reframing, ACT values/acceptance,
// mindfulness/breathing, nature connection). They are NOT therapy and must
// never be framed as clinical treatment (see plan §4A / §10).
//
// This is a starter set of 9 — expand toward 12–15 for launch. Nico writes
// and owns this content; each item should be short, warm, and end with a
// small, agency-restoring step ("from feeling to doing").

export type ExerciseCategory =
  | "reframe" // CBT-style: challenge catastrophic thinking
  | "accept" // ACT-style: accept uncertainty, act on values
  | "breathe" // mindfulness / grounding
  | "nature"; // nature connection

export type Exercise = {
  id: string;
  category: ExerciseCategory;
  title: string;
  minutes: number;
  intro: string; // one calm sentence
  steps: string[]; // 3–5 short steps
  closingStep: string; // the "one small step" toward agency/connection
};

export const categoryLabels: Record<ExerciseCategory, string> = {
  reframe: "Gedanken ordnen",
  accept: "Annehmen & handeln",
  breathe: "Ankommen & atmen",
  nature: "Natur spüren",
};

export const exercises: Exercise[] = [
  {
    id: "catastrophe-check",
    category: "reframe",
    title: "Den Katastrophen-Gedanken prüfen",
    minutes: 4,
    intro:
      "Wenn die Sorge riesig wird, hilft es, den Gedanken kurz anzuhalten und anzuschauen.",
    steps: [
      "Schreib den Gedanken auf, der dich gerade beschäftigt – so wörtlich wie möglich.",
      "Frag dich: Was davon ist eine Tatsache, was eine Befürchtung über die Zukunft?",
      "Was würdest du einer Freundin sagen, die diesen Gedanken hat?",
      "Formuliere den Gedanken einmal ehrlicher und ausgewogener neu.",
    ],
    closingStep:
      "Lies heute eine konstruktive Nachricht im News-Bereich – etwas, das zeigt, dass Menschen handeln.",
  },
  {
    id: "circle-of-control",
    category: "reframe",
    title: "Dein Kreis der Einflussmöglichkeiten",
    minutes: 5,
    intro:
      "Ohnmacht entsteht, wenn alles gleich gross wirkt. Sortieren schafft Luft.",
    steps: [
      "Zeichne im Kopf drei Kreise: Was ich kontrolliere, was ich beeinflusse, was ausserhalb liegt.",
      "Ordne deine grösste Sorge einem Kreis zu.",
      "Bei 'ausserhalb': Darf das gerade dort bleiben, ohne dass du es lösen musst?",
      "Wähle eine Sache aus dem inneren Kreis, die diese Woche machbar ist.",
    ],
    closingStep:
      "Schau im Events-Bereich, ob in deiner Stadt etwas Passendes stattfindet.",
  },
  {
    id: "uncertainty-acceptance",
    category: "accept",
    title: "Mit Ungewissheit da sein",
    minutes: 5,
    intro:
      "Die Zukunft des Klimas ist ungewiss – und trotzdem kannst du heute nach deinen Werten leben.",
    steps: [
      "Benenne das Gefühl, ohne es wegzudrücken: 'Ich spüre gerade Angst / Trauer / Wut.'",
      "Atme einmal langsam aus und lass das Gefühl da sein.",
      "Frag dich: Wofür will ich stehen, egal wie die Zukunft aussieht?",
      "Nenne eine kleine Handlung, die zu diesem Wert passt.",
    ],
    closingStep:
      "Teile in der Community (später verfügbar) oder notiere: Was ist mir wichtig?",
  },
  {
    id: "values-compass",
    category: "accept",
    title: "Dein Werte-Kompass",
    minutes: 6,
    intro:
      "Handeln aus Werten hält länger als Handeln aus Angst.",
    steps: [
      "Was hat dich ursprünglich am Klimathema berührt?",
      "Welche zwei Werte stecken dahinter (z. B. Fairness, Fürsorge, Natur)?",
      "Wie zeigt sich einer dieser Werte in deinem Alltag – schon jetzt?",
      "Wähle einen winzigen nächsten Schritt in diese Richtung.",
    ],
    closingStep:
      "Folge im Creators-Bereich einer Stimme, die dich in diesem Wert bestärkt.",
  },
  {
    id: "box-breathing",
    category: "breathe",
    title: "Quadrat-Atmung",
    minutes: 3,
    intro: "Ein einfacher Anker, wenn der Kopf rast.",
    steps: [
      "Atme 4 Sekunden ein.",
      "Halte 4 Sekunden.",
      "Atme 4 Sekunden aus.",
      "Halte 4 Sekunden. Wiederhole das vier Mal.",
    ],
    closingStep:
      "Merke: Du musst gerade nichts lösen. Ein Schritt reicht für heute.",
  },
  {
    id: "five-senses",
    category: "breathe",
    title: "5-4-3-2-1 – zurück ins Jetzt",
    minutes: 4,
    intro:
      "Beim Doomscrollen verliert man den Boden. Diese Übung holt dich zurück.",
    steps: [
      "Nenne 5 Dinge, die du siehst.",
      "4 Dinge, die du hörst.",
      "3 Dinge, die du spürst.",
      "2 Dinge, die du riechst, und 1, das du schmeckst.",
    ],
    closingStep:
      "Leg das Handy für zehn Minuten weg. Der Feed läuft nicht davon.",
  },
  {
    id: "worry-window",
    category: "breathe",
    title: "Das Sorgen-Fenster",
    minutes: 4,
    intro:
      "Sorgen brauchen einen Platz – aber nicht den ganzen Tag.",
    steps: [
      "Bestimme eine feste Zeit heute (z. B. 15 Minuten am Abend) für deine Klimasorgen.",
      "Wenn die Sorge früher kommt, notiere sie kurz und vertage sie aufs Fenster.",
      "Im Fenster: lass die Sorgen bewusst da sein.",
      "Danach: schliess das Fenster mit drei tiefen Atemzügen.",
    ],
    closingStep:
      "Trag deinen Check-in ein, damit du über die Zeit siehst, wie es dir geht.",
  },
  {
    id: "nature-anchor",
    category: "nature",
    title: "Zehn Minuten draussen",
    minutes: 10,
    intro:
      "Naturverbindung wirkt der Ohnmacht entgegen – und erinnert dich, wofür du dich einsetzt.",
    steps: [
      "Geh nach draussen, auch nur vor die Tür oder ans Fenster.",
      "Suche eine lebendige Sache: ein Baum, Moos, ein Vogel, der Himmel.",
      "Betrachte sie eine Minute, ohne dein Handy.",
      "Sag innerlich: 'Dafür lohnt es sich.'",
    ],
    closingStep:
      "Wenn du magst: Finde im Events-Bereich eine Aktion in der Natur.",
  },
  {
    id: "gratitude-action",
    category: "nature",
    title: "Dank & eine gute Tat",
    minutes: 4,
    intro:
      "Dankbarkeit und Handeln zusammen sind ein starkes Gegenmittel gegen Lähmung.",
    steps: [
      "Nenne drei Dinge an der Natur, für die du dankbar bist.",
      "Nenne eine Person, die sich fürs Klima einsetzt und die du schätzt.",
      "Überlege: Wie könntest du dich heute – ganz klein – anschliessen?",
      "Schreib den Schritt auf. Klein zählt.",
    ],
    closingStep:
      "Schick der Person eine kurze Nachricht oder folge ihr im Creators-Bereich.",
  },
];
