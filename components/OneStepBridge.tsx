import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { colors, font, radius, spacing } from "@/lib/theme";

// The bridge from feeling to doing (plan §5, the core loop). Given the latest
// mood, offer ONE small, agency-restoring step. Low mood → gentlest options.
type Step = { label: string; sub: string; go: () => void };

export default function OneStepBridge({ mood }: { mood?: number }) {
  const router = useRouter();

  const gentle: Step[] = [
    {
      label: "Eine gute Nachricht lesen",
      sub: "Etwas, das zeigt: Menschen handeln.",
      go: () => router.push("/news"),
    },
    {
      label: "Eine Stimme finden, die gut tut",
      sub: "Folge jemandem, der dich bestärkt.",
      go: () => router.push("/creators"),
    },
  ];

  const active: Step[] = [
    {
      label: "Etwas in deiner Nähe entdecken",
      sub: "Ein Anlass in deiner Stadt.",
      go: () => router.push("/events"),
    },
    {
      label: "Eine gute Nachricht lesen",
      sub: "Konstruktiv statt lähmend.",
      go: () => router.push("/news"),
    },
  ];

  const steps = mood !== undefined && mood <= 2 ? gentle : active;
  const heading =
    mood !== undefined && mood <= 2
      ? "Kein Druck. Vielleicht ein kleiner Schritt?"
      : "Ein kleiner Schritt für heute";

  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>{heading}</Text>
      {steps.map((s) => (
        <Pressable key={s.label} style={styles.step} onPress={s.go}>
          <View style={{ flex: 1 }}>
            <Text style={styles.stepLabel}>{s.label}</Text>
            <Text style={styles.stepSub}>{s.sub}</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  heading: { fontSize: font.body, color: colors.text, fontWeight: "600" },
  step: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    padding: spacing.md,
  },
  stepLabel: { fontSize: font.body, color: colors.text },
  stepSub: { fontSize: font.tiny, color: colors.textMuted, marginTop: 2 },
  arrow: { fontSize: font.h3, color: colors.primary, marginLeft: spacing.sm },
});
