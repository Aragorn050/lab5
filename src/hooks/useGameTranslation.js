import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useCharacter } from '../context/CharacterContext';

/**
 * Wraps react-i18next's `t` so that every string can use the character's
 * variables without passing them manually:
 *   {playerName} {characterClass} {hp} {maxHp} {itemCount}
 * Extra variables passed by the caller override the defaults.
 * The hook re-renders whenever the character or the language changes,
 * so placeholders update in real time.
 */
export function useGameTranslation() {
    const { t, i18n } = useTranslation();
    const { character } = useCharacter();

    const tg = useCallback(
        (key, vars = {}) =>
            t(key, {
                playerName: character.name,
                characterClass: t(`classes.${character.characterClass}`),
                hp: character.hp,
                maxHp: character.maxHp,
                itemCount: character.inventory.length,
                ...vars,
            }),
        [t, character]
    );

    return { t: tg, i18n };
}
