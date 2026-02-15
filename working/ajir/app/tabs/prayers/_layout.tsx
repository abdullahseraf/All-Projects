import { Stack } from "expo-router";

export default function PrayersLayout() {
  return (
    <Stack
      screenOptions={{
        animation: "none",
        headerShown: false,
      }}
    />
  );
}
