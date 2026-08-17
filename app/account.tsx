import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { colors, font, radius, spacing } from "@/lib/theme";
import { isSupabaseConfigured } from "@/lib/supabase";
import { sendMagicLink, signOut } from "@/lib/auth";
import { useAuth } from "@/lib/auth-context";

export default function AccountScreen() {
  const { session, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!email.includes("@")) {
      setError("Bitte eine gültige E-Mail-Adresse eingeben.");
      return;
    }
    setError(null);
    setSending(true);
    try {
      await sendMagicLink(email);
      setSent(true);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Der Link konnte nicht gesendet werden."
      );
    } finally {
      setSending(false);
    }
  }

  if (!isSupabaseConfigured) {
    return (
      <View style={styles.wrap}>
        <Text style={styles.title}>Cloud-Sync</Text>
        <Text style={styles.sub}>
          Cloud-Sync ist in dieser Version noch nicht eingerichtet. Deine
          Check-ins bleiben lokal auf diesem Gerät gespeichert.
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={[styles.wrap, styles.centered]}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (session) {
    return (
      <View style={styles.wrap}>
        <Text style={styles.title}>Angemeldet ✓</Text>
        <Text style={styles.sub}>
          Deine Check-ins syncen mit der Cloud unter{"\n"}
          <Text style={styles.bold}>{session.user.email}</Text>.
        </Text>
        <Pressable style={styles.secondaryBtn} onPress={() => signOut()}>
          <Text style={styles.secondaryText}>Abmelden</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.wrap}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Cloud-Sync aktivieren</Text>
      <Text style={styles.sub}>
        Mit deiner E-Mail-Adresse bleiben deine Check-ins erhalten, auch bei
        einem neuen Gerät. Kein Passwort nötig — wir schicken dir einen Link.
      </Text>

      {sent ? (
        <View style={styles.doneCard}>
          <Text style={styles.doneTitle}>Check dein Postfach ✓</Text>
          <Text style={styles.doneSub}>
            Tippe den Link in der E-Mail an {email}, um dich anzumelden.
          </Text>
          <Pressable onPress={() => setSent(false)}>
            <Text style={styles.link}>Andere Adresse verwenden</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="deine@email.ch"
            placeholderTextColor={colors.textFaint}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
          />
          {error && <Text style={styles.error}>{error}</Text>}
          <Pressable
            style={[styles.saveBtn, sending && styles.saveBtnDisabled]}
            disabled={sending}
            onPress={submit}
          >
            <Text style={styles.saveText}>
              {sending ? "Senden …" : "Magic Link senden"}
            </Text>
          </Pressable>
        </>
      )}

      <Text style={styles.privacy}>
        Wir speichern nur deine E-Mail-Adresse für die Anmeldung — keine
        Weitergabe an Dritte.
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg, padding: spacing.lg, gap: spacing.md },
  centered: { alignItems: "center", justifyContent: "center" },
  title: { fontSize: font.h2, color: colors.text, fontWeight: "700" },
  sub: { fontSize: font.body, color: colors.textMuted, lineHeight: 22 },
  bold: { fontWeight: "700", color: colors.text },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: font.body,
    color: colors.text,
  },
  error: { color: colors.help, fontSize: font.small },
  saveBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    padding: spacing.md,
    alignItems: "center",
  },
  saveBtnDisabled: { opacity: 0.6 },
  saveText: { color: "#fff", fontSize: font.body, fontWeight: "700" },
  secondaryBtn: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    padding: spacing.md,
    alignItems: "center",
  },
  secondaryText: { color: colors.text, fontSize: font.body, fontWeight: "600" },
  doneCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  doneTitle: { fontSize: font.h3, color: colors.text, fontWeight: "600" },
  doneSub: { fontSize: font.small, color: colors.textMuted, lineHeight: 20 },
  link: { color: colors.primary, fontSize: font.small, fontWeight: "600" },
  privacy: { fontSize: font.tiny, color: colors.textFaint, textAlign: "center" },
});
