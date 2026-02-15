import { darkTheme } from "@/src/theme/dark";
import { typography } from "@/src/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Image, Pressable, Text, View } from "react-native";
import { useTheme } from "@/src/theme/ThemeContext";

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
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

  if (!fontsLoaded)
    return (
      <View>
        <Text>Loading fonts...</Text>
      </View>
    );

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.background,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 370,
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 50,
          backgroundColor: theme.Header,
        }}
      >
        <View style={{ position: "absolute", top: 320, right: 110 }}>
          <Text
            style={[
              typography.elmessiriBold,
              {
                fontSize: 20,
                color: theme.cTitle,
                position: "absolute",
              },
            ]}
          >
            الاعدادات
          </Text>
        </View>
        <View>
          <Image
            style={{
              position: "absolute",
              top: -90,
              right: -10,
              width: 280,
              height: 280,
              opacity: 0.8,
            }}
            source={require("@/src/assets/images/Ellipse 1.png")}
          />
          <View>
            <Text
              style={[
                typography.elmessiriMedium,
                {
                  marginLeft: 210,
                  fontSize: 18,
                  color: theme.logoA,
                },
              ]}
            >
              المطور
            </Text>
            <Text
              style={[
                typography.elmessiriBold,
                {
                  fontSize: 34,
                  color: theme.cTitle,
                },
              ]}
            >
              عبدالله شرف الدين
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-start",
          marginTop: 20,
        }}
      >
        <View
          style={{
            width: "90%",
            height: 60,
            backgroundColor: theme.card,
            borderRadius: 10,
            marginBottom: 20,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              backgroundColor: theme.logoA,
              width: 60,
              height: 28,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: theme.cText,
              marginLeft: 20,
              justifyContent: "center",
            }}
          >
            <Pressable
              onPress={toggleTheme}
              style={{
                alignItems: "center",
                backgroundColor: theme.cardAlt,
                padding: 5,
                borderRadius: 5,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name={isDark ? "sunny-outline" : "moon-outline"}
                size={15}
                color={theme.cText}
              />
            </Pressable>
          </View>
          <Text
            style={[
              typography.elmessiriRegular,
              {
                color: theme.cTitle,
                fontSize: 16,
                marginRight: 20,
              },
            ]}
          >
            تبديل الوضع داكن / الفاتح
          </Text>
        </View>
        <View
          style={{
            width: "90%",
            height: 60,
            backgroundColor: theme.card,
            borderRadius: 10,
            marginBottom: 20,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              backgroundColor: theme.cardAlt,
              height: 28,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: theme.cText,
              marginLeft: 20,
              justifyContent: "center",
            }}
          >
            <Text
              style={[
                typography.readexproRegular,
                {
                  color: theme.cText,
                  fontSize: 14,
                  marginHorizontal: 10,
                },
              ]}
            >
              abdullahseraf20@gmail.com
            </Text>
          </View>
          <Text
            style={[
              typography.elmessiriRegular,
              {
                color: theme.cTitle,
                fontSize: 16,
                marginRight: 20,
              },
            ]}
          >
            لترك ملاحظة
          </Text>
        </View>
      </View>
    </View>
  );
}
