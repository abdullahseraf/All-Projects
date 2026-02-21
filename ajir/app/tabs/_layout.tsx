import { useTheme } from "@/src/theme/ThemeContext";
import { typography } from "@/src/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

export default function TabsLayout() {
  const { theme } = useTheme();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  const [fontsLoaded] = useFonts({
    ElMessiriBold: require("@/src/assets/fonts/ElMessiri-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  const renderTab = (
    icon: any,
    iconOutline: any,
    label: string,
    color: string,
    focused: boolean,
  ) => (
    <View
      style={{
        width: 74,
        height: 52,
        borderRadius: 12,
        backgroundColor: focused ? theme.NavActive : "transparent",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
      }}
    >
      <Ionicons name={focused ? icon : iconOutline} size={22} color={color} />
      {focused && (
        <Text
          style={[
            typography.elmessiriBold,
            {
              fontSize: 10,
              color,
            },
          ]}
        >
          {label}
        </Text>
      )}
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        animation: "none",
        tabBarStyle: {
          backgroundColor: theme.Header,
          height: 90,
          paddingTop: 22,
          paddingBottom: 10,
          borderTopWidth: 1,
          borderTopColor: theme.cardAlt,
        },
        tabBarActiveTintColor: theme.cText,
        tabBarInactiveTintColor: theme.Navİcon,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) =>
            renderTab("home", "home-outline", "الرئيسية", color, focused),
        }}
      />

      <Tabs.Screen
        name="prayers"
        options={{
          tabBarIcon: ({ color, focused }) =>
            renderTab("time", "time-outline", "الصلوات", color, focused),
        }}
      />

      <Tabs.Screen
        name="sunan"
        options={{
          tabBarIcon: ({ color, focused }) =>
            renderTab("book", "book-outline", "السنن", color, focused),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, focused }) =>
            renderTab(
              "settings",
              "settings-outline",
              "الإعدادات",
              color,
              focused,
            ),
        }}
      />
    </Tabs>
  );
}
