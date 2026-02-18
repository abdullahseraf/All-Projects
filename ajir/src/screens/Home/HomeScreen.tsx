import { useTheme } from "@/src/theme/ThemeContext";
import { typography } from "@/src/theme/typography";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  AppState,
  AppStateStatus,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getPrayerTimes,
  getLocation,
  StoredPrayer,
  StoredLocation,
} from "@/src/services/storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// تعريف نوع البيانات المخزنة
interface CounterData {
  count: number;
  date: string;
}

export default function Index() {
  const { theme } = useTheme();
  const [clicks, setClicks] = useState<number>(0);
  const [nextPrayer, setNextPrayer] = useState({
    name: "",
    timeRemaining: "",
    time: "",
  });
  const [prayers, setPrayers] = useState<StoredPrayer[]>([]);
  const [location, setLocation] = useState<StoredLocation | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const appState = useRef(AppState.currentState);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // دالة تحويل الوقت النصي (مثل "04:05") إلى كائن Date
  const convertTimeStringToDate = (timeString: string): Date => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  // دالة حساب الوقت المتبقي للصلاة القادمة بناءً على البيانات المحفوظة
  const calculateNextPrayerFromSaved = () => {
    try {
      if (!prayers || prayers.length === 0) return;

      const now = new Date();
      setCurrentTime(now);

      // تحويل أوقات الصلاة إلى كائنات Date
      const prayersWithDates = prayers.map((prayer) => ({
        name: prayer.name,
        route: prayer.route,
        time: convertTimeStringToDate(prayer.time),
      }));

      // ترتيب الصلوات حسب الوقت
      prayersWithDates.sort((a, b) => a.time.getTime() - b.time.getTime());

      // البحث عن الصلاة القادمة
      let next = null;
      for (let i = 0; i < prayersWithDates.length; i++) {
        if (prayersWithDates[i].time > now) {
          next = prayersWithDates[i];
          break;
        }
      }

      // إذا لم نجد صلاة قادمة (بعد آخر صلاة)، نأخذ أول صلاة لليوم التالي
      if (!next && prayersWithDates.length > 0) {
        // نأخذ أول صلاة (الفجر) ونضيف عليها يوم كامل
        const firstPrayer = prayersWithDates[0];
        const tomorrow = new Date(firstPrayer.time);
        tomorrow.setDate(tomorrow.getDate() + 1);
        next = {
          name: firstPrayer.name,
          route: firstPrayer.route,
          time: tomorrow,
        };
      }

      if (next) {
        // حساب الوقت المتبقي
        const diffMs = next.time.getTime() - now.getTime();

        if (diffMs <= 0) {
          setNextPrayer({
            name: next.name,
            timeRemaining: "الآن",
            time: formatTime(next.time),
          });
          return;
        }

        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);

        let timeString = "";
        if (diffHrs > 0) {
          timeString = `${diffHrs} ساعة ${diffMins} دقيقة`;
        } else if (diffMins > 0) {
          timeString = `${diffMins} دقيقة `;
        } else {
          timeString = `الآن`;
        }

        setNextPrayer({
          name: next.name,
          timeRemaining: timeString,
          time: formatTime(next.time),
        });
      }
    } catch (error) {
      console.error("خطأ في حساب الصلاة القادمة:", error);
    }
  };

  // دالة تنسيق الوقت
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // تحميل البيانات المحفوظة
  const loadSavedData = async () => {
    try {
      const savedPrayers = await getPrayerTimes();
      const savedLocation = await getLocation();

      if (savedPrayers && savedPrayers.length > 0) {
        setPrayers(savedPrayers);
      } else {
        console.log("لا توجد أوقات محفوظة");
        // إذا لم توجد أوقات محفوظة، توجه إلى شاشة الموقع
        router.replace("/Onboarding/location");
      }

      if (savedLocation) {
        setLocation(savedLocation);
      }
    } catch (error) {
      console.error("خطأ في تحميل البيانات:", error);
    }
  };

  // دالة لحفظ العدد
  const saveClicks = async (value: number): Promise<void> => {
    try {
      const data: CounterData = {
        count: value,
        date: new Date().toDateString(),
      };
      await AsyncStorage.setItem("tasbih_counter", JSON.stringify(data));
    } catch (error) {
      console.error("خطأ في حفظ العدد:", error);
    }
  };

  // دالة لتحميل العدد
  const loadClicks = async (): Promise<void> => {
    try {
      const savedData = await AsyncStorage.getItem("tasbih_counter");
      if (savedData) {
        const data: CounterData = JSON.parse(savedData);
        const today = new Date().toDateString();

        if (data.date !== today) {
          setClicks(0);
          await saveClicks(0);
        } else {
          setClicks(data.count);
        }
      } else {
        setClicks(0);
      }
    } catch (error) {
      console.error("خطأ في تحميل العدد:", error);
      setClicks(0);
    }
  };

  // تحميل البيانات عند بدء التطبيق
  useEffect(() => {
    loadClicks();
    loadSavedData();
  }, []);

  // حساب الصلاة القادمة كل ثانية بناءً على البيانات المحفوظة
  useEffect(() => {
    if (prayers.length > 0) {
      calculateNextPrayerFromSaved();

      intervalRef.current = setInterval(() => {
        calculateNextPrayerFromSaved();
      }, 1000) as unknown as NodeJS.Timeout; // كل ثانية

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [prayers]);

  // مراقبة حالة التطبيق (عند العودة من الخلفية)
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextAppState: AppStateStatus) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          // التطبيق عاد للواجهة - تحديث فوري
          if (prayers.length > 0) {
            calculateNextPrayerFromSaved();
          }
        }
        appState.current = nextAppState;
      },
    );

    return () => {
      subscription.remove();
    };
  }, [prayers]);

  // دالة زيادة العدد
  const incrementClicks = async (): Promise<void> => {
    const newCount: number = clicks + 1;
    setClicks(newCount);
    await saveClicks(newCount);
  };

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
        }}
      >
        <Text style={{ color: theme.cTitle }}>جاري تحميل الخطوط...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 15,
      }}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
    >
      <StatusBar style="light" backgroundColor={"#00000000"} />

      {/* المحتوى العلوي */}
      <View>
        {/* Header*/}
        <View
          style={{
            width: "100%",
            height: 100,
            alignItems: "flex-end",
            justifyContent: "flex-end",
            borderBottomRightRadius: 50,
            backgroundColor: theme.Header,
            paddingTop: insets.top,
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
          <Pressable onPress={() => router.navigate("/tabs/prayers")}>
            <Text
              style={[
                typography.readexproMedium,
                { fontSize: 11, color: theme.İnputB },
              ]}
            >
              لرؤية المزيد
            </Text>
          </Pressable>
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
        <View
          style={{
            marginHorizontal: 15,
          }}
        >
          <View
            style={{
              backgroundColor: theme.card,
              borderRadius: 15,
            }}
          >
            <View
              style={{
                alignItems: "flex-end",
              }}
            >
              <Text
                style={[
                  typography.elmessiriSemiBold,
                  {
                    marginBottom: 2,
                    marginRight: 15,
                    marginTop: 6,
                    color: theme.cTitle,
                    textAlign: "right",
                  },
                ]}
              >
                الصلاة القادمة
              </Text>
            </View>
            <View
              style={{
                backgroundColor: theme.cardAlt,
                borderRadius: 15,
                alignItems: "flex-end",
                paddingRight: 20,
                paddingVertical: 8,
              }}
            >
              <Text
                style={[
                  typography.elmessiriBold,
                  { fontSize: 22, color: theme.cText, marginTop: 0 },
                ]}
              >
                {nextPrayer.name || "العشاء"}
              </Text>

              <Text
                style={[
                  typography.readexproMedium,
                  {
                    color: theme.cParagraph,
                    fontSize: 16,
                    textAlign: "right",
                    lineHeight: 30,
                  },
                ]}
              >
                {nextPrayer.timeRemaining
                  ? `متبقي : ${nextPrayer.timeRemaining} `
                  : "جاري الحساب..."}
              </Text>

              {/* وقت الصلاة بالضبط */}
              {nextPrayer.time && (
                <Text
                  style={[
                    typography.readexproRegular,
                    {
                      color: theme.cText,
                      fontSize: 14,
                      textAlign: "right",
                      marginTop: 4,
                    },
                  ]}
                >
                  موعد الأذان: {nextPrayer.time}
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* Sunnah Card */}
        <View
          style={{
            width: "100%",
            height: "auto",
            alignItems: "center",
            paddingHorizontal: 15,
            marginTop: 15,
          }}
        >
          <View
            style={{
              height: "auto",
              width: "100%",
              backgroundColor: theme.card,
              borderRadius: 15,
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                height: "auto",
                alignItems: "flex-end",
                marginBottom: 2,
                marginRight: 15,
                marginTop: 2,
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
                height: "auto",
                backgroundColor: theme.cardAlt,
                borderRadius: 15,
                alignItems: "flex-end",
                paddingTop: 10,
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
                    paddingTop: 4,
                    paddingLeft: 20,
                    lineHeight: 30,
                    paddingBottom: 4,
                  },
                ]}
              >
                عن أنسٍ رضي الله عنه قال: كان رسول الله صلَّى الله عليه وسلَّم
                يتنفَّس في الشَّراب ثلاثاً ويقول: إنَّه أروى، وأبرأ، وأمْرأ متفق
                عليه.
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tasbih Card */}
      <View
        style={{
          marginTop: 15,
          marginHorizontal: 15,
          flexDirection: "row",
          flex: 1,
        }}
      >
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
              paddingVertical: 10,
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
            {Tasabih.map((item, index) => (
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
                {item.name}
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
              العدد :
              <Text
                style={[
                  typography.readexproSemiBold,
                  {
                    color: theme.cText,
                  },
                ]}
              >
                {" " + clicks}
              </Text>
            </Text>
            <View>
              <Pressable onPress={incrementClicks}>
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
