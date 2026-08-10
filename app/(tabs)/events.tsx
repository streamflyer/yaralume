import { useCallback, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useFocusEffect, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, font, radius, spacing } from "@/lib/theme";
import { fetchUpcomingEvents, type ClimateEvent } from "@/lib/events";

const CITIES = ["Alle", "Zürich", "Bern", "Winterthur", "Basel", "St. Gallen"];

export default function EventsScreen() {
  const insets = useSafeAreaInsets();
  const [events, setEvents] = useState<ClimateEvent[]>([]);
  const [city, setCity] = useState("Alle");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setEvents(await fetchUpcomingEvents());
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const shown =
    city === "Alle" ? events : events.filter((e) => e.city === city);

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: spacing.md, paddingTop: insets.top + spacing.sm, gap: spacing.md, paddingBottom: spacing.xxl }}
    >
      <Stack.Screen options={{ title: "Events" }} />
      <Text style={styles.lead}>
        Streiks, Podien und Aktionen in deiner Nähe.
      </Text>

      {/* City filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm }}>
        {CITIES.map((c) => (
          <Text
            key={c}
            onPress={() => setCity(c)}
            style={[styles.chip, city === c && styles.chipActive]}
          >
            {c}
          </Text>
        ))}
      </ScrollView>

      {loading && <Text style={styles.muted}>Lädt …</Text>}

      {!loading && shown.length === 0 && (
        <Text style={styles.muted}>
          Aktuell keine Anlässe in {city}. Schau bald wieder vorbei – oder reiche
          selbst einen ein.
        </Text>
      )}

      {shown.map((e) => (
        <View key={e.id} style={styles.card}>
          <Text style={styles.date}>
            {new Date(e.starts_at).toLocaleDateString("de-CH", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
            {"  ·  "}
            {e.city}
          </Text>
          <Text style={styles.eventTitle}>{e.title}</Text>
          {e.location ? <Text style={styles.loc}>{e.location}</Text> : null}
          {e.description ? (
            <Text style={styles.desc} numberOfLines={3}>
              {e.description}
            </Text>
          ) : null}
        </View>
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
  chipActive: {
    color: "#fff",
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  muted: { fontSize: font.body, color: colors.textFaint, lineHeight: 22 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  date: { fontSize: font.tiny, color: colors.primary, fontWeight: "600" },
  eventTitle: { fontSize: font.h3, color: colors.text, fontWeight: "600" },
  loc: { fontSize: font.small, color: colors.textMuted },
  desc: { fontSize: font.small, color: colors.textMuted, lineHeight: 20 },
});
