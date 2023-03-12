// import { v4 as uuidv4 } from 'uuid';

export enum EType { ERR = 0, CARD, CONN, FRAME, SVG };
export enum EOp { ERR = 0, ADD, REMOVE, CHANGE, CLEARALL, UNDO, REDO };
export type TJsonString = string;

export interface IItem {
	typ: EType; id: string;
};
export interface ICard {
	typ: EType; id: string; tit: string;
	x: number; y: number; w: number; h: number;
	col: string; bgcol: string;
}
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

export function add(app: IApp, item: TJsonString) {
	const json: IItem = JSON.parse(item as string) as IItem;
	app.state.set(json.id, item);
	pushTo(app.undo, item, "{}", EOp.REMOVE);
	app.redo.length = 0;
}

export function remove(app: IApp, item: TJsonString) {
	const json: IItem = JSON.parse(item as string) as IItem;
	app.state.delete(json.id);
	pushTo(app.undo, item, "{}", EOp.ADD);
	app.redo.length = 0;
}

export function change(app: IApp, item1: TJsonString, item2: TJsonString) {
	const json1: IItem = JSON.parse(item1 as string) as IItem;
	app.state.set(json1.id, item2);
	pushTo(app.undo, item1, item2, EOp.CHANGE);
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

		case EOp.CHANGE: {
			const json1: IItem = JSON.parse(cmd.item1 as string) as IItem;
			app.state.set(json1.id, cmd.item1);
			pushTo(app.redo, cmd.item2, cmd.item1, EOp.CHANGE);
			break;
		}

		default:
			throw "Unknown operation: " + cmd.op;
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
		case EOp.CHANGE: {
			const json1: IItem = JSON.parse(cmd.item1 as string) as IItem;
			app.state.set(json1.id, cmd.item1);
			pushTo(app.undo, cmd.item2, cmd.item1, EOp.CHANGE);
			break;
		}

		default:
			throw "Unknown operation: " + cmd.op;
	}
};
