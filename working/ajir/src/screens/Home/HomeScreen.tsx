import { useTheme } from "@/src/theme/ThemeContext";
import { typography } from "@/src/theme/typography";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";

export default function Index() {
  const { theme } = useTheme();
  const prayers = [
    { name: "العشاء", time: "4 : 05" },
    { name: "المغرب", time: "4 : 05" },
    { name: "العصر", time: "4 : 05" },
    { name: "الظهر", time: "4 : 05" },
    { name: "الفجر", time: "4 : 05" },
  ];
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
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar style="light" backgroundColor={theme.Header} />

      {/* Header */}
      <View
        style={{
          width: "100%",
          height: 100,
          alignItems: "flex-end",
          justifyContent: "flex-end",
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

      {/* Section Title */}
      <View
        style={{
          height: 50,
          width: "90%",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Text
          style={[
            typography.readexproMedium,
            {
              fontSize: 11,
              color: theme.İnputB,
            },
          ]}
        >
          لرؤية المزيد
        </Text>

        <Text
          style={[
            typography.elmessiriBold,
            {
              fontSize: 16,
              color: theme.logoJ,
            },
          ]}
        >
          توقيت الصلاة
        </Text>
      </View>

      {/* Horizontal Prayer Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
        contentContainerStyle={{
          paddingHorizontal: 15,
          gap: 20,
        }}
      >
        {prayers.map((prayer, index) => (
          <View
            key={index}
            style={{
              height: 100,
              width: 150,
              backgroundColor: theme.card,
              borderRadius: 12,
            }}
          >
            <View
              style={{
                height: 35,
                backgroundColor: theme.cardAlt,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  typography.elmessiriMedium,
                  { fontSize: 14, color: theme.cTitle },
                ]}
              >
                {prayer.name}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  typography.elmessiriSemiBold,
                  { fontSize: 16, color: theme.cText },
                ]}
              >
                موعد الصلاة
              </Text>

              <Text
                style={[
                  typography.readexproMedium,
                  { fontSize: 16, color: theme.cTitle },
                ]}
              >
                {prayer.time}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Sunnah Card */}
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 15,
          paddingVertical: 20,
        }}
      >
        {" "}
        <View
          style={{
            height: 200,
            backgroundColor: theme.card,
            borderRadius: 15,
            justifyContent: "flex-end",
          }}
        >
          {" "}
          <View
            style={{ alignItems: "flex-end", marginBottom: 6, marginRight: 15 }}
          >
            {" "}
            <Text
              style={[
                typography.elmessiriSemiBold,
                { fontSize: 20, color: theme.cTitle },
              ]}
            >
              {" "}
              سنة مهجورة{" "}
            </Text>{" "}
          </View>{" "}
          <View
            style={{
              width: "100%",
              height: 155,
              backgroundColor: theme.cardAlt,
              borderRadius: 15,
              alignItems: "flex-end",
              justifyContent: "flex-start",
              paddingTop: 15,
              paddingRight: 20,
            }}
          >
            {" "}
            <Text
              style={[
                typography.elmessiriSemiBold,
                { color: theme.cText, fontSize: 16 },
              ]}
            >
              {" "}
              التَّنفس عند الشُّرب خارج الإناء ثلاثاً:{" "}
            </Text>{" "}
            <Text
              style={[
                typography.elmessiriSemiBold,
                {
                  color: theme.cParagraph,
                  fontSize: 15,
                  textAlign: "right",
                  paddingTop: 10,
                  paddingLeft: 20,
                  lineHeight: 30,
                },
              ]}
            >
              {" "}
              عن أنسٍ رضي الله عنه قال: كان رسول الله صلَّى الله عليه وسلَّم
              يتنفَّس في الشَّراب ثلاثاً ويقول:(إنَّه أروى، وأبرأ، وأمْرأ)متفق
              عليه.{" "}
            </Text>{" "}
          </View>{" "}
        </View>
      </View>

      {/* aded Card */}
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 15,
          paddingVertical: 20,
        }}
      >
        <View
          style={{
            height: "auto",
            backgroundColor: theme.card,
            borderRadius: 15,
            justifyContent: "flex-end",
          }}
        ></View>
      </View>
    </ScrollView>
  );
}
