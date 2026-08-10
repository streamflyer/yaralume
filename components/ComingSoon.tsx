import { View, Text, StyleSheet } from "react-native";
import { colors, font, radius, spacing } from "@/lib/theme";

// Placeholder for the connector tabs (News, Events, Stimmen). Each explains
// what will live here per the product plan, so the app is navigable end-to-end
// while these features are built out.
export default function ComingSoon({
  emoji,
  title,
  body,
  bullets,
}: {
  emoji: string;
  title: string;
  body: string;
  bullets: string[];
}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      <View style={styles.card}>
        {bullets.map((b) => (
          <Text key={b} style={styles.bullet}>
            · {b}
          </Text>
        ))}
      </View>
      <Text style={styles.tag}>In Arbeit</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg, padding: spacing.lg, gap: spacing.md, justifyContent: "center" },
  emoji: { fontSize: 44 },
  title: { fontSize: font.h1, color: colors.text, fontWeight: "700" },
  body: { fontSize: font.body, color: colors.textMuted, lineHeight: 24 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  bullet: { fontSize: font.body, color: colors.text, lineHeight: 24 },
  tag: {
    alignSelf: "flex-start",
    fontSize: font.tiny,
    color: colors.primary,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
    overflow: "hidden",
  },
});
