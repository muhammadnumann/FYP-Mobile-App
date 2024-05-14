import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './en.json';
import ar from './ar.json';

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  debug: true,
  resources: {
    en: {
      translation: en,
    },
    ar: {
      translation: ar,
    },
  },
});

AsyncStorage.getItem('language').then((value) => {
  if (value) {
    i18next.changeLanguage(value);
  }
});

export default i18next;
