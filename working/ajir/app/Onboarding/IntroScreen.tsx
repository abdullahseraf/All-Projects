import { View, Text, ImageBackground, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function IntroScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("..")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          padding: 30,
          backgroundColor: "rgba(0,0,0,0.45)",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 26,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          مرحباً بك في تطبيق أجر
        </Text>

        <Text
          style={{
            color: "#ddd",
            fontSize: 16,
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          ذكر نفسك... وارتقِ بروحك
        </Text>

        <Pressable
          onPress={() => router.push("/Onboarding/WelcomeScreen")}
          style={{
            backgroundColor: "#0D1B2A",
            padding: 16,
            borderRadius: 14,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>التالي</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}
