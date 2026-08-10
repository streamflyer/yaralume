import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "@/lib/theme";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="check-in"
          options={{ presentation: "modal", title: "Check-in" }}
        />
        <Stack.Screen
          name="exercise/[id]"
          options={{ title: "" }}
        />
        <Stack.Screen
          name="help"
          options={{ presentation: "modal", title: "Hilfe & Notfall" }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
