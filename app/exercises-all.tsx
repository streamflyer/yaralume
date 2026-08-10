import { ScrollView, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { exercises } from "@/content/exercises";
import ExerciseCard from "@/components/ExerciseCard";
import { colors, font, spacing } from "@/lib/theme";

export default function ExercisesAll() {
  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: spacing.md, gap: spacing.sm, paddingBottom: spacing.xxl }}
    >
      <Stack.Screen options={{ title: "Übungen" }} />
      <Text style={styles.lead}>
        Kurze, ruhige Übungen. Nimm dir eine heraus – mehr braucht es nicht.
      </Text>
      {exercises.map((ex) => (
        <ExerciseCard key={ex.id} exercise={ex} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lead: {
    fontSize: font.body,
    color: colors.textMuted,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
});
