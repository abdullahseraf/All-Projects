import { useTheme } from "@/src/theme/ThemeContext";
import { typography } from "@/src/theme/typography";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getPrayerTimes, StoredPrayer } from "@/src/services/storage"; // استيراد النوع

export default function Index() {
  const router = useRouter();
  const { theme } = useTheme();

  // ✅ تعريف نوع البيانات بشكل صحيح
  const [prayers, setPrayers] = useState<StoredPrayer[]>([]); // تغيير هنا
  const [loading, setLoading] = useState(true);

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

  // جلب البيانات المحفوظة
  const loadSavedData = async () => {
    try {
      const savedPrayers = await getPrayerTimes();

      if (savedPrayers && savedPrayers.length > 0) {
        setPrayers(savedPrayers); // ✅ الآن لا يوجد خطأ
      } else {
        console.log("لا توجد أوقات محفوظة");
      }
    } catch (error) {
      console.error("خطأ في تحميل البيانات:", error);
    } finally {
      setLoading(false);
    }
  };

  // تحميل البيانات عند فتح الشاشة
  useFocusEffect(
    useCallback(() => {
      loadSavedData();
    }, []),
  );

  // صور الصلوات
  const prayerImages = {
    fajir: require("@/src/assets/images/fajir.png"),
    duhr: require("@/src/assets/images/duhr.png"),
    asr: require("@/src/assets/images/asr.png"),
    mugrb: require("@/src/assets/images/mgrb.png"),
    isa: require("@/src/assets/images/isa.png"),
  };

  // بيانات افتراضية (بنفس نوع StoredPrayer)
  const defaultPrayers: StoredPrayer[] = [
    {
      name: "الفجر",
      route: "fajir",
      time: "4:05",
    },
    {
      name: "الظهر",
      time: "4:05",
      route: "duhr",
    },
    {
      name: "العصر",
      time: "4:05",
      route: "asr",
    },
    {
      name: "المغرب",
      time: "4:05",
      route: "mugrb",
    },
    {
      name: "العشاء",
      time: "4:05",
      route: "isa",
    },
  ];

  // استخدام البيانات المحفوظة أو الافتراضية
  const displayPrayers = prayers.length > 0 ? prayers : defaultPrayers;

  if (!fontsLoaded || loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.logoA} />
      </View>
    );
  }

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
      <StatusBar style="light" backgroundColor={"#00000000"} />

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

      {/* cards */}
      {displayPrayers.map((prayer, index) => (
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
              source={
                prayerImages[prayer.route as keyof typeof prayerImages] ||
                prayerImages.fajir
              }
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
            />
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
