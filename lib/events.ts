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

export const CITIES = ["Zürich", "Bern", "Winterthur", "Basel", "St. Gallen"];

export type NewEvent = {
  title: string;
  city: string;
  location?: string;
  description?: string;
  starts_at: string; // ISO
};

// Submits a user event for moderation. Lands as status='pending' per the RLS
// policy in supabase/schema.sql — it won't show up in fetchUpcomingEvents()
// until approved via the Supabase dashboard. Throws if unconfigured, signed
// out, or the insert fails, so the submit screen can surface a clear error.
export async function submitEvent(input: NewEvent): Promise<void> {
  if (!isSupabaseConfigured) {
    throw new Error("Cloud-Sync ist nicht eingerichtet.");
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Bitte zuerst anmelden.");
  }

  const { error } = await supabase.from("events").insert({
    title: input.title.trim(),
    city: input.city,
    location: input.location?.trim() || null,
    description: input.description?.trim() || null,
    starts_at: input.starts_at,
    source: "manual",
    status: "pending",
    submitted_by: user.id,
  });
  if (error) throw error;
}

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
      console.warn("[Yaralume] events fetch failed, using seed", e);
    }
  }
  // Local fallback: future-dated seed events, soonest first.
  return [...seedEvents]
    .filter((e) => new Date(e.starts_at) >= new Date())
    .sort((a, b) => a.starts_at.localeCompare(b.starts_at));
}
