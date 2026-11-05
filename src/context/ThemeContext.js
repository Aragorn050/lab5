import React, { createContext, useContext, useMemo, useState } from 'react';

export const themes = {
    light: { bg: '#E8EDEE', card: '#F7F9F9', text: '#1C2A2E', muted: '#5B6C70', accent: '#2E6B5A', onAccent: '#F7F9F9', border: '#B9C6C9', danger: '#A33A3A' },
    dark: { bg: '#12161D', card: '#1C222C', text: '#E7E3D8', muted: '#9AA0A8', accent: '#C9A24B', onAccent: '#12161D', border: '#343C49', danger: '#D96B6B' },
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [mode, setMode] = useState('light');
    const value = useMemo(() => ({ mode, setMode, theme: themes[mode] }), [mode]);
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
    return ctx;
};
