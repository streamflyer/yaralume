import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured =
  supabaseUrl.length > 0 && supabaseAnonKey.length > 0;

if (!isSupabaseConfigured) {
  // Non-fatal: the app runs in "local-only" mode so you can develop the
  // Wellbeing Space UI before wiring the backend. Fill in .env to enable sync.
  console.warn(
    "[Yaralume] Supabase not configured — running in local-only mode. " +
      "Copy .env.example to .env and add your Supabase URL + anon key."
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "public-anon-placeholder",
  {
    auth: {
      // AsyncStorage on native; localStorage in the browser.
      storage: Platform.OS === "web" ? undefined : AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: Platform.OS === "web",
      // PKCE lets the magic-link email carry a short-lived `code` instead of
      // a raw access token, and works for both web and native deep links.
      flowType: "pkce",
    },
  }
);
