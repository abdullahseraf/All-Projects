import { typography } from "@/src/theme/typography";
import { useTheme } from "@/src/theme/ThemeContext";
import { useFonts } from "expo-font";
import { Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

export default function Prayer() {
  const { theme } = useTheme();

  const prayer = [
    { name: "الفجر", time: "4 : 05" },
    { name: "الظهر", time: "4 : 05" },
    { name: "العصر", time: "4 : 05" },
    { name: "المغرب", time: "4 : 05" },
    { name: "العشاء", time: "4 : 05" },
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
      contentContainerStyle={{
        paddingBottom: 15,
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
    >
      <StatusBar barStyle="light-content" backgroundColor={theme.Header} />

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
            style={{
              backgroundColor: theme.card,
              borderRadius: 15,
              flex: 1,
              paddingRight: 25,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                borderRadius: 15,
                margin: 5,
                flex: 1,
                backgroundColor: theme.cardAlt,
              }}
            >
              <Image
                source={require("@/src/assets/images/Group 8-1.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 15,
                }}
                resizeMode="cover"
              ></Image>
            </View>
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
