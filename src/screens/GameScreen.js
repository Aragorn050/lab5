import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useCharacter } from '../context/CharacterContext';
import { useGameTranslation } from '../hooks/useGameTranslation';
import { story } from '../story/story';

export default function GameScreen({ onExit }) {
    const { theme } = useTheme();
    const { character, dispatch } = useCharacter();
    const { t } = useGameTranslation();
    const [nodeId, setNodeId] = useState('start');

    // Dying always leads to the defeat ending.
    useEffect(() => {
        if (character.hp <= 0 && nodeId !== 'defeat') setNodeId('defeat');
    }, [character.hp, nodeId]);

    const node = story[nodeId];

    const choose = (choice) => {
        const e = choice.effects || {};
        if (e.damage) dispatch({ type: 'DAMAGE', amount: e.damage });
        if (e.heal) dispatch({ type: 'HEAL', amount: e.heal });
        if (e.removeItem) dispatch({ type: 'REMOVE_ITEM', item: e.removeItem });
        if (e.addItem) dispatch({ type: 'ADD_ITEM', item: e.addItem });
        setNodeId(choice.next);
    };

    const restart = () => {
        dispatch({ type: 'RESTART' });
        setNodeId('start');
    };

    const visibleChoices = (node.choices || []).filter((c) => !c.requiresItem || character.inventory.includes(c.requiresItem));
    const hpRatio = character.hp / character.maxHp;

    return (
        <View style={[styles.root, { backgroundColor: theme.bg }]}>
            <View style={[styles.header, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Text style={{ color: theme.text, fontWeight: '600' }}>{t('status')}</Text>
                <View style={[styles.hpTrack, { backgroundColor: theme.border }]}>
                    <View style={{ width: `${hpRatio * 100}%`, height: '100%', backgroundColor: hpRatio > 0.35 ? theme.accent : theme.danger }} />
                </View>
                <Text style={{ color: theme.muted, marginTop: 6 }}>
                    {t('common.inventoryLabel')}:{' '}
                    {character.inventory.length ? character.inventory.map((i) => t(`items.${i}`)).join(', ') : t('common.emptyInventory')}
                </Text>
            </View>

            <ScrollView contentContainerStyle={styles.body}>
                <Text style={[styles.paragraph, { color: theme.text }]}>{t(`story.${nodeId}.text`)}</Text>

                {visibleChoices.map((c) => (
                    <Pressable key={c.key} onPress={() => choose(c)} style={[styles.choice, { borderColor: theme.accent, backgroundColor: theme.card }]}>
                        <Text style={{ color: theme.text, fontSize: 16 }}>{t(`story.${nodeId}.choices.${c.key}`)}</Text>
                    </Pressable>
                ))}

                {node.ending && (
                    <Pressable onPress={restart} style={[styles.cta, { backgroundColor: theme.accent }]}>
                        <Text style={{ color: theme.onAccent, fontWeight: '700' }}>{t('common.playAgain')}</Text>
                    </Pressable>
                )}
                <Pressable onPress={onExit} style={styles.link}>
                    <Text style={{ color: theme.muted }}>{t('common.backToMenu')}</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    header: { paddingTop: 56, paddingHorizontal: 20, paddingBottom: 14, borderBottomWidth: 1 },
    hpTrack: { height: 8, borderRadius: 4, overflow: 'hidden', marginTop: 8 },
    body: { padding: 24, gap: 14 },
    paragraph: { fontSize: 19, lineHeight: 30, fontFamily: 'serif', marginBottom: 8 },
    choice: { borderWidth: 1.5, borderRadius: 12, padding: 16 },
    cta: { paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 8 },
    link: { alignItems: 'center', padding: 12 },
});
