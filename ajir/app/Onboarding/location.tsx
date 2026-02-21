import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Platform,
} from "react-native";
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
// handler مرة وحدة
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

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

      // 1️⃣ إذن الموقع
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("يرجى السماح بالوصول للموقع");
        return;
      }

      // 2️⃣ إذن الإشعارات
      const { status: notifStatus } =
        await Notifications.requestPermissionsAsync();
      if (notifStatus !== "granted") {
        alert("يرجى السماح بالإشعارات");
        return;
      }
      // 3️⃣ إنشاء قناة أندرويد (مرة واحدة)
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("prayer-channel", {
          name: "Prayer Notifications",
          importance: Notifications.AndroidImportance.MAX,
          sound: "default",
          vibrationPattern: [0, 250, 250, 250],
          lockscreenVisibility:
            Notifications.AndroidNotificationVisibility.PUBLIC,
          enableVibrate: true,
          enableLights: true,
          lightColor: theme.background,
        });
      }

      // 4️⃣ جلب الموقع
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      await saveLocation(latitude, longitude, "");

      // 5️⃣ حساب أوقات الصلاة
      const coordinates = new Coordinates(latitude, longitude);
      const params = CalculationMethod.UmmAlQura();
      params.madhab = Madhab.Shafi;

      const date = new Date();
      const prayerTimes = new PrayerTimes(coordinates, date, params);

      const adjustments: Record<string, number> = {
        Fajr:0,
        Dhuhr: 5,
        Asr: 4,
        Maghrib: 7,
        Isha: -3,
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

      // 🔥 حذف الإشعارات القديمة بالكامل (حل مشكلة التكرار)
      const existing = await Notifications.getAllScheduledNotificationsAsync();

      for (const notification of existing) {
        await Notifications.cancelScheduledNotificationAsync(
          notification.identifier,
        );
      }

      // 🔔 جدولة إشعارات يومية
      for (const prayer of prayers) {
        const [hour, minute] = prayer.time.split(":").map(Number);
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `🕌 حان الآن وقت صلاة ${prayer.name}`,
            body: "تقبل الله طاعتكم 🤍",
            sound: "default",
            priority: Notifications.AndroidNotificationPriority.MAX,
            color: theme.background,
            vibrate: [0, 300, 200, 300],
            badge: 1,
            data: {
              screen: prayer.route,
              prayerName: prayer.name,
            },
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DAILY,
            hour,
            minute,
            // هنا تمرر القناة لأندرويد
            channelId: "prayer-channel",
          },
        });
      }

      // تأكد أنه في 5 فقط
      const all = await Notifications.getAllScheduledNotificationsAsync();

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
            marginBottom: 10,
          }}
        >
          سنستخدم موقعك لحساب أوقات الصلاة بدقة
        </Text>

        <Text
          style={{
            color: theme.İnputB,
            fontSize: 17,
            textAlign: "center",
            marginBottom: 50,
          }}
        >
          سنستخدم الإشعارات لتذكيرك بأوقات الصلاة
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
