import { Tabs } from "expo-router";
import { Text } from "react-native";
import { colors, font } from "@/lib/theme";

// Simple emoji tab icons keep the scaffold dependency-free. Swap for a proper
// icon set (e.g. @expo/vector-icons) when you polish the UI.
function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{label}</Text>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerShadowVisible: false,
        headerTitleStyle: { color: colors.text, fontSize: font.h3 },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textFaint,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Yaralume",
          tabBarIcon: ({ focused }) => <TabIcon label="🌱" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: "News",
          tabBarIcon: ({ focused }) => <TabIcon label="📰" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ focused }) => <TabIcon label="📍" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="creators"
        options={{
          title: "Stimmen",
          tabBarIcon: ({ focused }) => <TabIcon label="🎙️" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
