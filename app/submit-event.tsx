import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { colors, font, radius, spacing } from "@/lib/theme";
import { isSupabaseConfigured } from "@/lib/supabase";
import { CITIES, submitEvent } from "@/lib/events";
import { useAuth } from "@/lib/auth-context";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

export default function SubmitEventScreen() {
  const router = useRouter();
  const { session, loading } = useAuth();

  const [title, setTitle] = useState("");
  const [city, setCity] = useState(CITIES[0]);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("18:00");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  async function submit() {
    if (!title.trim()) {
      setError("Bitte einen Titel eingeben.");
      return;
    }
    if (!DATE_RE.test(date) || !TIME_RE.test(time)) {
      setError("Datum im Format JJJJ-MM-TT, Zeit im Format SS:MM angeben.");
      return;
    }
    const starts = new Date(`${date}T${time}:00`);
    if (Number.isNaN(starts.getTime())) {
      setError("Datum/Zeit konnte nicht gelesen werden.");
      return;
    }
    if (starts.getTime() <= Date.now()) {
      setError("Der Anlass sollte in der Zukunft liegen.");
      return;
    }

    setError(null);
    setSaving(true);
    try {
      await submitEvent({
        title,
        city,
        location,
        description,
        starts_at: starts.toISOString(),
      });
      setDone(true);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Einreichen hat nicht geklappt."
      );
    } finally {
      setSaving(false);
    }
  }

  if (!isSupabaseConfigured) {
    return (
      <View style={styles.wrap}>
        <Text style={styles.title}>Anlass einreichen</Text>
        <Text style={styles.sub}>
          Cloud-Sync ist in dieser Version noch nicht eingerichtet — Einreichen
          braucht eine Verbindung zur Cloud.
        </Text>
      </View>
    );
  }

  if (!loading && !session) {
    return (
      <View style={styles.wrap}>
        <Text style={styles.title}>Erst anmelden</Text>
        <Text style={styles.sub}>
          Damit wir Einreichungen zuordnen können, meld dich zuerst mit deiner
          E-Mail-Adresse an.
        </Text>
        <Link href="/account" asChild>
          <Pressable style={styles.saveBtn}>
            <Text style={styles.saveText}>Zu Konto</Text>
          </Pressable>
        </Link>
      </View>
    );
  }

  if (done) {
    return (
      <View style={styles.wrap}>
        <View style={styles.doneCard}>
          <Text style={styles.doneTitle}>Danke ✓</Text>
          <Text style={styles.doneSub}>
            Dein Anlass wurde eingereicht und wartet auf Freigabe, bevor er
            für alle sichtbar wird.
          </Text>
        </View>
        <Pressable style={styles.saveBtn} onPress={() => router.back()}>
          <Text style={styles.saveText}>Fertig</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.wrap}
        contentContainerStyle={{ gap: spacing.md, paddingBottom: spacing.xxl }}
      >
        <Text style={styles.title}>Anlass einreichen</Text>
        <Text style={styles.sub}>
          Dein Anlass wird geprüft, bevor er für alle sichtbar ist.
        </Text>

        <Text style={styles.label}>Titel</Text>
        <TextInput
          style={styles.input}
          placeholder="z.B. Klimastreik – Freitagsdemo"
          placeholderTextColor={colors.textFaint}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Stadt</Text>
        <View style={styles.chips}>
          {CITIES.map((c) => (
            <Pressable
              key={c}
              style={[styles.chip, city === c && styles.chipActive]}
              onPress={() => setCity(c)}
            >
              <Text
                style={[
                  styles.chipText,
                  city === c && styles.chipTextActive,
                ]}
              >
                {c}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Ort (optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="z.B. Helvetiaplatz"
          placeholderTextColor={colors.textFaint}
          value={location}
          onChangeText={setLocation}
        />

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Datum</Text>
            <TextInput
              style={styles.input}
              placeholder="JJJJ-MM-TT"
              placeholderTextColor={colors.textFaint}
              value={date}
              onChangeText={setDate}
              keyboardType="numbers-and-punctuation"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Zeit</Text>
            <TextInput
              style={styles.input}
              placeholder="SS:MM"
              placeholderTextColor={colors.textFaint}
              value={time}
              onChangeText={setTime}
              keyboardType="numbers-and-punctuation"
            />
          </View>
        </View>

        <Text style={styles.label}>Beschreibung (optional)</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Ein bis zwei Sätze genügen …"
          placeholderTextColor={colors.textFaint}
          value={description}
          onChangeText={setDescription}
          multiline
          maxLength={400}
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <Pressable
          style={[styles.saveBtn, saving && styles.saveBtnDisabled]}
          disabled={saving}
          onPress={submit}
        >
          <Text style={styles.saveText}>
            {saving ? "Senden …" : "Einreichen"}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg, padding: spacing.lg },
  title: { fontSize: font.h2, color: colors.text, fontWeight: "700" },
  sub: {
    fontSize: font.body,
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: font.small,
    color: colors.textMuted,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: font.body,
    color: colors.text,
  },
  multiline: { minHeight: 80, textAlignVertical: "top" },
  row: { flexDirection: "row", gap: spacing.md },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: font.small, color: colors.textMuted },
  chipTextActive: { color: "#fff", fontWeight: "600" },
  error: { color: colors.help, fontSize: font.small },
  saveBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    padding: spacing.md,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  saveBtnDisabled: { opacity: 0.6 },
  saveText: { color: "#fff", fontSize: font.body, fontWeight: "700" },
  doneCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  doneTitle: { fontSize: font.h3, color: colors.text, fontWeight: "600" },
  doneSub: { fontSize: font.small, color: colors.textMuted, lineHeight: 20 },
});
