import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {I18nManager} from 'react-native';

import en from '../translations/en';
import ar from '../translations/ar';

i18next.use(initReactI18next).init({
  lng: I18nManager.isRTL ? 'ar' : 'en',
  fallbackLng: 'en',
  resources: {
    en: {translation: en},
    ar: {translation: ar},
  },
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
