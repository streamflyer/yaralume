import AsyncStorage from "@react-native-async-storage/async-storage";
import { isSupabaseConfigured, supabase } from "./supabase";

// A single daily check-in. mood is 1 (low) .. 5 (good).
export type CheckIn = {
  id: string;
  mood: number;
  note?: string;
  created_at: string; // ISO
};

const KEY = "climatebuddy.checkins.v1";

// Local-first: always store on device so the app works offline / pre-backend.
// When Supabase is configured and the user is signed in, we also upsert to the
// cloud. Mood/check-in data is sensitive (see plan §10 Privacy) — keep it minimal.

export async function getCheckIns(): Promise<CheckIn[]> {
  const raw = await AsyncStorage.getItem(KEY);
  const list: CheckIn[] = raw ? JSON.parse(raw) : [];
  return list.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function addCheckIn(mood: number, note?: string): Promise<CheckIn> {
  const entry: CheckIn = {
    id: `${Date.now()}`,
    mood,
    note: note?.trim() || undefined,
    created_at: new Date().toISOString(),
  };

  const list = await getCheckIns();
  list.unshift(entry);
  await AsyncStorage.setItem(KEY, JSON.stringify(list));

  if (isSupabaseConfigured) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("check_ins").insert({
          user_id: user.id,
          mood: entry.mood,
          note: entry.note ?? null,
          created_at: entry.created_at,
        });
      }
    } catch (e) {
      // Never block the user on a sync failure; local copy is source of truth.
      console.warn("[ClimateBuddy] check-in sync failed", e);
    }
  }

  return entry;
}

// Returns true if there is already a check-in for today (local device time).
export async function hasCheckedInToday(): Promise<boolean> {
  const list = await getCheckIns();
  const today = new Date().toDateString();
  return list.some((c) => new Date(c.created_at).toDateString() === today);
}
