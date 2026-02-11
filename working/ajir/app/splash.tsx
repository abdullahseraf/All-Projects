import { View, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@/src/theme/ThemeContext";
import { typography } from "@/src/theme/typography";

export default function Splash() {
  const { theme } = useTheme();
  const router = useRouter();
  const scale = useRef(new Animated.Value(2)).current; // كبير بالبداية

  useEffect(() => {
    Animated.timing(scale, {
      toValue: 1, // يصغر مباشرة
      duration: 800,
      useNativeDriver: true,
    }).start(async () => {
      const firstTime = await AsyncStorage.getItem("firstTime");

      if (firstTime === null) {
        await AsyncStorage.setItem("firstTime", "false");
        router.replace("/Onboarding/IntroScreen");
      } else {
        router.replace("/Onboarding/IntroScreen");
      }
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.Text
        style={[
          typography.elmessiriBold,
          {
            color: theme.logoJ,
            fontSize: 70,
            transform: [{ scale }],
          },
        ]}
      >
        <View>أ</View>
          جر
      </Animated.Text>
    </View>
  );
}
