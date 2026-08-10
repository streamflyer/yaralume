import { View, Text, ScrollView, Pressable, StyleSheet, Linking } from "react-native";
import { disclaimer, swissResources } from "@/content/crisis";
import { colors, font, radius, spacing } from "@/lib/theme";

export default function HelpScreen() {
  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl }}
    >
      <Text style={styles.title}>Du bist nicht allein</Text>
      <Text style={styles.disclaimer}>{disclaimer}</Text>

      {swissResources.map((r) => (
        <View key={r.name} style={styles.card}>
          <Text style={styles.name}>{r.name}</Text>
          <Text style={styles.note}>{r.note}</Text>
          <View style={styles.actions}>
            {r.phone && (
              <Pressable
                style={styles.callBtn}
                onPress={() => Linking.openURL(`tel:${r.phone}`)}
              >
                <Text style={styles.callText}>Anrufen · {r.phone}</Text>
              </Pressable>
            )}
            {r.url && (
              <Pressable onPress={() => Linking.openURL(r.url!)}>
                <Text style={styles.link}>Website</Text>
              </Pressable>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: font.h1, color: colors.text, fontWeight: "700" },
  disclaimer: { fontSize: font.body, color: colors.textMuted, lineHeight: 22 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  name: { fontSize: font.h3, color: colors.text, fontWeight: "600" },
  note: { fontSize: font.small, color: colors.textMuted, lineHeight: 20 },
  actions: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginTop: spacing.sm },
  callBtn: {
    backgroundColor: colors.help,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  callText: { color: "#fff", fontSize: font.small, fontWeight: "700" },
  link: { color: colors.primary, fontSize: font.small, fontWeight: "600" },
});
