// Language-neutral story graph. All text lives in locales/*.json under story.<nodeId>.
// effects: { damage, heal, addItem, removeItem }, requiresItem: item key
export const story = {
    start: { choices: [{ key: 'enterCave', next: 'cave' }, { key: 'takeRoad', next: 'road' }] },
    road: {
        choices: [
            { key: 'buyPotion', next: 'roadAfter', effects: { addItem: 'potion' } },
            { key: 'ignore', next: 'roadAfter' },
        ],
    },
    roadAfter: { choices: [{ key: 'goCave', next: 'cave' }] },
    cave: {
        choices: [
            { key: 'sneak', next: 'victory', effects: { addItem: 'dragonCoin' } },
            { key: 'fight', next: 'fight', effects: { damage: 40 } },
        ],
    },
    fight: {
        choices: [
            { key: 'usePotion', next: 'victory', requiresItem: 'potion', effects: { removeItem: 'potion', heal: 50, addItem: 'dragonCoin' } },
            { key: 'fightOn', next: 'victory', effects: { damage: 50, addItem: 'dragonCoin' } },
        ],
    },
    victory: { ending: true },
    defeat: { ending: true },
};
