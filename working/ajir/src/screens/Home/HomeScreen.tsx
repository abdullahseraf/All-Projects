import { useTheme } from "@/src/theme/ThemeContext";
import { typography } from "@/src/theme/typography";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";

export default function Index() { 
   const { theme } = useTheme();
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
      <StatusBar style="light" backgroundColor={theme.Header} />
      <View
        style={{
          width: "100%",
          height: 100,
          alignItems: "flex-end",
          justifyContent: "flex-end",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 50,
          backgroundColor: theme.Header,
        }}
      >
        <Text
          style={[
            typography.elmessiriBold,
            {
              paddingRight: 35,
              paddingBottom: 15,
              fontSize: 20,
              color: theme.cTitle,
            },
          ]}
        >
          الرئيسية
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text
          style={[
            typography.elmessiriBold,
            { padding: 10, fontSize: 40, color: theme.logoJ },
          ]}
        >
          <Text style={{ fontSize: 40, color: theme.logoA }}>أ</Text>
          جر
        </Text>
        <Text
          style={[
            typography.quran,
            {
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 5,
              borderRadius: 10,
              fontSize: 20,
              backgroundColor: theme.cardAlt,
              color: theme.cText,
            },
          ]}
        >
          إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا
        </Text>
        <Pressable onPress={() => alert("تتبع الصلوات اليومية")}>
          <Text
            style={[
              typography.readexproSemiBold,
              { paddingTop: 5, fontSize: 18, color: theme.NavActive },
            ]}
          >
            تتبع الصلوات اليومية
          </Text>
        </Pressable>
      </View>
      <View style={{ paddingBottom: 20 }}>
        <Text
          style={[
            typography.readexproRegular,
            {
              fontSize: 15,
              color: theme.NavActive,
            },
          ]}
        >
          made by{" "}
          <Text style={{ color: theme.NavActive }}> @abdullahSeraf </Text>
        </Text>
      </View>
    </View>
  );
}
