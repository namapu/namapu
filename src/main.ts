import Immutable from 'immutable';
import {v4 as uuidv4} from 'uuid';

export enum ItemType {
    UNDEF = 0,
    CARD,
    CONN,
    FRAME,
};

const appState = {
    history: Immutable.List([Immutable.List([])]),
    position: 0,
}

function operation(apst: any, fn: any) {
    apst.history = apst.history.slice(0, apst.position + 1);
    var newVersion = fn(apst.history[apst.position]);
    apst.history.push(newVersion);
    apst.position++;
    // draw();
}

// here are our two operations: addDot is what
// you trigger by clicking the blank
function addItem(apst: any, item: any) {
    operation(apst, function (data: any) {
        //const item = Immutable.Map({ id: id, title: "hello", x: 10, y: 10, w: 30, h: 30 });
        return data.push(Immutable.Map(item));
    });
    // console.log("add: ", item);
}

export function addCard(apst: any, id: string, title: string, x: number, y: number, w: number, h: number) {
    addItem(apst, { id: id, type: ItemType.CARD, title: title, x: x, y: y, w: w, h: h });
}

export function addConn(apst: any, id: string, title: string, x: number, y: number, w: number, h: number) {
    addItem(apst, { id: id, type: ItemType.CONN, title: title, x: x, y: y, w: w, h: h });
}

export function addFrame(apst: any, id: string, title: string, x: number, y: number, w: number, h: number) {
    addItem(apst, { id: id, type: ItemType.FRAME, title: title, x: x, y: y, w: w, h: h });
}


export function removeItem(appst: any, id: string) {
    operation(appst, function (data: any) {
        return data.filter(function (item: any) {
            return item.get('id') !== id;
        });
    });
    // console.log("delete: ", id);
}

export function undo(apst: any) {
    if (apst.position > 0)
        apst.position--;
    // console.log("Undo");
};

export function redo(apst: any) {
    if (apst.position < apst.history.length)
        apst.position++;
    // console.log("Redo");
};

function render(apst: any) {
    // dots.innerHTML = '';
    const out: Array<string> = [];
    apst.history[apst.position].forEach(function (item: any) {
        out.push(item);
    });
    // console.log(out.toString());
    // undo.disabled = (historyposition != 0) ? '' : 'disabled';
    // redo.disabled = (historyposition !== myHistory.length - 1) ? '' : 'disabled';
}

console.log("elapsed time: start");
const N = 10;
var startTime = performance.now();
    // for (let i = 1; i < N; i++)
    // {
    //     addCard(appState2, Number(i).toString(), "hello1", 10, 10, 30, 30);
    //     // console.log("added card");
    // }
    // for (let i = N-1; i > 0; i--)
    // {
    //     // removeItem(appState2, Number(i).toString());
    // }
    // let elapsed = new Date().getTime() - start;
    type Item = {
      id: string;
      type: ItemType;
      title: string;
    }
    let map = new Map<string, Item>();
    for (let i = 0; i < N; i++) {
      const uuid = uuidv4();
      map.set(uuid.toString(), {id: uuid,  type: ItemType.CARD, title: "hello"});
    }

    console.log("map size: ", map.size);

    map.forEach((value: Item, key: string) => {
      console.log(key, value);
    });    

    map.forEach((value: Item, key: string) => {
      value;
      map.delete(key);
    });    

    for (let i = N - 1; i >= 0; i--) {
      map.delete(i.toString());
    }

    console.log("map size: ", map.size);
    
    var endTime = performance.now();
    let elapsed = endTime - startTime;
    console.log("map size: ", map.size);
    console.log("elapsed time: ", elapsed, "msecs");


///====================

// addCard(appState, "1", "hello", 10, 10, 30, 30);
// render(appState);

// addItem(appState, { id: "2", type: ItemType.CARD, title: "hello", x: 10, y: 10, w: 30, h: 30 });
// addItem(appState, { id: "3", type: ItemType.CARD, title: "hello", x: 10, y: 10, w: 30, h: 30 });
// addItem(appState, { id: "4", type: ItemType.CARD, title: "hello", x: 10, y: 10, w: 30, h: 30 });
// render(appState);

// removeItem(appState, "2");
// render(appState);

// addItem(appState, { id: "5", type: ItemType.CARD, title: "hello", x: 10, y: 10, w: 30, h: 30 });
// render(appState);

// undo(appState);
// undo(appState);
// render(appState);

// redo(appState);
// render(appState);

/*

function renderCard(id: number) {
  // if (cardsDiv === null) return;
  // if (undoButton === null) return;
  // if (redoButton === null) return;

  // cardsDiv.innerHTML = '';
  const states = appState.history.states;
  const position = appState.history.position;
  const state : TState = states[position] as TState;
  const cards = state.cards;
  state.forEach(function(card) {
      const c: TCard = state.cards;
      if (card.id === id) {
        console.log("card: " + id);
        // var elem = cardsDiv.appendChild(document.createElement('div'));
        // setCard(elem, card);
      }
  });
  // undoButton.disabled = (history.position != 0) ? false : true;
  // redoButton.disabled = (history.position !== history.states.length - 1) ? false : true;
}
*/

/*
import App from './app';
import { TAppState, THistory, UiState as TUiState } from './types';
import Immutable from 'immutable';

const uiState: TUiState = { };
const history: THistory = { states: [Immutable.List([])], position: 0 };
const appState: TAppState = { history, uiState }


let cardsDiv : HTMLDivElement;
let undoButton : HTMLButtonElement; 
let redoButton : HTMLButtonElement; 
let loadButton : HTMLButtonElement; 
let saveButton : HTMLButtonElement; 
let newButton : HTMLButtonElement; 

window.onload = () => {
  const appElem = document.querySelector<HTMLDivElement>('#app') as HTMLDivElement;
  const navElem = document.querySelector<HTMLDivElement>('#nav') as HTMLDivElement;
  let app = new App(appState, appElem, navElem);
  app.render();

  cardsDiv = appElem; //document.getElementById('app') as HTMLButtonElement;
  undoButton = document.getElementById('btn-undo') as HTMLButtonElement;
  redoButton = document.getElementById('btn-redo') as HTMLButtonElement;
  loadButton = document.getElementById('btn-load') as HTMLButtonElement;
  saveButton = document.getElementById('btn-save') as HTMLButtonElement;
  newButton = document.getElementById('btn-new') as HTMLButtonElement;

  cardsDiv.addEventListener('dblclick', function(e) {
    const title = "";
    const id = +new Date();
    addCard(e.pageX, e.pageY, color, title, id);
    // color = color + 20;
    // setFocus(elCard);
  });
  undoButton.addEventListener('click', function() {
      if (history.position > 0) history.position--;
      render();
  });
  redoButton.addEventListener('click', function() {
      if (history.position < history.states.length) history.position++;
      render();
  });
  saveButton.addEventListener('click', function() {
    const immutable = history.states[history.position];
    const obj = immutable.toJS(); 
    const json = JSON.stringify(obj);
    saveDoc('test', json);
    // console.log(json);
  });
  loadButton.addEventListener('click', function() {
    const json = loadDoc('test');
    console.log(json);
    if (json === null) return null;
    const obj = JSON.parse(json);
    // console.log(obj);
    clearHistory();
    history.states[history.position] = Immutable.fromJS(obj);
    render();
    return true;
  });
  newButton.addEventListener('click', function() {
    clearHistory();
    render();
  });

  render();
  }

function operation(fn: any) {
  // first, make sure that there is no future in the history list. For instance, if the user renders something, 
  // clicks undo, and then renders something else, we need to dispose of the future state
  const position = history.position;
  history.states = history.states.slice(0, position + 1);
  const newVersion = fn(history.states[position]); // create a new version of the data by applying a given function to the current head
  history.states.push(newVersion); // add the new version to the history list and increment the position to match
  history.position = position + 1;

  render();
}

function addCard(x: number, y: number, color: number, name: string, id: number) {
  operation(function(data: any) {
      return data.push(Immutable.Map({
          x: x, y: y, color: color, name: name, id: id
      }));
  });
}

// function removeCard(id: string) {
//   operation(function(data: any) {
//       return data.filter(function(card: any) {
//           return card.get('id') !== id;
//       });
//   });
// }

const setCardLeftTop = (elem: any, card: any) => {
  elem.style.left = card.get('x') + 'px';
  elem.style.top = card.get('y') + 'px';
}

const setCardColor = (elem: any, card: any) => {
  // const color = card.get('color'); 
  // elem.style.backgroundColor = `hsl(${color} 99% 80%`;
  // elem.style.color = `hsl(${color} 99% 0%`;
}

const setCardTitle = (elem: any, card: any) => {
  elem.innerHTML = card.get('title');
}

const setCard = (elem: any, card: any) => {
  elem.className = 'card';
  setCardLeftTop(elem, card);
  setCardColor(elem, card);
  setCardTitle(elem, card);
  elem.id = card.get('id'); 
  elem.contentEditable = true;
  // elem.draggable = true;
  
  // clicking on a card removes it.
  elem.addEventListener('click', function(e: any) {
      // removeCard(card.get('id'));
      e.stopPropagation();
  });
}

function render() {
    if (cardsDiv === null) return;
    if (undoButton === null) return;
    if (redoButton === null) return;

    cardsDiv.innerHTML = '';
    history.states[history.position].forEach(function(card) {
        var elem = cardsDiv.appendChild(document.createElement('div'));
        setCard(elem, card);
    });
    undoButton.disabled = (history.position != 0) ? false : true;
    redoButton.disabled = (history.position !== history.states.length - 1) ? false : true;
}

let color = 0;

// function selectElementContents(el: any) {
//   var range = document.createRange();
//   range.selectNodeContents(el);
//   var sel = window.getSelection();
//   if (sel === null) return;
//   sel.removeAllRanges();
//   sel.addRange(range);
// }


const clearHistory = () => {
  history.states = [Immutable.List([])];
  history.position = 0;
}

const saveDoc = (name: string, data: any) => {
  localStorage.setItem(name, data);
}

const loadDoc = (name: string) => {
   return localStorage.getItem(name);
}

*/