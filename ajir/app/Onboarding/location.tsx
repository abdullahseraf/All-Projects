import { View, Text, Pressable, ActivityIndicator, Platform } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { useTheme } from "@/src/theme/ThemeContext";
import { typography } from "@/src/theme/typography";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { savePrayerTimes, saveLocation } from "@/src/services/storage";
import { PrayerTimes, Coordinates, CalculationMethod, Madhab } from "adhan";

interface Prayer {
  name: string;
  route: string;
  time: string;
}

export default function LocationScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const adjustTime = (date: Date, minutesToAdd: number): string => {
    const adjustedDate = new Date(date.getTime() + minutesToAdd * 60000);
    return adjustedDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleLocation = async (): Promise<void> => {
    try {
      setLoading(true);

      // 1️⃣ طلب إذن الموقع
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        alert("يرجى السماح بالوصول للموقع");
        setLoading(false);
        return;
      }

      // 2️⃣ طلب إذن الإشعارات
      const { status: notifStatus } =
        await Notifications.requestPermissionsAsync();

      if (notifStatus !== "granted") {
        alert("يرجى السماح بالإشعارات ليصلك تنبيه وقت الصلاة");
      }

      // 3️⃣ إعداد قناة أندرويد
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("prayer-channel", {
          name: "Prayer Notifications",
          importance: Notifications.AndroidImportance.MAX,
          sound: "default",
        });
      }

      // 4️⃣ جلب الموقع
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      let city: string = "";

      try {
        const geocode = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (geocode.length > 0) {
          city =
            geocode[0].city ||
            geocode[0].region ||
            geocode[0].country ||
            "";
        }
      } catch (error) {
        console.log("Geocode error:", error);
      }

      await saveLocation(latitude, longitude, city);

      // حساب أوقات الصلاة
      const coordinates = new Coordinates(latitude, longitude);
      const params = CalculationMethod.UmmAlQura();
      params.madhab = Madhab.Shafi;

      const date = new Date();
      const prayerTimes = new PrayerTimes(coordinates, date, params);

      const adjustments: Record<string, number> = {
        Fajr: 1,
        Dhuhr: 6,
        Asr: 5,
        Maghrib: 8,
        Isha: -2,
      };

      const prayers: Prayer[] = [
        {
          name: "الفجر",
          route: "fajir",
          time: adjustTime(prayerTimes.fajr, adjustments.Fajr),
        },
        {
          name: "الظهر",
          route: "duhr",
          time: adjustTime(prayerTimes.dhuhr, adjustments.Dhuhr),
        },
        {
          name: "العصر",
          route: "asr",
          time: adjustTime(prayerTimes.asr, adjustments.Asr),
        },
        {
          name: "المغرب",
          route: "mugrb",
          time: adjustTime(prayerTimes.maghrib, adjustments.Maghrib),
        },
        {
          name: "العشاء",
          route: "isa",
          time: adjustTime(prayerTimes.isha, adjustments.Isha),
        },
      ];

      await savePrayerTimes(prayers);

      router.push("/Onboarding/success");
    } catch (error) {
      console.log(error);
      alert("حدث خطأ أثناء تحديد الموقع");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        backgroundColor: theme.background,
        flexDirection: "column",
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 40,
        }}
      >
        <StatusBar style="light" backgroundColor={"#00000000"} />

        <Ionicons
          style={{ marginBottom: 20 }}
          size={100}
          color={theme.logoA}
          name="location-sharp"
        />

        <Text
          style={[
            typography.readexproSemiBold,
            {
              color: theme.logoJ,
              fontSize: 26,
              textAlign: "right",
              marginBottom: 15,
            },
          ]}
        >
          تحديد الموقع تلقائياً
        </Text>

        <Text
          style={{
            color: theme.İnputB,
            fontSize: 17,
            textAlign: "center",
            marginBottom: 50,
          }}
        >
          سنستخدم موقعك لحساب أوقات الصلاة بدقة
        </Text>
      </View>

      <Pressable
        onPress={handleLocation}
        style={{
          backgroundColor: theme.İntrotB,
          paddingVertical: 16,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator color={theme.cTitle} />
        ) : (
          <Text
            style={[
              typography.readexproMedium,
              { color: theme.cTitle, fontSize: 16 },
            ]}
          >
            تحديد موقعي الآن
          </Text>
        )}
      </Pressable>
    </View>
  );
}
