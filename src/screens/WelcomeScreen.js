import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useCharacter, CLASS_HP } from '../context/CharacterContext';
import { useGameTranslation } from '../hooks/useGameTranslation';

function Segment({ options, value, onChange, theme }) {
    return (
        <View style={[styles.segment, { borderColor: theme.border }]}>
            {options.map((o) => {
                const active = o.value === value;
                return (
                    <Pressable key={o.value} onPress={() => onChange(o.value)} style={[styles.segBtn, active && { backgroundColor: theme.accent }]}>
                        <Text style={{ color: active ? theme.onAccent : theme.text, fontWeight: '600' }}>{o.label}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

export default function WelcomeScreen({ onStart }) {
    const { theme, mode, setMode } = useTheme();
    const { language, setLanguage } = useLanguage();
    const { dispatch } = useCharacter();
    const { t } = useGameTranslation();
    const [name, setName] = useState('');
    const [cls, setCls] = useState('warrior');

    const start = () => {
        dispatch({ type: 'CREATE', name, characterClass: cls });
        onStart();
    };

    return (
        <ScrollView style={{ backgroundColor: theme.bg }} contentContainerStyle={styles.container}>
            <Text style={[styles.title, { color: theme.accent }]}>{t('welcome.title')}</Text>
            <Text style={[styles.subtitle, { color: theme.muted }]}>{t('welcome.subtitle')}</Text>

            {/* Language and theme are independent selections */}
            <Text style={[styles.label, { color: theme.text }]}>{t('welcome.language')}</Text>
            <Segment theme={theme} value={language} onChange={setLanguage} options={[{ value: 'en', label: 'English' }, { value: 'pl', label: 'Polski' }]} />

            <Text style={[styles.label, { color: theme.text }]}>{t('welcome.theme')}</Text>
            <Segment theme={theme} value={mode} onChange={setMode} options={[{ value: 'light', label: t('welcome.light') }, { value: 'dark', label: t('welcome.dark') }]} />

            <Text style={[styles.label, { color: theme.text }]}>{t('welcome.name')}</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder={t('welcome.namePlaceholder')}
                placeholderTextColor={theme.muted}
                style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.card }]}
            />

            <Text style={[styles.label, { color: theme.text }]}>{t('welcome.class')}</Text>
            <Segment theme={theme} value={cls} onChange={setCls} options={Object.keys(CLASS_HP).map((k) => ({ value: k, label: t(`classes.${k}`) }))} />

            <Text style={[styles.preview, { color: theme.muted }]}>
                {t('welcome.preview', { playerName: name.trim() || 'Hero', characterClass: t(`classes.${cls}`), hp: CLASS_HP[cls] })}
            </Text>

            <Pressable onPress={start} style={[styles.cta, { backgroundColor: theme.accent }]}>
                <Text style={{ color: theme.onAccent, fontWeight: '700', fontSize: 17 }}>{t('welcome.start')}</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 24, paddingTop: 72, gap: 8, flexGrow: 1 },
    title: { fontSize: 34, fontWeight: '800', fontFamily: 'serif' },
    subtitle: { fontSize: 16, marginBottom: 16 },
    label: { fontSize: 14, fontWeight: '600', marginTop: 16, marginBottom: 6 },
    segment: { flexDirection: 'row', borderWidth: 1, borderRadius: 10, overflow: 'hidden' },
    segBtn: { flex: 1, paddingVertical: 12, alignItems: 'center' },
    input: { borderWidth: 1, borderRadius: 10, padding: 12, fontSize: 16 },
    preview: { marginTop: 20, fontSize: 14, fontStyle: 'italic' },
    cta: { marginTop: 24, paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
});
