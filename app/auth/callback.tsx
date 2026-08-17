import { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { colors, font, spacing } from "@/lib/theme";

// Landing spot for the magic-link redirect (see lib/auth.ts getAuthRedirectUrl).
// On web, supabase-js already exchanges the `code` query param for a session
// automatically (detectSessionInUrl: true); on native, AuthProvider's Linking
// listener does the exchange. Either way, this screen just bounces to Account,
// which reacts to the session appearing via useAuth().
export default function AuthCallbackScreen() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/account");
  }, [router]);

  return (
    <View style={styles.wrap}>
      <ActivityIndicator color={colors.primary} />
      <Text style={styles.text}>Du wirst angemeldet …</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bg,
    gap: spacing.md,
  },
  text: { fontSize: font.body, color: colors.textMuted },
});
