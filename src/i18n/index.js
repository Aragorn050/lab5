import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './languages/en.json';
import pl from './languages/pl.json';

i18n.use(initReactI18next).init({
    resources: { en: { translation: en }, pl: { translation: pl } },
    lng: 'en',
    fallbackLng: 'en',
    // Single curly braces: "Hello, {playerName}!"
    interpolation: { prefix: '{', suffix: '}', escapeValue: false },
    react: { useSuspense: false },
});

export default i18n;
