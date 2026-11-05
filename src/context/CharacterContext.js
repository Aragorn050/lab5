import React, { createContext, useContext, useMemo, useReducer } from 'react';

export const CLASS_HP = { warrior: 120, mage: 80, rogue: 100 };

const initialState = {
    name: '',
    characterClass: 'warrior', // key, translated through classes.<key>
    hp: CLASS_HP.warrior,
    maxHp: CLASS_HP.warrior,
    inventory: [], // item keys, translated through items.<key>
};

function reducer(state, action) {
    switch (action.type) {
        case 'CREATE': {
            const maxHp = CLASS_HP[action.characterClass];
            return { name: action.name.trim() || 'Hero', characterClass: action.characterClass, hp: maxHp, maxHp, inventory: [] };
        }
        case 'DAMAGE':
            return { ...state, hp: Math.max(0, state.hp - action.amount) };
        case 'HEAL':
            return { ...state, hp: Math.min(state.maxHp, state.hp + action.amount) };
        case 'ADD_ITEM':
            return { ...state, inventory: [...state.inventory, action.item] };
        case 'REMOVE_ITEM': {
            const i = state.inventory.indexOf(action.item);
            if (i === -1) return state;
            return { ...state, inventory: state.inventory.filter((_, idx) => idx !== i) };
        }
        case 'RESTART':
            return { ...state, hp: state.maxHp, inventory: [] };
        default:
            return state;
    }
}

const CharacterContext = createContext(null);

export function CharacterProvider({ children }) {
    const [character, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(() => ({ character, dispatch }), [character]);
    return <CharacterContext.Provider value={value}>{children}</CharacterContext.Provider>;
}

export const useCharacter = () => {
    const ctx = useContext(CharacterContext);
    if (!ctx) throw new Error('useCharacter must be used inside CharacterProvider');
    return ctx;
};
