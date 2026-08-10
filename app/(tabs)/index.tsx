import { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { Link, useFocusEffect, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, font, radius, spacing } from "@/lib/theme";
import { getCheckIns, hasCheckedInToday, type CheckIn } from "@/lib/checkins";
import { exercises } from "@/content/exercises";
import MoodTrend from "@/components/MoodTrend";
import ExerciseCard from "@/components/ExerciseCard";
import OneStepBridge from "@/components/OneStepBridge";

function greeting() {
  const h = new Date().getHours();
  if (h < 11) return "Guten Morgen";
  if (h < 17) return "Hallo";
  return "Guten Abend";
}

export default function SpaceScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [doneToday, setDoneToday] = useState(false);

  const load = useCallback(async () => {
    setCheckIns(await getCheckIns());
    setDoneToday(await hasCheckedInToday());
  }, []);

  // Reload whenever the tab regains focus (e.g. after a check-in).
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const latestMood = checkIns[0]?.mood;

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{
        padding: spacing.md,
        paddingTop: insets.top + spacing.md,
        paddingBottom: spacing.xxl,
        gap: spacing.lg,
      }}
    >
      <View style={styles.header}>
        <Text style={styles.hello}>{greeting()}.</Text>
        <Link href="/help" asChild>
          <Pressable hitSlop={8}>
            <Text style={styles.help}>Hilfe</Text>
          </Pressable>
        </Link>
      </View>

      <Text style={styles.sub}>
        Ein ruhiger Ort für deine Klimasorgen – und ein kleiner Schritt nach
        vorne, wenn du magst.
      </Text>

      {/* Daily check-in */}
      {doneToday ? (
        <View style={styles.doneCard}>
          <Text style={styles.doneTitle}>Check-in für heute erledigt ✓</Text>
          <Text style={styles.doneSub}>
            Schön, dass du kurz innegehalten hast.
          </Text>
        </View>
      ) : (
        <Pressable
          style={styles.checkInCta}
          onPress={() => router.push("/check-in")}
        >
          <Text style={styles.checkInTitle}>Wie geht es dir heute?</Text>
          <Text style={styles.checkInSub}>Ein Tipp genügt · dauert 20 Sek.</Text>
        </Pressable>
      )}

      {/* The bridge from feeling to doing */}
      <OneStepBridge mood={latestMood} />

      {/* Mood trend */}
      <MoodTrend checkIns={checkIns} />

      {/* Exercises */}
      <View style={{ gap: spacing.sm }}>
        <Text style={styles.sectionTitle}>Übungen zum Ankommen</Text>
        {exercises.slice(0, 4).map((ex) => (
          <ExerciseCard key={ex.id} exercise={ex} />
        ))}
        <Link href="/exercises-all" asChild>
          <Pressable>
            <Text style={styles.moreLink}>Alle Übungen ansehen →</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hello: { fontSize: font.h1, color: colors.text, fontWeight: "700" },
  help: { fontSize: font.small, color: colors.help, fontWeight: "600" },
  sub: { fontSize: font.body, color: colors.textMuted, lineHeight: 22 },
  checkInCta: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  checkInTitle: { fontSize: font.h2, color: "#fff", fontWeight: "700" },
  checkInSub: { fontSize: font.small, color: "#E6F0EA", marginTop: spacing.xs },
  doneCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  doneTitle: { fontSize: font.h3, color: colors.text, fontWeight: "600" },
  doneSub: { fontSize: font.small, color: colors.textMuted, marginTop: 2 },
  sectionTitle: { fontSize: font.h3, color: colors.text, fontWeight: "600" },
  moreLink: {
    fontSize: font.small,
    color: colors.primary,
    paddingVertical: spacing.sm,
  },
});
