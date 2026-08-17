import * as Linking from "expo-linking";
import { supabase } from "./supabase";

// Deep link the magic-link email redirects back to. Must also be added to
// Supabase → Authentication → URL Configuration → Redirect URLs.
export function getAuthRedirectUrl() {
  return Linking.createURL("auth/callback");
}

export async function sendMagicLink(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email: email.trim(),
    options: { emailRedirectTo: getAuthRedirectUrl() },
  });
  if (error) throw error;
}

// Completes sign-in from a magic-link deep link. Returns true if the URL
// carried an auth code that was exchanged for a session.
export async function handleAuthRedirect(url: string): Promise<boolean> {
  const { queryParams } = Linking.parse(url);
  const code = queryParams?.code;
  if (typeof code !== "string") return false;
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) throw error;
  return true;
}

export function signOut() {
  return supabase.auth.signOut();
}
