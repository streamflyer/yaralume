import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { addCheckIn } from "@/lib/checkins";
import { colors, font, radius, spacing } from "@/lib/theme";

const MOODS = [
  { value: 1, face: "😞", label: "Schwer" },
  { value: 2, face: "😟", label: "Belastet" },
  { value: 3, face: "😐", label: "Geht so" },
  { value: 4, face: "🙂", label: "Ganz gut" },
  { value: 5, face: "😌", label: "Ruhig" },
];

export default function CheckInScreen() {
  const router = useRouter();
  const [mood, setMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  async function save() {
    if (mood === null) return;
    setSaving(true);
    await addCheckIn(mood, note);
    // If very low, gently surface help resources instead of just closing.
    if (mood <= 2) {
      router.replace("/help");
    } else {
      router.back();
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.wrap}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Wie geht es dir heute?</Text>
      <Text style={styles.sub}>
        Es gibt keine falsche Antwort. Wähl einfach, was gerade stimmt.
      </Text>

      <View style={styles.moods}>
        {MOODS.map((m) => {
          const selected = mood === m.value;
          return (
            <Pressable
              key={m.value}
              style={[styles.mood, selected && styles.moodSelected]}
              onPress={() => setMood(m.value)}
            >
              <Text style={styles.face}>{m.face}</Text>
              <Text
                style={[styles.moodLabel, selected && styles.moodLabelSel]}
              >
                {m.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.optLabel}>Was beschäftigt dich? (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ein Satz genügt …"
        placeholderTextColor={colors.textFaint}
        value={note}
        onChangeText={setNote}
        multiline
        maxLength={280}
      />

      <Pressable
        style={[styles.saveBtn, mood === null && styles.saveBtnDisabled]}
        disabled={mood === null || saving}
        onPress={save}
      >
        <Text style={styles.saveText}>
          {saving ? "Speichern …" : "Check-in speichern"}
        </Text>
      </Pressable>

      <Text style={styles.privacy}>
        Dein Check-in bleibt privat und wird auf deinem Gerät gespeichert.
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg, padding: spacing.lg, gap: spacing.md },
  title: { fontSize: font.h2, color: colors.text, fontWeight: "700" },
  sub: { fontSize: font.body, color: colors.textMuted, lineHeight: 22 },
  moods: { flexDirection: "row", justifyContent: "space-between", marginTop: spacing.sm },
  mood: {
    alignItems: "center",
    padding: spacing.sm,
    borderRadius: radius.md,
    width: 62,
  },
  moodSelected: { backgroundColor: colors.primarySoft },
  face: { fontSize: 30 },
  moodLabel: { fontSize: font.tiny, color: colors.textFaint, marginTop: 4 },
  moodLabelSel: { color: colors.primary, fontWeight: "600" },
  optLabel: { fontSize: font.small, color: colors.textMuted, marginTop: spacing.md },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: font.body,
    color: colors.text,
    minHeight: 90,
    textAlignVertical: "top",
  },
  saveBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    padding: spacing.md,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  saveBtnDisabled: { backgroundColor: colors.accent, opacity: 0.6 },
  saveText: { color: "#fff", fontSize: font.body, fontWeight: "700" },
  privacy: { fontSize: font.tiny, color: colors.textFaint, textAlign: "center" },
});
