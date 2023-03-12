import './style.css'
import { v4 as uuidv4 } from 'uuid';
import { IApp, TJsonString, ICard, ICmd, EType, add, remove, change, undo, redo } from './app';

function render(app: IApp) {
	let innerHTML = "";
	app.state.forEach((value: string, key: string) => {
		const json: ICard = JSON.parse(value as string) as ICard;
		innerHTML += `<div id="${json.id}" class="card" style="translate: ${json.x}px ${json.y}px; background-color: hsl(${json.bgcol} 99% 90%);" contenteditable="true" >${json.tit}</div>`;
	});
	const mapDiv: HTMLDivElement = document.getElementById("map") as HTMLDivElement;
	mapDiv.innerHTML = innerHTML;
}


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
function runAddRemoveTest() {
	const app: IApp = {
		state: new Map<string, TJsonString>(),
		undo: new Array<ICmd>(),
		redo: new Array<ICmd>(),
	}

	if (0) {
		const start = startTime();
		console.log("============== elapsed time: start ==============");
		const N = 1000000;
		for (let i = 0; i < N; i++) {
			add(app, JSON.stringify({ typ: EType.CARD, id: uuidv4(), tit: "Hello, World" }));
		}
		const elapsed = endTime(start);
		console.log("============== elapsed time: " + elapsed + " msecs ==============");
	}
	else {
		console.log(`==== OPERATION 3 x ADD  ====`);
		add(app, JSON.stringify({ typ: EType.CARD, id: (0).toString(), tit: "Card 1", x: 10, y: 10, w: 50, h: 30, col: "#000", bgcol: "#ec9" }));
		add(app, JSON.stringify({ typ: EType.CARD, id: (1).toString(), tit: "Card 2", x: 60, y: 90, w: 50, h: 30, col: "#000", bgcol: "#ec9" }));
		add(app, JSON.stringify({ typ: EType.CARD, id: (2).toString(), tit: "Card with a long title", x: 60, y: 170, w: 50, h: 30, col: "#000", bgcol: "#ec9" }));
		printApp(app);

		const toRemove = 1;
		console.log(`==== OPERATION REMOVE ${toRemove} ====`);
		remove(app, JSON.stringify({ typ: EType.CARD, id: (toRemove).toString(), tit: "Hello, World" }));
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
		console.log(`==== OPERATION ADD ${toInsert} ====`);
		// addItem(appState, JSON.stringify({ typ: EType.CARD, id: uuidv4(), tit: "Hello, World" }));
		add(app, JSON.stringify({ typ: EType.CARD, id: (toInsert).toString(), tit: "Hello, World" }));
		printApp(app);

		console.log(`==== OPERATION 4x UNDO ====`);
		undo(app);
		undo(app);
		undo(app);
		undo(app);
		printApp(app);

		console.log(`==== OPERATION ADD uuid ====`);
		const id5 = uuidv4();
		const json1 = { typ: EType.CARD, id: id5, tit: "Hello, World" };
		const jsonStr1 = JSON.stringify(json1);
		const json2 = { typ: EType.CARD, id: id5, tit: "Brave Universe" };
		const jsonStr2 = JSON.stringify(json2);
		add(app, jsonStr1);
		printApp(app);

		console.log(`==== OPERATION CHANGE uuid ====`);
		change(app, jsonStr1, jsonStr2);
		printApp(app);

		console.log(`==== OPERATION UNDO uuid ====`);
		undo(app);
		printApp(app);

		console.log(`==== OPERATION REDO uuid ====`);
		redo(app);
		printApp(app);

		console.log(`==== OPERATION UNDO uuid ====`);
		undo(app);
		printApp(app);
	}

}

function runRenderTest() {
	const app: IApp = {
		state: new Map<string, TJsonString>(),
		undo: new Array<ICmd>(),
		redo: new Array<ICmd>(),
	}

	add(app, JSON.stringify({ typ: EType.CARD, id: (0).toString(), tit: "Card 1", x: 10, y: 10, w: 50, h: 30, col: "#000", bgcol: .3 }));
	add(app, JSON.stringify({ typ: EType.CARD, id: (1).toString(), tit: "Card 2", x: 60, y: 90, w: 50, h: 30, col: "#000", bgcol: .5 }));
	add(app, JSON.stringify({ typ: EType.CARD, id: (2).toString(), tit: "Card with a long title", x: 60, y: 170, w: 50, h: 30, col: "#000", bgcol: .6 }));

	render(app);
}

function rndInt(min: number, max: number) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
function runRenderBigTest() {
	const app: IApp = {
		state: new Map<string, TJsonString>(),
		undo: new Array<ICmd>(),
		redo: new Array<ICmd>(),
	}
	const start = startTime();
	console.log("============== elapsed time: start ==============");
	const N = 100;
	for (let i = 0; i < N; i++) {
		add(app, JSON.stringify({ typ: EType.CARD, id: uuidv4(), tit: "Card", 
		x: rndInt(0, 1000), y: rndInt(0, 800), bgcol: rndInt(0, 360) }));
	}

	render(app);

	const elapsed = endTime(start);
	console.log("============== elapsed time: " + elapsed + " msecs ==============");
}
// runAddRemoveTest();
// runRenderTest();
runRenderBigTest();