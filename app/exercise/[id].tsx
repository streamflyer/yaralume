import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { exercises, categoryLabels } from "@/content/exercises";
import OneStepBridge from "@/components/OneStepBridge";
import { colors, font, radius, spacing } from "@/lib/theme";

export default function ExerciseDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const exercise = exercises.find((e) => e.id === id);

  if (!exercise) {
    return (
      <View style={styles.center}>
        <Text style={styles.missing}>Übung nicht gefunden.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl }}
    >
      <Stack.Screen options={{ title: categoryLabels[exercise.category] }} />

      <Text style={styles.title}>{exercise.title}</Text>
      <Text style={styles.meta}>{exercise.minutes} Minuten</Text>
      <Text style={styles.intro}>{exercise.intro}</Text>

      <View style={styles.steps}>
        {exercise.steps.map((step, i) => (
          <View key={i} style={styles.step}>
            <Text style={styles.num}>{i + 1}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

      <View style={styles.closing}>
        <Text style={styles.closingLabel}>Ein kleiner Schritt danach</Text>
        <Text style={styles.closingText}>{exercise.closingStep}</Text>
      </View>

      <OneStepBridge />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.bg },
  missing: { color: colors.textMuted, fontSize: font.body },
  title: { fontSize: font.h1, color: colors.text, fontWeight: "700" },
  meta: { fontSize: font.small, color: colors.textFaint },
  intro: { fontSize: font.body, color: colors.textMuted, lineHeight: 24 },
  steps: { gap: spacing.sm, marginTop: spacing.sm },
  step: {
    flexDirection: "row",
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  num: {
    fontSize: font.body,
    color: colors.primary,
    fontWeight: "700",
    width: 20,
  },
  stepText: { flex: 1, fontSize: font.body, color: colors.text, lineHeight: 22 },
  closing: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  closingLabel: { fontSize: font.small, color: colors.primary, fontWeight: "600" },
  closingText: { fontSize: font.body, color: colors.text, marginTop: 4, lineHeight: 22 },
});
