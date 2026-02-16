import AsyncStorage from '@react-native-async-storage/async-storage';

// تعريف أنواع البيانات
interface Location {
  latitude: number;
  longitude: number;
}

interface Prayer {
  name: string;
  route: string;
  time: string;
}

// مفاتيح التخزين
const KEYS = {
  PRAYER_TIMES: 'prayer_times',
  LOCATION: 'user_location',
  LAST_FETCH: 'last_fetch_time',
  CITY: 'city_name',
};

// حفظ أوقات الصلاة
export const savePrayerTimes = async (prayers: Prayer[]): Promise<void> => {
  try {
    const prayersForStorage = prayers.map(p => ({
      name: p.name,
      route: p.route,
      time: p.time,
    }));
    
    await AsyncStorage.setItem(KEYS.PRAYER_TIMES, JSON.stringify(prayersForStorage));
    await AsyncStorage.setItem(KEYS.LAST_FETCH, Date.now().toString());
    console.log('✅ تم حفظ أوقات الصلاة');
  } catch (error) {
    console.log('❌ خطأ في حفظ أوقات الصلاة:', error);
  }
};

// حفظ الموقع
export const saveLocation = async (latitude: number, longitude: number, city: string = ''): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.LOCATION, JSON.stringify({ latitude, longitude }));
    if (city) {
      await AsyncStorage.setItem(KEYS.CITY, city);
    }
    console.log('✅ تم حفظ الموقع');
  } catch (error) {
    console.log('❌ خطأ في حفظ الموقع:', error);
  }
};

// جلب أوقات الصلاة
export const getPrayerTimes = async (): Promise<Prayer[] | null> => {
  try {
    const data = await AsyncStorage.getItem(KEYS.PRAYER_TIMES);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log('❌ خطأ في جلب أوقات الصلاة:', error);
    return null;
  }
};

// جلب الموقع
export const getLocation = async (): Promise<Location | null> => {
  try {
    const data = await AsyncStorage.getItem(KEYS.LOCATION);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log('❌ خطأ في جلب الموقع:', error);
    return null;
  }
};

// جلب اسم المدينة
export const getCity = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(KEYS.CITY);
  } catch (error) {
    return null;
  }
};

// التحقق من وجود بيانات
export const hasStoredData = async (): Promise<boolean> => {
  try {
    const prayers = await getPrayerTimes();
    const location = await getLocation();
    return !!(prayers && location);
  } catch (error) {
    return false;
  }
};

// التحقق إذا كانت الأوقات حديثة (أقل من 24 ساعة)
export const isDataFresh = async (): Promise<boolean> => {
  try {
    const lastFetch = await AsyncStorage.getItem(KEYS.LAST_FETCH);
    if (!lastFetch) return false;
    
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    return (now - parseInt(lastFetch)) < twentyFourHours;
  } catch (error) {
    return false;
  }
};