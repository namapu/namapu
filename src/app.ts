// import CardItem from './card-item';
import Nav from './nav';
import { TAppState } from './types';
// import { THistory } from './doc';
// import Immutable from 'immutable';

export default class App {
  readonly appElem: HTMLDivElement;
  readonly navElem: HTMLDivElement;
  readonly nav: Nav;
  readonly appState: TAppState;

  constructor(appState: TAppState, appElem: HTMLDivElement, navElem: HTMLDivElement) {
    this.appState = appState;
    this.appElem = appElem;
    this.navElem = navElem;
    this.nav = new Nav(this.appState, this.navElem);
    this.bindEvents();
  }
/*
  operation(fn: any) {
    // first, make sure that there is no future
    // in the history list. for instance, if the user
    // renders something, clicks undo, and then
    // renders something else, we need to dispose of the
    // future state
    const index = this.history.index;
    this.history.mindmaps = this.history.mindmaps.slice(0, index + 1);
    
    // create a new version of the data by applying
    // a given function to the current head
    const newVersion = fn(this.history.mindmaps[index]);
    
    // add the new version to the history list and increment
    // the index to match
    this.history.mindmaps.push(newVersion);
    this.history.index = index + 1;
    
    // rerender the cards
    this.render();
  }
 
  addCard(x: number, y: number, color: number, name: string, id: string) {
    this.operation(function(data: any) {
        return data.push(Immutable.Map({
            x: x, y: y, color: color, name: name, id: id
        }));
    });
  }

  removeCard(id: string) {
    this.operation(function(data: any) {
        return data.filter(function(card: any) {
            return card.get('id') !== id;
        });
    });
  }
*/
  // over_handler(event: PointerEvent) { console.log(event); }
  // enter_handler(event: PointerEvent) { console.log(event); }
  // down_handler(event: PointerEvent) { console.log(event); }
  // move_handler(event: PointerEvent) { console.log(event); }
  // up_handler(event: PointerEvent) { console.log(event); }
  // cancel_handler(event: PointerEvent) { console.log(event); }
  // out_handler(event: PointerEvent) { console.log(event); }
  // leave_handler(event: PointerEvent) { console.log(event); }
  // gotcapture_handler(event: PointerEvent) { console.log(event); }
  // lostcapture_handler(event: PointerEvent) { console.log(event); }
  // click_handler(event: MouseEvent) { console.log(event); alert("click"); }
  // dblclick_handler(event: MouseEvent) { console.log(event); alert("dblclick"); }
  
  render = () => {
    this.nav.render();
    // this.doc.render();
  }
  
  private bindEvents = () => {
      // this.appElem.onclick = this.handleClick;
      // this.appElem.ondblclick = this.handleClick;    // Is double click better?
  }

  // private handleClick = (event: MouseEvent) => {
  //   if (event.target === this.appElem) {
  //     this.handleClick_AddCard(event);
  //   }
  //   else {
  //     this.handleClick_EditCard(event);
  //   }
  // }

//   private handleClick_AddCard = (event: MouseEvent) => { 
//     // const cardItem = this.doc.addCard(event.pageX, event.pageY);
//     // this.doc.focusUid = cardItem.uid;
//     // // console.log("focusUid: ", this.doc.focusUid);
//     // this.render();
//     // this.editCardTitle(cardItem);
//   }

// private editCardTitle(cardItem: CardItem) {
//   const card = document.querySelector<HTMLElement>("#" + cardItem.uid) as HTMLElement;
//   if (card != null) {
//     card.contentEditable = 'true';
//     card.focus();
//     handleFocusOut(card, cardItem);   
//   }
// }

// private handleClick_EditCard = (event: MouseEvent) => {
//     console.log("card clicked: " + event);
//     const item = event.target as HTMLElement
//     this.doc.focusUid = item.id;
//     console.log("focusUid: ", this.doc.focusUid);
//   }
// }

// function handleFocusOut(card: HTMLElement, cardItem: CardItem) {
//   card.addEventListener('focusout', (e: Event) => {
//     const foc = e as FocusEvent;
//     if (foc !== null && foc.target !== null) {
//       const el: HTMLElement = foc.target as HTMLElement;
//       cardItem.title = el.innerText;
//       console.log(cardItem.title);
//     }
//   });
}

