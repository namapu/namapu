import './style.css'
import App from './app';
import { THistory } from './doc';
import Immutable from 'immutable';

const history: THistory = { mindmaps: [Immutable.List([])], index: 0 };
let cardsDiv : HTMLDivElement;
let undoButton : HTMLButtonElement; 
let redoButton : HTMLButtonElement; 
let loadButton : HTMLButtonElement; 
let saveButton : HTMLButtonElement; 
let newButton : HTMLButtonElement; 

window.onload = () => {
  const appElem = document.querySelector<HTMLDivElement>('#app') as HTMLDivElement;
  const navElem = document.querySelector<HTMLDivElement>('#nav') as HTMLDivElement;
  let app = new App(appElem, navElem);
  app.render();
  cardsDiv = appElem; //document.getElementById('app') as HTMLButtonElement;
  undoButton = document.getElementById('btn-undo') as HTMLButtonElement;
  redoButton = document.getElementById('btn-redo') as HTMLButtonElement;
  loadButton = document.getElementById('btn-load') as HTMLButtonElement;
  saveButton = document.getElementById('btn-save') as HTMLButtonElement;
  newButton = document.getElementById('btn-new') as HTMLButtonElement;

  // clicking the background adds a card
  cardsDiv.addEventListener('click', function(e) {
    const title = "";
    const id = +new Date();
    addCard(e.pageX, e.pageY, color, title, id);
    color = color + 20;
    // setFocus(elCard);
  });

  // clicking undo goes back in time, unless
  // there is no history left.
  undoButton.addEventListener('click', function() {
      if (history.index > 0) history.index--;
      render();
  });

  // clicking redo goes forward in time, unless
  // there is no future left.
  redoButton.addEventListener('click', function() {
      if (history.index < history.mindmaps.length) history.index++;
      render();
  });

  // save 
  saveButton.addEventListener('click', function() {
    const immutable = history.mindmaps[history.index];
    const obj = immutable.toJS(); 
    const json = JSON.stringify(obj);
    saveDoc('test', json);
    // console.log(json);
  });

  // load 
  loadButton.addEventListener('click', function() {
    const json = loadDoc('test');
    console.log(json);
    if (json === null) return null;
    const obj = JSON.parse(json);
    // console.log(obj);
    clearHistory();
    history.mindmaps[history.index] = Immutable.fromJS(obj);
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
  // first, make sure that there is no future
  // in the history list. for instance, if the user
  // renders something, clicks undo, and then
  // renders something else, we need to dispose of the
  // future state
  const index = history.index;
  history.mindmaps = history.mindmaps.slice(0, index + 1);
  
  // create a new version of the data by applying
  // a given function to the current head
  const newVersion = fn(history.mindmaps[index]);
  
  // add the new version to the history list and increment
  // the index to match
  history.mindmaps.push(newVersion);
  history.index = index + 1;
  
  // rerender the cards
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
  const color = card.get('color'); 
  elem.style.backgroundColor = `hsl(${color} 99% 80%`;
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
    history.mindmaps[history.index].forEach(function(card) {
        var elem = cardsDiv.appendChild(document.createElement('div'));
        setCard(elem, card);
    });
    undoButton.disabled = (history.index != 0) ? false : true;
    redoButton.disabled = (history.index !== history.mindmaps.length - 1) ? false : true;
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
  history.mindmaps = [Immutable.List([])];
  history.index = 0;
}

const saveDoc = (name: string, data: any) => {
  localStorage.setItem(name, data);
}

const loadDoc = (name: string) => {
   return localStorage.getItem(name);
}

