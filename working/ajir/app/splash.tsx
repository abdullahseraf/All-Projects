import { View, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@/src/theme/ThemeContext";
import { typography } from "@/src/theme/typography";
import { StatusBar } from "expo-status-bar";

export default function Splash() {
  const { theme } = useTheme();
  const router = useRouter();
  const scale = useRef(new Animated.Value(3)).current; // كبير بالبداية

  useEffect(() => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      checkFirstTime();
    });
  }, []);

  const checkFirstTime = async () => {
    await AsyncStorage.clear();

    const completed = await AsyncStorage.getItem("onboardingCompleted");

    if (completed === "true") {
      router.replace("/tabs");
    } else {
      router.replace("/Onboarding/IntroScreen");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar style="auto" backgroundColor={theme.background} />
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
        <Animated.Text style={{ color: theme.logoA }}>أ</Animated.Text>
        جر
      </Animated.Text>
    </View>
  );
}
