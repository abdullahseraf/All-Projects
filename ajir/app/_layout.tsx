import { Stack } from "expo-router";
import { ThemeProvider } from "@/src/theme/ThemeContext";
import { SystemBars } from "react-native-edge-to-edge";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        {/* SystemBars تتحكم بالشريطين معاً */}
        <SystemBars style={"light"} />
        <Stack screenOptions={{ animation: "none", headerShown: false }}>
          <Stack.Screen name="splash" />
          <Stack.Screen name="tabs" />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
