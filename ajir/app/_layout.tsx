import { Stack, useRouter } from "expo-router";
import { ThemeProvider } from "@/src/theme/ThemeContext";
import { SystemBars } from "react-native-edge-to-edge";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      response => {
        const screen = response.notification.request.content.data?.screen;
        if (screen) {
          router.push(`./tabs/prayers/${screen}`); // مثال: /tabs/prayers/fajr
        }
      }
    );

    return () => subscription.remove();
  }, []);

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <SystemBars style={"light"} />
        <Stack screenOptions={{ animation: "none", headerShown: false }}>
          <Stack.Screen name="splash" />
          <Stack.Screen name="tabs" />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
