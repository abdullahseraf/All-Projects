import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import { useTheme } from "@/src/theme/ThemeContext";
import { typography } from "@/src/theme/typography";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { savePrayerTimes, saveLocation } from "@/src/services/storage";

// تعريف نوع الصلاة
interface Prayer {
  name: string;
  route: string;
  time: string;
}

export default function LocationScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  // دالة تعديل الوقت مع تحديد الأنواع
  const adjustTime = (timeString: string, minutesToAdd: number): string => {
    if (!timeString) return "00:00";

    let [hours, minutes] = timeString.split(":").map(Number);
    minutes += minutesToAdd;

    if (minutes >= 60) {
      hours += Math.floor(minutes / 60);
      minutes = minutes % 60;
    } else if (minutes < 0) {
      hours += Math.floor(minutes / 60);
      minutes = 60 + (minutes % 60);
    }

    if (hours >= 24) {
      hours = hours % 24;
    } else if (hours < 0) {
      hours = 24 + hours;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };

  const handleLocation = async (): Promise<void> => {
    try {
      setLoading(true);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        alert("يرجى السماح بالوصول للموقع");
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // جلب اسم المدينة
      let city: string = "";
      try {
        const geocode = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        if (geocode.length > 0) {
          city =
            geocode[0].city || geocode[0].region || geocode[0].country || "";
        }
      } catch (error) {
        console.log("Geocode error:", error);
      }

      // حفظ الموقع
      await saveLocation(latitude, longitude, city);

      // جلب أوقات الصلاة
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();

      const api = `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${latitude}&longitude=${longitude}&method=4`;

      const response = await fetch(api);
      const data = await response.json();

      if (data.code === 200) {
        const timings = data.data.timings;

        // التعديلات الدقيقة
        const adjustments: Record<string, number> = {
          Fajr: 0,
          Dhuhr: 6,
          Asr: 4,
          Maghrib: 7,
          Isha: -3,
        };

        // تجهيز الصلوات مع التعديلات
        const prayers: Prayer[] = [
          {
            name: "الفجر",
            route: "fajir",
            time: adjustTime(timings.Fajr, adjustments.Fajr),
          },
          {
            name: "الظهر",
            route: "duhr",
            time: adjustTime(timings.Dhuhr, adjustments.Dhuhr),
          },
          {
            name: "العصر",
            route: "asr",
            time: adjustTime(timings.Asr, adjustments.Asr),
          },
          {
            name: "المغرب",
            route: "mugrb",
            time: adjustTime(timings.Maghrib, adjustments.Maghrib),
          },
          {
            name: "العشاء",
            route: "isa",
            time: adjustTime(timings.Isha, adjustments.Isha),
          },
        ];

        // حفظ الأوقات
        await savePrayerTimes(prayers);

        router.push("/Onboarding/success");
      }
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
          backgroundColor: theme.background,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 40,
        }}
      >
        <StatusBar style="light" backgroundColor={theme.background} />

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
      <View>
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
    </View>
  );
}
