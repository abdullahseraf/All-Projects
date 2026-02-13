import { useTheme } from "@/src/theme/ThemeContext";
import { typography } from "@/src/theme/typography";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useState } from "react";

export default function Index() {
  const { theme } = useTheme();
  const [clicks, setClicks] = useState(0);

  const prayers = [
    { name: "العشاء", time: "4 : 05" },
    { name: "المغرب", time: "4 : 05" },
    { name: "العصر", time: "4 : 05" },
    { name: "الظهر", time: "4 : 05" },
    { name: "الفجر", time: "4 : 05" },
  ];

  const Tasabih = [
    { name: "أَستغفرُ الله" },
    { name: "سُبْحَانَ اللَّهِ" },
    { name: "الْحَمْدُ لِلَّهِ" },
    { name: "لَا إلَه إلّا الله" },
    { name: "الْلَّهُ أَكْبَر" },
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

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{
        flexGrow: 1, // 🔥 مهم جداً
      }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar style="light" backgroundColor={theme.Header} />

      {/* المحتوى العلوي */}
      <View>
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
              { fontSize: 11, color: theme.İnputB },
            ]}
          >
            لرؤية المزيد
          </Text>

          <Text
            style={[
              typography.elmessiriBold,
              { fontSize: 16, color: theme.logoJ },
            ]}
          >
            توقيت الصلاة
          </Text>
        </View>

        {/* Prayer Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
            gap: 15,
          }}
        >
          {prayers.map((prayer, index) => (
            <View
              key={index}
              style={{
                height: 100,
                width: 150,
                backgroundColor: theme.cardAlt,
                borderRadius: 12,
              }}
            >
              <View
                style={{
                  height: 35,
                  backgroundColor: theme.card,
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
            paddingHorizontal: 15,
            marginTop: 15,
          }}
        >
          <View
            style={{
              height: 180,
              width: "100%",
              backgroundColor: theme.card,
              borderRadius: 15,
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                alignItems: "flex-end",
                marginBottom: 6,
                marginRight: 15,
              }}
            >
              <Text
                style={[
                  typography.elmessiriSemiBold,
                  { fontSize: 20, color: theme.cTitle },
                ]}
              >
                سنة مهجورة
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                height: 135,
                backgroundColor: theme.cardAlt,
                borderRadius: 15,
                alignItems: "flex-end",
                paddingTop: 15,
                paddingRight: 20,
              }}
            >
              <Text
                style={[
                  typography.elmessiriSemiBold,
                  { color: theme.cText, fontSize: 16 },
                ]}
              >
                التَّنفس عند الشُّرب خارج الإناء ثلاثاً:
              </Text>

              <Text
                style={[
                  typography.elmessiriSemiBold,
                  {
                    color: theme.cParagraph,
                    fontSize: 15,
                    textAlign: "right",
                    paddingTop: 8,
                    paddingLeft: 20,
                    lineHeight: 30,
                  },
                ]}
              >
                عن أنسٍ رضي الله عنه قال: كان رسول الله صلَّى الله عليه وسلَّم
                يتنفَّس في الشَّراب ثلاثاً ويقول: (إنَّه أروى، وأبرأ، وأمْرأ)
                متفق عليه.
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* 🔥 aded Card —*/}
      <View
        style={{
          flex: 1,
          padding: 15,
          flexDirection: "row",
        }}
      >
        {" "}
        <View
          style={{
            flex: 1,
            backgroundColor: theme.card,
            borderRadius: 15,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: theme.cardAlt,
              borderRadius: 15,
              width: "45%",
              paddingVertical: 15,
              paddingHorizontal: 25,
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Text
              style={[
                typography.elmessiriSemiBold,
                {
                  color: theme.cText,
                  fontSize: 12,
                  paddingBottom: 5,
                },
              ]}
            >
              بعض التسابيح
            </Text>
            {Tasabih.map((Tasabih, index) => (
              <Text
                key={index}
                style={[
                  typography.elmessiriSemiBold,
                  {
                    color: theme.cTitle,
                    fontSize: 18,
                    marginTop: "auto",
                    paddingRight: 10,
                    textAlign: "right",
                    paddingBottom: 4,
                  },
                ]}
              >
                {Tasabih.name}
              </Text>
            ))}
          </View>
          <View
            style={{
              backgroundColor: theme.card,
              width: "55%",
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={[
                typography.elmessiriBold,
                {
                  fontSize: 26,
                  color: theme.cTitle,
                },
              ]}
            >
              العدد :{" "}
              <Text
                style={[
                  typography.readexproSemiBold,
                  {
                    color: theme.cText,
                  },
                ]}
              >
                {clicks}
              </Text>
            </Text>
            <View>
              <Pressable onPress={() => setClicks(clicks + 1)}>
                <View
                  style={{
                    height: 120,
                    width: 120,
                    borderRadius: 70,
                    borderWidth: 6,
                    borderColor: theme.cardAlt,
                    marginTop: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: theme.cardAlt,
                  }}
                >
                  <View
                    style={{
                      height: 110,
                      width: 110,
                      borderRadius: 70,
                      borderWidth: 6,
                      borderColor: theme.card,
                      position: "absolute",
                    }}
                  ></View>
                  <Text
                    style={[
                      typography.elmessiriBold,
                      {
                        color: theme.cTitle,
                        fontSize: 24,
                      },
                    ]}
                  >
                    اُنقر
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
