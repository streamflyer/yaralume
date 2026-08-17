import { isSupabaseConfigured, supabase } from "./supabase";
import { creators as fallbackCreators, type Creator } from "@/content/creators";

// Fetches the curated, active creators from Supabase. Falls back to the
// bundled placeholder list so the Stimmen tab is never empty during
// development or before the table has real entries (same pattern as
// fetchUpcomingEvents in lib/events.ts).
export async function fetchCreators(): Promise<Creator[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("creators")
        .select("id, name, vibe, language, platform, handle, url, blurb, image_url")
        .eq("active", true)
        .order("created_at", { ascending: true });
      if (!error && data && data.length > 0) {
        return data as Creator[];
      }
    } catch (e) {
      console.warn("[Yaralume] creators fetch failed, using placeholders", e);
    }
  }
  return fallbackCreators;
}
