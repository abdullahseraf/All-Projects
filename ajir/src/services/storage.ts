// src/services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface StoredPrayer {
  name: string;
  route: string;
  time: string;
}

export interface StoredLocation {
  latitude: number;
  longitude: number;
  city: string;
}

// حفظ أوقات الصلاة
export const savePrayerTimes = async (prayers: StoredPrayer[]): Promise<void> => {
  try {
    await AsyncStorage.setItem('prayerTimes', JSON.stringify(prayers));
    await AsyncStorage.setItem('lastUpdated', new Date().toISOString());
  } catch (error) {
    console.error('خطأ في حفظ أوقات الصلاة:', error);
  }
};

// جلب أوقات الصلاة المحفوظة
export const getPrayerTimes = async (): Promise<StoredPrayer[] | null> => {
  try {
    const data = await AsyncStorage.getItem('prayerTimes');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('خطأ في جلب أوقات الصلاة:', error);
    return null;
  }
};

// حفظ الموقع
export const saveLocation = async (latitude: number, longitude: number, city: string): Promise<void> => {
  try {
    const location: StoredLocation = { latitude, longitude, city };
    await AsyncStorage.setItem('userLocation', JSON.stringify(location));
  } catch (error) {
    console.error('خطأ في حفظ الموقع:', error);
  }
};

// جلب الموقع المحفوظ
export const getLocation = async (): Promise<StoredLocation | null> => {
  try {
    const data = await AsyncStorage.getItem('userLocation');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('خطأ في جلب الموقع:', error);
    return null;
 }
};

// جلب تاريخ آخر تحديث
export const getLastUpdated = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('lastUpdated');
  } catch (error) {
    return null;
  }
};