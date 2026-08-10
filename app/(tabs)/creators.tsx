import { useState } from "react";
import { ScrollView, View, Text, Pressable, StyleSheet, Linking } from "react-native";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { creators, vibeLabels, type CreatorVibe } from "@/content/creators";
import { colors, font, radius, spacing } from "@/lib/theme";

const VIBES: (CreatorVibe | "all")[] = ["all", "science", "solutions", "policy", "local"];

export default function CreatorsScreen() {
  const insets = useSafeAreaInsets();
  const [vibe, setVibe] = useState<CreatorVibe | "all">("all");
  const shown = vibe === "all" ? creators : creators.filter((c) => c.vibe === vibe);

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: spacing.md, paddingTop: insets.top + spacing.sm, gap: spacing.md, paddingBottom: spacing.xxl }}
    >
      <Stack.Screen options={{ title: "Stimmen" }} />
      <Text style={styles.lead}>
        Handverlesene Stimmen, die informieren und Mut machen – such dir aus, was
        dir gut tut.
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm }}>
        {VIBES.map((v) => (
          <Text
            key={v}
            onPress={() => setVibe(v)}
            style={[styles.chip, vibe === v && styles.chipActive]}
          >
            {v === "all" ? "Alle" : vibeLabels[v]}
          </Text>
        ))}
      </ScrollView>

      {shown.map((c) => (
        <Pressable key={c.id} style={styles.card} onPress={() => Linking.openURL(c.url)}>
          <View style={styles.row}>
            <Text style={styles.name}>{c.name}</Text>
            <Text style={styles.platform}>{c.platform}</Text>
          </View>
          <Text style={styles.vibe}>{vibeLabels[c.vibe]}</Text>
          <Text style={styles.blurb}>{c.blurb}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lead: { fontSize: font.body, color: colors.textMuted, lineHeight: 22 },
  chip: {
    fontSize: font.small,
    color: colors.textMuted,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    overflow: "hidden",
  },
  chipActive: { color: "#fff", backgroundColor: colors.primary, borderColor: colors.primary },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  name: { fontSize: font.h3, color: colors.text, fontWeight: "600", flex: 1 },
  platform: { fontSize: font.tiny, color: colors.textFaint },
  vibe: { fontSize: font.tiny, color: colors.primary },
  blurb: { fontSize: font.small, color: colors.textMuted, lineHeight: 20 },
});
