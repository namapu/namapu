// example.test.js
import { expect, test } from 'vitest';
import { v4 as uuidv4 } from 'uuid';

import { IApp, TJsonString, ICmd, EType, addItem, removeItem, undo, redo } from './main';

test('Math.sqrt()', () => {

    // a0	S:0 		U:r0 			R:          Length: 1 1 0 
    // a1	S:0-1 		U:r0-r0 		R:          Length: 2 2 0 
    // a2	S:0-1-2 	U:r0-r1-r2 		R:          Length: 3 3 0 
    // r1	S:0-2		U:r0-r1-r2-a1	R:          Length: 2 4 0 
    // u	S:0-2-1		U:r0-r1-r2		R:r1        Length: 3 3 1 
    // u	S:0-1		U:r0-r1			R:a1-a2     Length: 2 2 2 
    // r	S:0-1-2		U:r0-r1-r2		R:a1        Length: 3 3 1 
    // a4   S:0-1-2-4   U:r0-r1-r2-r4   R:          Length: 3 3 0
    // u
    // u
    // u
    // u    S:          U:              R:a4-a2-a1-a0   Length: 0 0 4
    const app: IApp = {
        state: new Map<string, TJsonString>(),
        undo: new Array<ICmd>(),
        redo: new Array<ICmd>(),
    }

    const id0 = "6eac60fe-79f1-4f93-8566-3cbb348e0912"; //uuidv4();
    const id1 = "68ea219a-d092-431b-8393-b94fe8e2c889"; //uuidv4();
    const id2 = "836ca1f3-5956-41a8-9044-3f19444b5f3d"; //uuidv4();
    const id3 = "e1f292fe-866c-42a0-a45f-d80f46e3c35f"; //uuidv4();
    const id4 = "1f75218b-39c8-46e4-956b-edbed0235379"; //uuidv4();

    expect(app.state.size).toBe(0);
    expect(app.undo.length).toBe(0);
    expect(app.redo.length).toBe(0);

    addItem(app, JSON.stringify({ typ: EType.CARD, id: id0, tit: "Hello, World" }));
    addItem(app, JSON.stringify({ typ: EType.CARD, id: id1, tit: "Hello, World" }));
    addItem(app, JSON.stringify({ typ: EType.CARD, id: id2, tit: "Hello, World" }));
    expect(app.state.size).toBe(3);
    expect(app.undo.length).toBe(3);
    expect(app.redo.length).toBe(0);
    expect(app.state.get(id2)).toBe("{\"typ\":1,\"id\":\"836ca1f3-5956-41a8-9044-3f19444b5f3d\",\"tit\":\"Hello, World\"}");
    expect(app.undo[2].op).toBe(2);
    expect(app.undo[2].item1).toBe("{\"typ\":1,\"id\":\"836ca1f3-5956-41a8-9044-3f19444b5f3d\",\"tit\":\"Hello, World\"}");
    expect(app.undo[2].item2).toBe("{}");

    removeItem(app, JSON.stringify({ typ: EType.CARD, id: id1, tit: "Hello, World" }));
    expect(app.state.size).toBe(2);
    expect(app.undo.length).toBe(4);
    expect(app.redo.length).toBe(0);

    undo(app);
    undo(app);
    expect(app.state.size).toBe(2);
    expect(app.undo.length).toBe(2);
    expect(app.redo.length).toBe(2);

    redo(app);
    expect(app.state.size).toBe(3);
    expect(app.undo.length).toBe(3);
    expect(app.redo.length).toBe(1);

    addItem(app, JSON.stringify({ typ: EType.CARD, id: id4, tit: "Hello, World" }));
    expect(app.state.size).toBe(4);
    expect(app.undo.length).toBe(4);
    expect(app.redo.length).toBe(0);

    undo(app);
    undo(app);
    undo(app);
    undo(app);
    expect(app.state.size).toBe(0);
    expect(app.undo.length).toBe(0);
    expect(app.redo.length).toBe(4);
    expect(app.redo[0].op).toBe(1);
    expect(app.redo[0].item1).toBe("{\"typ\":1,\"id\":\"1f75218b-39c8-46e4-956b-edbed0235379\",\"tit\":\"Hello, World\"}");
    expect(app.redo[0].item2).toBe("{}");
});



