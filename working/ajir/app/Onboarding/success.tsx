import { View, Text, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@/src/theme/ThemeContext";
import { typography } from "@/src/theme/typography";
import { StatusBar } from "expo-status-bar";

export default function SuccessScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const handleStart = async () => {
    await AsyncStorage.setItem("onboardingCompleted", "true");
    router.replace("/tabs");
  };

  return (
    <View
      style={{
        backgroundColor: theme.background,
        flexDirection: "column",
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 40,
        }}
      >
        <StatusBar style="light" backgroundColor={theme.background} />

        {/* صورة (اختياري) */}
        <Image
          source={require("@/src/assets/images/musbaha.png")}
          style={{
            width: 230,
            height: 180,
            resizeMode: "contain",
            marginBottom: 30,
          }}
        />

        <Text
          style={[
            typography.readexproSemiBold,
            {
              color: theme.logoJ,
              fontSize: 24,
              textAlign: "center",
              marginBottom: 15,
            },
          ]}
        >
          تم تحديد الموقع بنجاح
        </Text>

        <Text
          style={{
            color: theme.İnputB,
            fontSize: 17,
            textAlign: "center",
            marginBottom: 50,
          }}
        >
          يمكنك تصفح التطبيق الان
        </Text>
      </View>
      <View>
        <Pressable
          onPress={handleStart}
          style={{
            backgroundColor: theme.İntrotB,
            padding: 14,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text
            style={[
              typography.readexproMedium,
              { color: theme.cTitle, fontSize: 14 },
            ]}
          >
            البدء الآن
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
