import AsyncStorage from "@react-native-async-storage/async-storage";
import { isSupabaseConfigured, supabase } from "./supabase";

// A single daily check-in. mood is 1 (low) .. 5 (good).
export type CheckIn = {
  id: string;
  mood: number;
  note?: string;
  created_at: string; // ISO
};

const KEY = "yaralume.checkins.v1";

// Client-generated id (not security-sensitive) so the same check-in has the
// same id locally and in Supabase — that's what lets syncCheckIns() merge
// the two lists without creating duplicates.
function generateId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

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
    id: generateId(),
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
        await supabase.from("check_ins").upsert({
          id: entry.id,
          user_id: user.id,
          mood: entry.mood,
          note: entry.note ?? null,
          created_at: entry.created_at,
        });
      }
    } catch (e) {
      // Never block the user on a sync failure; local copy is source of truth.
      console.warn("[Yaralume] check-in sync failed", e);
    }
  }

  return entry;
}

// Pulls the signed-in user's check-ins from Supabase, merges them with the
// local copy (by id, so nothing is duplicated), pushes up anything the cloud
// is missing (e.g. saved while offline or signed out), and returns the
// merged, sorted list. Falls back to the local list when unconfigured, signed
// out, or offline — never throws.
export async function syncCheckIns(): Promise<CheckIn[]> {
  if (!isSupabaseConfigured) return getCheckIns();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return getCheckIns();

    const { data, error } = await supabase
      .from("check_ins")
      .select("id, mood, note, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw error;

    const local = await getCheckIns();
    const remote = data ?? [];

    const merged = new Map<string, CheckIn>();
    for (const c of local) merged.set(c.id, c);
    for (const row of remote) {
      merged.set(row.id, {
        id: row.id,
        mood: row.mood,
        note: row.note ?? undefined,
        created_at: row.created_at,
      });
    }
    const list = Array.from(merged.values()).sort((a, b) =>
      b.created_at.localeCompare(a.created_at)
    );
    await AsyncStorage.setItem(KEY, JSON.stringify(list));

    const remoteIds = new Set(remote.map((r) => r.id));
    const unsynced = local.filter((c) => !remoteIds.has(c.id));
    for (const c of unsynced) {
      await supabase.from("check_ins").upsert({
        id: c.id,
        user_id: user.id,
        mood: c.mood,
        note: c.note ?? null,
        created_at: c.created_at,
      });
    }

    return list;
  } catch (e) {
    console.warn("[Yaralume] check-in sync failed", e);
    return getCheckIns();
  }
}

// Returns true if there is already a check-in for today (local device time).
export async function hasCheckedInToday(): Promise<boolean> {
  const list = await getCheckIns();
  const today = new Date().toDateString();
  return list.some((c) => new Date(c.created_at).toDateString() === today);
}
