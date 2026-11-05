import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import i18n from '../i18n';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
    const [language, setLang] = useState(i18n.language || 'en');

    const setLanguage = useCallback((lng) => {
        i18n.changeLanguage(lng);
        setLang(lng);
    }, []);

    const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);
    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
    return ctx;
};
