import { useTheme } from "@/src/theme/ThemeContext";
import { typography } from "@/src/theme/typography";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, Text, View, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const router = useRouter();
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

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  const prayer = [
    {
      name: "الفجر",
      route: "fajir",
      time: "4 : 05",
      image: require("@/src/assets/images/fajir.png"),
    },
    {
      name: "الظهر",
      time: "4 : 05",
      route: "duhr",
      image: require("@/src/assets/images/duhr.png"),
    },
    {
      name: "العصر",
      time: "4 : 05",
      route: "asr",
      image: require("@/src/assets/images/asr.png"),
    },
    {
      name: "المغرب",
      time: "4 : 05",
      route: "mugrb",
      image: require("@/src/assets/images/mgrb.png"),
    },
    {
      name: "العشاء",
      time: "4 : 05",
      route: "isa",
      image: require("@/src/assets/images/isa.png"),
    },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{
        paddingBottom: 15,
        flexGrow: 1,
      }}
      removeClippedSubviews={false}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
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
          الصلوات
        </Text>
      </View>
      {/* card */}
      {prayer.map((prayer, index) => (
        <View
          key={index}
          style={{
            paddingRight: 15,
            paddingLeft: 15,
            paddingTop: 15,
            flex: 1,
          }}
        >
          <Pressable
            onPress={() => router.navigate(`../tabs/prayers/${prayer.route}`)}
            style={{
              backgroundColor: theme.card,
              borderRadius: 15,
              flex: 1,
              paddingRight: 25,
              flexDirection: "row",
            }}
          >
            <Image
              source={prayer.image}
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
                width: "auto",
                resizeMode: "cover",
                borderRadius: 8,
                margin: 6,
                flex: 1,
                opacity: 0.7,
              }}
            ></Image>
            <View
              style={{
                alignItems: "flex-end",
                justifyContent: "center",
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Text
                style={[
                  typography.elmessiriBold,
                  {
                    fontSize: 32,
                    color: theme.cTitle,
                  },
                ]}
              >
                {prayer.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  style={{
                    paddingTop: 5,
                  }}
                  name="time-outline"
                  size={18}
                  color={theme.cText}
                />
                <Text
                  style={[
                    typography.readexproMedium,
                    {
                      fontSize: 18,
                      color: theme.cText,
                      textAlign: "right",
                      paddingRight: 20,
                      paddingTop: 5,
                      paddingLeft: 10,
                    },
                  ]}
                >
                  {prayer.time}
                </Text>
              </View>
            </View>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}
