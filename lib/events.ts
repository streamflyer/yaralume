import { isSupabaseConfigured, supabase } from "./supabase";
import { seedEvents } from "@/content/seedEvents";

export type ClimateEvent = {
  id: string;
  title: string;
  city: string;
  location?: string;
  description?: string;
  starts_at: string; // ISO
  source?: string; // e.g. "fridaysforfuture", "manual"
  url?: string;
};

// Fetches upcoming, approved events. Falls back to bundled seed data so the
// Events tab is never empty during development or before the backend is live
// (plan §4C: an empty map kills the feature — always seed).
export async function fetchUpcomingEvents(): Promise<ClimateEvent[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("status", "approved")
        .gte("starts_at", new Date().toISOString())
        .order("starts_at", { ascending: true })
        .limit(100);
      if (!error && data && data.length > 0) {
        return data as ClimateEvent[];
      }
    } catch (e) {
      console.warn("[ClimateBuddy] events fetch failed, using seed", e);
    }
  }
  // Local fallback: future-dated seed events, soonest first.
  return [...seedEvents]
    .filter((e) => new Date(e.starts_at) >= new Date())
    .sort((a, b) => a.starts_at.localeCompare(b.starts_at));
}
