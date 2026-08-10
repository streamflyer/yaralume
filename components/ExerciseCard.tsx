import { Pressable, View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import type { Exercise } from "@/content/exercises";
import { categoryLabels } from "@/content/exercises";
import { colors, font, radius, spacing } from "@/lib/theme";

export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <Link
      href={{ pathname: "/exercise/[id]", params: { id: exercise.id } }}
      asChild
    >
      <Pressable style={styles.card}>
        <View style={styles.tagRow}>
          <Text style={styles.tag}>{categoryLabels[exercise.category]}</Text>
          <Text style={styles.minutes}>{exercise.minutes} Min</Text>
        </View>
        <Text style={styles.title}>{exercise.title}</Text>
        <Text style={styles.intro} numberOfLines={2}>
          {exercise.intro}
        </Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  tagRow: { flexDirection: "row", justifyContent: "space-between" },
  tag: {
    fontSize: font.tiny,
    color: colors.primary,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
    overflow: "hidden",
  },
  minutes: { fontSize: font.tiny, color: colors.textFaint },
  title: { fontSize: font.h3, color: colors.text, fontWeight: "600" },
  intro: { fontSize: font.small, color: colors.textMuted, lineHeight: 20 },
});
