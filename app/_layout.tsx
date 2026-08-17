import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "@/lib/auth-context";
import { colors } from "@/lib/theme";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
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
          <Stack.Screen
            name="account"
            options={{ presentation: "modal", title: "Konto" }}
          />
          <Stack.Screen
            name="submit-event"
            options={{ presentation: "modal", title: "Anlass einreichen" }}
          />
          <Stack.Screen
            name="auth/callback"
            options={{ headerShown: false }}
          />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
