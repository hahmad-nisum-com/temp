import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import commonEN from './locales/en.json';
import commonES from './locales/es.json';
import authEN from './modules/auth/locales/en.json';
import authES from './modules/auth/locales/es.json';
import pricingEN from './modules/pricing/locales/en.json';
import pricingES from './modules/pricing/locales/es.json';

import UserManagementEN from './modules/userManagement/locales/en.json';
import UserManagementES from './modules/userManagement/locales/es.json';

import ProfileEn from './modules/profile/locales/en.json';
import ProfileEs from './modules/profile/locales/es.json';

// Merge all translations
const resources = {
  en: {
    translation: {
      ...commonEN,
      ...authEN,
      ...pricingEN,
      ...UserManagementEN,
      ...ProfileEn,
    },
  },
  es: {
    translation: {
      ...commonES,
      ...authES,
      ...pricingES,
      ...UserManagementES,
      ...ProfileEs,
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
