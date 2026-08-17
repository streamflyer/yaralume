import { useCallback, useState } from "react";
import { ScrollView, View, Text, Pressable, Image, StyleSheet, Linking } from "react-native";
import { Stack, useFocusEffect } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  vibeLabels,
  languageLabels,
  type Creator,
  type CreatorVibe,
  type CreatorLanguage,
} from "@/content/creators";
import { fetchCreators } from "@/lib/creators";
import { colors, font, radius, spacing } from "@/lib/theme";

const VIBES: (CreatorVibe | "all")[] = ["all", "science", "solutions", "policy", "local"];
const LANGUAGES: (CreatorLanguage | "all")[] = ["all", "de", "gsw", "fr", "it", "en"];

export default function CreatorsScreen() {
  const insets = useSafeAreaInsets();
  const [vibe, setVibe] = useState<CreatorVibe | "all">("all");
  const [language, setLanguage] = useState<CreatorLanguage | "all">("all");
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      setLoading(true);
      fetchCreators().then((list) => {
        if (!cancelled) {
          setCreators(list);
          setLoading(false);
        }
      });
      return () => {
        cancelled = true;
      };
    }, [])
  );

  const shown = creators.filter(
    (c) =>
      (vibe === "all" || c.vibe === vibe) &&
      (language === "all" || c.language === language)
  );

  // Only offer chips for values actually present, so the filter bar doesn't
  // advertise categories with nothing behind them.
  const availableVibes = VIBES.filter(
    (v) => v === "all" || creators.some((c) => c.vibe === v)
  );
  const availableLanguages = LANGUAGES.filter(
    (l) => l === "all" || creators.some((c) => c.language === l)
  );

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
        {availableVibes.map((v) => (
          <Text
            key={v}
            onPress={() => setVibe(v)}
            style={[styles.chip, vibe === v && styles.chipActive]}
          >
            {v === "all" ? "Alle" : vibeLabels[v]}
          </Text>
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm }}>
        {availableLanguages.map((l) => (
          <Text
            key={l}
            onPress={() => setLanguage(l)}
            style={[styles.chip, styles.langChip, language === l && styles.chipActive]}
          >
            {l === "all" ? "Alle Sprachen" : languageLabels[l]}
          </Text>
        ))}
      </ScrollView>

      {loading && <Text style={styles.muted}>Lädt …</Text>}

      {!loading && shown.length === 0 && (
        <Text style={styles.muted}>Aktuell keine Stimmen in dieser Kategorie.</Text>
      )}

      {shown.map((c) => (
        <Pressable key={c.id} style={styles.card} onPress={() => Linking.openURL(c.url)}>
          <View style={styles.cardRow}>
            {c.image_url ? (
              <Image source={{ uri: c.image_url }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarInitial}>
                  {c.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <View style={styles.cardBody}>
              <View style={styles.row}>
                <Text style={styles.name}>{c.name}</Text>
                <Text style={styles.platform}>{c.platform}</Text>
              </View>
              <Text style={styles.vibe}>
                {vibeLabels[c.vibe]} · {languageLabels[c.language]}
              </Text>
              <Text style={styles.blurb}>{c.blurb}</Text>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lead: { fontSize: font.body, color: colors.textMuted, lineHeight: 22 },
  muted: { fontSize: font.body, color: colors.textFaint, lineHeight: 22 },
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
  langChip: { color: colors.textFaint },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardRow: { flexDirection: "row", gap: spacing.md, alignItems: "flex-start" },
  cardBody: { flex: 1, gap: spacing.xs },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
  },
  avatarPlaceholder: { alignItems: "center", justifyContent: "center" },
  avatarInitial: { fontSize: font.h3, color: colors.primary, fontWeight: "700" },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  name: { fontSize: font.h3, color: colors.text, fontWeight: "600", flex: 1 },
  platform: { fontSize: font.tiny, color: colors.textFaint },
  vibe: { fontSize: font.tiny, color: colors.primary },
  blurb: { fontSize: font.small, color: colors.textMuted, lineHeight: 20 },
});
