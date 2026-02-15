import { View, Text, ImageBackground, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/src/theme/ThemeContext";
import { typography } from "@/src/theme/typography";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

export default function IntroScreen() {
  const { theme } = useTheme();
  const router = useRouter();

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

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("@/src/assets/images/musalin.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <StatusBar style="light" backgroundColor="" />
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          paddingHorizontal: 20,
          paddingVertical: 40,
          backgroundColor: "rgba(0,0,0,0.20)",
        }}
      >
        <Text
          style={[
            typography.readexproSemiBold,
            {
              color: theme.cTitle,
              fontSize: 32,
              textAlign: "right",
              marginBottom: 10,
            },
          ]}
        >
          مرحباً بك في تطبيق
          <Text
            style={[
              typography.elmessiriBold,
              {
                color: theme.cTitle,
                fontSize: 32,
              },
            ]}
          >
            <Text style={{ color: theme.logoA }}> أ</Text>
            جر
          </Text>
        </Text>

        <Text
          style={{
            color: theme.İnputB,
            fontSize: 18,
            textAlign: "right",
            marginBottom: 40,
          }}
        >
          تتبع صلواتك يوميًا واقترب أكثر
        </Text>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 2,
            paddingBottom: 20,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: "47%",
              backgroundColor: theme.cTitle,
              height: 4,
              borderRadius: 5,
            }}
          ></View>
          <View
            style={{
              width: "47%",
              backgroundColor: theme.card,
              height: 4,
              borderRadius: 5,
            }}
          ></View>
        </View>
        <Pressable
          onPress={() => router.navigate("/Onboarding/WelcomeScreen")}
          style={{
            backgroundColor: theme.İntrotB,
            padding: 14,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={[typography.readexproMedium,{ color: theme.cTitle, fontSize: 14 }]}>التالي</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}
