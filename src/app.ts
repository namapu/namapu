// import CardItem from './card-item';
import Nav from './nav';
import { TDoc } from './state';
import Immutable from 'immutable';

export default class App {
  readonly appElem: HTMLDivElement;
  readonly navElem: HTMLDivElement;
  readonly nav: Nav;
  readonly doc: TDoc;

  constructor(appElem: HTMLDivElement, navElem: HTMLDivElement) {
    this.appElem = appElem;
    this.navElem = navElem;
    this.nav = new Nav(this.navElem);
    this.doc = { history: Immutable.List([]), index: 0 };
    this.bindEvents();
  }
 
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

