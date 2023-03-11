// example.test.js
import { expect, test } from 'vitest';
import Immutable from 'immutable';
import { ItemType, addCard, removeItem, undo, redo } from './main';

test('Math.sqrt()', () => {
    const appState = {
        history: [Immutable.List([])],
        index: 0,
    }
    expect(appState.index).toBe(0);
    expect(appState.history[0]).toBe(Immutable.List());

    addCard(appState, "1", "hello1", 10, 10, 30, 30);
    expect(appState.index).toBe(1);
    expect(appState.history[1].toJS()).toStrictEqual([
        { id: "1", type: ItemType.CARD, label: "hello1", x: 10, y: 10, w: 30, h: 30 }]);

    addCard(appState, "2", "hello2", 10, 10, 30, 30);
    expect(appState.index).toBe(2);
    expect(appState.history[1].toJS()).toStrictEqual([
        { id: "1", type: ItemType.CARD, label: "hello1", x: 10, y: 10, w: 30, h: 30 }]);
    expect(appState.history[2].toJS()).toStrictEqual([
        { id: "1", type: ItemType.CARD, label: "hello1", x: 10, y: 10, w: 30, h: 30 },
        { id: "2", type: ItemType.CARD, label: "hello2", x: 10, y: 10, w: 30, h: 30 }]);

    addCard(appState, "3", "hello2", 10, 10, 30, 30);
    expect(appState.index).toBe(3);
    addCard(appState, "4", "hello2", 10, 10, 30, 30);
    expect(appState.index).toBe(4);
    expect(appState.history[4].toJS()).toStrictEqual([
        { id: "1", type: ItemType.CARD, label: "hello1", x: 10, y: 10, w: 30, h: 30 },
        { id: "2", type: ItemType.CARD, label: "hello2", x: 10, y: 10, w: 30, h: 30 },
        { id: "3", type: ItemType.CARD, label: "hello2", x: 10, y: 10, w: 30, h: 30 },
        { id: "4", type: ItemType.CARD, label: "hello2", x: 10, y: 10, w: 30, h: 30 }]);

    removeItem(appState, "2");
    expect(appState.index).toBe(5);
    expect(appState.history[5].toJS()).toStrictEqual([
        { id: "1", type: ItemType.CARD, label: "hello1", x: 10, y: 10, w: 30, h: 30 },
        { id: "3", type: ItemType.CARD, label: "hello2", x: 10, y: 10, w: 30, h: 30 },
        { id: "4", type: ItemType.CARD, label: "hello2", x: 10, y: 10, w: 30, h: 30 }]);

    addCard(appState, "5", "hello5", 10, 10, 30, 30);
    expect(appState.index).toBe(6);
    expect(appState.history[6].toJS()).toStrictEqual([
        { id: "1", type: ItemType.CARD, label: "hello1", x: 10, y: 10, w: 30, h: 30 },
        { id: "3", type: ItemType.CARD, label: "hello2", x: 10, y: 10, w: 30, h: 30 },
        { id: "4", type: ItemType.CARD, label: "hello2", x: 10, y: 10, w: 30, h: 30 },
        { id: "5", type: ItemType.CARD, label: "hello5", x: 10, y: 10, w: 30, h: 30 }]);
   
    undo(appState);
    undo(appState);
    expect(appState.index).toBe(4);
    expect(appState.history[4].toJS()).toStrictEqual([
        { id: "1", type: ItemType.CARD, label: "hello1", x: 10, y: 10, w: 30, h: 30 },
        { id: "2", type: ItemType.CARD, label: "hello2", x: 10, y: 10, w: 30, h: 30 },
        { id: "3", type: ItemType.CARD, label: "hello2", x: 10, y: 10, w: 30, h: 30 },
        { id: "4", type: ItemType.CARD, label: "hello2", x: 10, y: 10, w: 30, h: 30 }]);
    
    redo(appState);
    expect(appState.index).toBe(5);
    expect(appState.history[5].toJS()).toStrictEqual([
        { id: "1", type: ItemType.CARD, label: "hello1", x: 10, y: 10, w: 30, h: 30 },
        { id: "3", type: ItemType.CARD, label: "hello2", x: 10, y: 10, w: 30, h: 30 },
        { id: "4", type: ItemType.CARD, label: "hello2", x: 10, y: 10, w: 30, h: 30 }]);
});



