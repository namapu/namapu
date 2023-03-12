
import { v4 as uuidv4 } from 'uuid';

export enum EType { ERR = 0, CARD, CONN, FRAME, SVG };
export enum EOp { ERR = 0, ADD, REMOVE, CHANGE, CLEARALL, UNDO, REDO };
export type TJsonString = string;

export interface IItem { typ: EType; id: string; };
export interface ICard { typ: EType; id: string; tit: string; }
export interface ICmd { op: EOp, item1: TJsonString, item2: TJsonString };
export interface IApp {
	state: Map<string, TJsonString>;
	undo: Array<ICmd>;
	redo: Array<ICmd>;
};

function pushTo(arr: Array<ICmd>, item1: TJsonString, item2: TJsonString, op: EOp) {
	const cmd: ICmd = { op: op, item1: item1, item2: item2 };
	arr.push(cmd);
}

export function addItem(app: IApp, item: TJsonString) {
	const json: IItem = JSON.parse(item as string) as IItem;
	app.state.set(json.id, item);
	pushTo(app.undo, item, "{}", EOp.REMOVE);
	app.redo.length = 0;
}

export function removeItem(app: IApp, item: TJsonString) {
	const json: IItem = JSON.parse(item as string) as IItem;
	app.state.delete(json.id);
	pushTo(app.undo, item, "{}", EOp.ADD);
	app.redo.length = 0;
}

export function undo(app: IApp) {
	const cmd: ICmd = app.undo.pop() as ICmd;
	switch (cmd.op) {
		case EOp.ADD: {
			const json1: IItem = JSON.parse(cmd.item1 as string) as IItem;
			app.state.set(json1.id, cmd.item1);
			pushTo(app.redo, cmd.item1, "{}", EOp.REMOVE);
			break;
		}
		case EOp.REMOVE: {
			const json1: IItem = JSON.parse(cmd.item1 as string) as IItem;
			app.state.delete(json1.id);
			pushTo(app.redo, cmd.item1, "{}", EOp.ADD);
			break;
		}
	}
};

export function redo(app: IApp) {
	const cmd: ICmd = app.redo.pop() as ICmd;
	switch (cmd.op) {
		case EOp.ADD: {
			const json1: IItem = JSON.parse(cmd.item1 as string) as IItem;
			app.state.set(json1.id, cmd.item1);
			pushTo(app.undo, cmd.item1, "{}", EOp.REMOVE);
			break;
		}
		case EOp.REMOVE: {
			const json1: IItem = JSON.parse(cmd.item1 as string) as IItem;
			app.state.set(json1.id, cmd.item1);
			pushTo(app.undo, cmd.item1, "{}", EOp.ADD);
			break;
		}
	}
};

// function render(app: any) {
// 	// dots.innerHTML = '';
// 	const out: Array<string> = [];
// 	app.history[app.position].forEach(function (item: any) {
// 		out.push(item);
// 	});
// }

function startTime() {
	return performance.now();
}
function endTime(start: number) {
	return performance.now() - start;
}
function printApp(app: IApp) {
	const PRINT_LIMIT = 5;
	console.log("*** STATE: " + app.state.size + " items ***");
	app.state.forEach((value: string, key: string) => {
		if (PRINT_LIMIT < 6) {
			// console.log(key, JSON.parse(value));
			console.log(key, value);
		}
	});

	console.log("*** UNDO: " + app.undo.length + " items ***");
	app.undo.forEach((cmd: ICmd) => {
		if (PRINT_LIMIT < 6) {
			// console.log(cmd.op.toString() + ", " + cmd.item1 + ", " + cmd.item2);
			console.log(cmd);
		}
	});

	console.log("*** REDO: " + app.redo.length + " items ***");
	app.redo.forEach((cmd: ICmd) => {
		if (PRINT_LIMIT < 6) {
			// console.log(cmd.op.toString() + ", " + cmd.item1 + ", " + cmd.item2);
			console.log(cmd);
		}
	});
}
function main() {

	const app : IApp = {
		state: new Map<string, TJsonString>(),
		undo: new Array<ICmd>(),
		redo: new Array<ICmd>(),
	}
	
	const start = startTime();
	console.log("============== elapsed time: start ==============");
	const N = 5;
	for (let i = 0; i < N; i++) {
		addItem(app, JSON.stringify({ typ: EType.CARD, id: uuidv4(), tit: "Hello, World" }));
	}
	const elapsed = endTime(start);
	console.log("============== elapsed time: " + elapsed + " msecs ==============");


	console.log(`==== OPERATION 3 x ADD  ====`);
	addItem(app, JSON.stringify({ typ: EType.CARD, id: (0).toString(), tit: "Hello, World" }));
	addItem(app, JSON.stringify({ typ: EType.CARD, id: (1).toString(), tit: "Hello, World" }));
	addItem(app, JSON.stringify({ typ: EType.CARD, id: (2).toString(), tit: "Hello, World" }));
	printApp(app);

	const toRemove = 1;
	console.log(`==== OPERATION REMOVE ${ toRemove } ====`);
	removeItem(app, JSON.stringify({ typ: EType.CARD, id: (toRemove).toString(), tit: "Hello, World" }));
	printApp(app);
	
	console.log(`==== OPERATION UNDO ====`);
	undo(app);
	printApp(app);
	
	console.log(`==== OPERATION UNDO ====`);
	undo(app);
	printApp(app);
	
	console.log(`==== OPERATION REDO ====`);
	redo(app);
	printApp(app);
	
	const toInsert = 4;
	console.log(`==== OPERATION ADD ${ toInsert } ====`);
	// addItem(appState, JSON.stringify({ typ: EType.CARD, id: uuidv4(), tit: "Hello, World" }));
	addItem(app, JSON.stringify({ typ: EType.CARD, id: (toInsert).toString(), tit: "Hello, World" }));
	printApp(app);
	
	console.log(`==== OPERATION 4x UNDO ====`);
	undo(app);
	undo(app);
	undo(app);
	undo(app);
	printApp(app);	
}	
main();