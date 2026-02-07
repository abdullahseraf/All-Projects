import { COLORS } from "@/src/constants/colors";
import { typography } from "@/src/theme/typography";
import { useFonts } from "expo-font";
import { Pressable, Text, View } from "react-native";
import { darkTheme } from "../src/theme/dark";
export default function Index() {
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
        backgroundColor: darkTheme.background,
      }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text
          style={[
            typography.elmessiriBold,
            { padding: 10, fontSize: 40, color: darkTheme.title },
          ]}
        >
          <Text
            style={ { fontSize: 40, color: COLORS.soft }}
          >
            أ
          </Text>
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
              backgroundColor: darkTheme.cardAlt,
              color: darkTheme.accent,
            },
          ]}
        >
          إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا
        </Text>
        <Pressable onPress={() => alert("تتبع الصلوات اليومية")}>
          <Text
            style={[
              typography.readexproRegular,
              { paddingTop: 5, fontSize: 18, color: COLORS.soft },
            ]}
          >
            تتبع الصلوات اليومية
          </Text>
        </Pressable>
      </View>
      <View style={{ paddingBottom: 20 }}>
        <Text
          style={[
            typography.readexproBold,
            {
              fontSize: 15,
              color: darkTheme.text,
            },
          ]}
        >
          made by{" "}
          <Text style={{ color: darkTheme.secondary }}> @abdullahSeraf </Text>
        </Text>
      </View>
    </View>
  );
}
