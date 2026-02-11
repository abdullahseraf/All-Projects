import { useTheme } from "@/src/theme/ThemeContext";
import { typography } from "@/src/theme/typography";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";

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
        justifyContent: "flex-start",
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
      <View
        style={{
          height: 50,
          width: "90%",
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
      <ScrollView
        style={{
          width: "100%",
          height: 100,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
        contentContainerStyle={{
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: "90%",
            height: 100,
            marginTop: 0,
            flexDirection: "row",
            gap: 15,
            marginRight: 15,
            marginLeft: 15,
          }}
        >
          <View
            style={{
              height: 100,
              width: 150,
              backgroundColor: theme.card,
              borderRadius: 12,
            }}
          >
            <View
              style={{
                width: 150,
                height: 35,
                backgroundColor: theme.cardAlt,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  typography.elmessiriMedium,
                  {
                    fontSize: 14,
                    color: theme.cTitle,
                  },
                ]}
              >
                العشاء
              </Text>
            </View>
            <View
              style={{
                gap: 2,
                marginTop: "5%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  typography.elmessiriSemiBold,
                  {
                    fontSize: 16,
                    color: theme.cText,
                  },
                ]}
              >
                موعد الصلاة
              </Text>
              <Text
                style={[
                  typography.readexproMedium,
                  {
                    fontSize: 16,
                    color: theme.cTitle,
                  },
                ]}
              >
                4 : 05{" "}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 100,
              width: 150,
              backgroundColor: theme.card,
              borderRadius: 12,
            }}
          >
            <View
              style={{
                width: 150,
                height: 35,
                backgroundColor: theme.cardAlt,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  typography.elmessiriMedium,
                  {
                    fontSize: 14,
                    color: theme.cTitle,
                  },
                ]}
              >
                المغرب
              </Text>
            </View>
            <View
              style={{
                gap: 2,
                marginTop: "5%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  typography.elmessiriSemiBold,
                  {
                    fontSize: 16,
                    color: theme.cText,
                  },
                ]}
              >
                موعد الصلاة
              </Text>
              <Text
                style={[
                  typography.readexproMedium,
                  {
                    fontSize: 16,
                    color: theme.cTitle,
                  },
                ]}
              >
                4 : 05{" "}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 100,
              width: 150,
              backgroundColor: theme.card,
              borderRadius: 12,
            }}
          >
            <View
              style={{
                width: 150,
                height: 35,
                backgroundColor: theme.cardAlt,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  typography.elmessiriMedium,
                  {
                    fontSize: 14,
                    color: theme.cTitle,
                  },
                ]}
              >
                العصر
              </Text>
            </View>
            <View
              style={{
                gap: 2,
                marginTop: "5%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  typography.elmessiriSemiBold,
                  {
                    fontSize: 16,
                    color: theme.cText,
                  },
                ]}
              >
                موعد الصلاة
              </Text>
              <Text
                style={[
                  typography.readexproMedium,
                  {
                    fontSize: 16,
                    color: theme.cTitle,
                  },
                ]}
              >
                4 : 05{" "}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 100,
              width: 150,
              backgroundColor: theme.card,
              borderRadius: 12,
            }}
          >
            <View
              style={{
                width: 150,
                height: 35,
                backgroundColor: theme.cardAlt,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  typography.elmessiriMedium,
                  {
                    fontSize: 14,
                    color: theme.cTitle,
                  },
                ]}
              >
                الظهر
              </Text>
            </View>
            <View
              style={{
                gap: 2,
                marginTop: "5%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  typography.elmessiriSemiBold,
                  {
                    fontSize: 16,
                    color: theme.cText,
                  },
                ]}
              >
                موعد الصلاة
              </Text>
              <Text
                style={[
                  typography.readexproMedium,
                  {
                    fontSize: 16,
                    color: theme.cTitle,
                  },
                ]}
              >
                4 : 05{" "}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 100,
              width: 150,
              backgroundColor: theme.card,
              borderRadius: 12,
            }}
          >
            <View
              style={{
                width: 150,
                height: 35,
                backgroundColor: theme.cardAlt,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  typography.elmessiriMedium,
                  {
                    fontSize: 14,
                    color: theme.cTitle,
                  },
                ]}
              >
                الفجر
              </Text>
            </View>
            <View
              style={{
                gap: 2,
                marginTop: "5%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  typography.elmessiriSemiBold,
                  {
                    fontSize: 16,
                    color: theme.cText,
                  },
                ]}
              >
                موعد الصلاة
              </Text>
              <Text
                style={[
                  typography.readexproMedium,
                  {
                    fontSize: 16,
                    color: theme.cTitle,
                  },
                ]}
              >
                4 : 05{" "}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
