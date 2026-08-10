import { View, Text, StyleSheet } from "react-native";
import type { CheckIn } from "@/lib/checkins";
import { colors, font, radius, spacing } from "@/lib/theme";

const moodColors = [
  colors.mood1,
  colors.mood2,
  colors.mood3,
  colors.mood4,
  colors.mood5,
];

// A gentle 14-day bar view. No streaks, no "you failed" — just a soft picture
// of how things have been (plan §4A: "never a streak you can fail").
export default function MoodTrend({ checkIns }: { checkIns: CheckIn[] }) {
  const recent = checkIns.slice(0, 14).reverse();

  if (recent.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>
          Deine Stimmung über die Zeit erscheint hier, sobald du ein paar
          Check-ins gemacht hast.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Deine letzten Tage</Text>
      <View style={styles.bars}>
        {recent.map((c) => (
          <View key={c.id} style={styles.barSlot}>
            <View
              style={[
                styles.bar,
                {
                  height: 12 + c.mood * 18,
                  backgroundColor: moodColors[c.mood - 1] ?? colors.mood3,
                },
              ]}
            />
          </View>
        ))}
      </View>
      <Text style={styles.caption}>
        Kein Wettbewerb, keine Serie. Nur ein sanftes Bild.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: { fontSize: font.small, color: colors.textMuted, marginBottom: spacing.sm },
  bars: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 110,
    gap: 4,
  },
  barSlot: { flex: 1, alignItems: "center", justifyContent: "flex-end" },
  bar: { width: "70%", borderRadius: radius.sm },
  caption: {
    fontSize: font.tiny,
    color: colors.textFaint,
    marginTop: spacing.sm,
  },
  empty: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyText: { fontSize: font.small, color: colors.textMuted, lineHeight: 20 },
});
