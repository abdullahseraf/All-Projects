import { typography } from "@/src/theme/typography";
import { useFonts } from "expo-font";
import { Text, View } from "react-native";
import { darkTheme } from "../src/theme/dark";

export default function Index() {
  const [fontsLoaded] = useFonts({
    ReadexPro: require("../src/assets/fonts/ReadexPro-Medium.ttf"),
    ElMessiri: require("../src/assets/fonts/ElMessiri-Medium.ttf"),
    AmiriQuran: require("../src/assets/fonts/AmiriQuran-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: darkTheme.background,
      }}
    >
      <Text style={[typography.title, { padding: 10, fontSize: 28, color: darkTheme.secondary }]}>أجر</Text>
            <Text style={ [typography.quran, { padding: 10, borderRadius: 10, backgroundColor: darkTheme.primary, color: darkTheme.accent }] }>
         إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا 
      </Text>
            <Text style={[typography.paragraph, { padding: 10, color: darkTheme.title }]}>
        تتبع الصلوات اليومية
      </Text>
    </View>
  );
}