import { View, Animated, Text } from "react-native";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@/src/theme/ThemeContext";
import { typography } from "@/src/theme/typography";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

export default function Splash() {
  const { theme } = useTheme();
  const router = useRouter();
  const scale = useRef(new Animated.Value(3)).current; // كبير بالبداية

  const [fontsLoaded] = useFonts({
    ElMessiriRegular: require("@/src/assets/fonts/ElMessiri-Regular.ttf"),
    ElMessiriMedium: require("@/src/assets/fonts/ElMessiri-Medium.ttf"),
    ElMessiriSemiBold: require("@/src/assets/fonts/ElMessiri-SemiBold.ttf"),
    ElMessiriBold: require("@/src/assets/fonts/ElMessiri-Bold.ttf"),
    ReadexProRegular: require("@/src/assets/fonts/ReadexPro-Regular.ttf"),
    ReadexProMedium: require("@/src/assets/fonts/ReadexPro-Medium.ttf"),
    ReadexProSemiBold: require("@/src/assets/fonts/ReadexPro-SemiBold.ttf"),
    ReadexProBold: require("@/src/assets/fonts/ReadexPro-Bold.ttf"),
    AmiriQuran: require("@/src/assets/fonts/AmiriQuran-Regular.ttf"),
  });

  // تأكد من تحميل الخطوط قبل بدء الأنيميشن
  useEffect(() => {
    if (fontsLoaded) {
      Animated.timing(scale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        checkFirstTime();
      });
    }
  }, [fontsLoaded]);

  const checkFirstTime = async () => {
    const completed = await AsyncStorage.getItem("onboardingCompleted");
    if (completed === "true") {
      router.replace("/tabs");
    } else {
      router.replace("/Onboarding/IntroScreen");
    }
  };

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
        }}
      >
        <Text style={{ color: theme.cTitle }}>جاري تحميل الخطوط...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar style="light" backgroundColor={"#00000000"} />
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
