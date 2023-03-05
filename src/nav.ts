// import AppState from './app-state';
// import Doc from "./doc";

import { TAppState } from "./types";

export default
class Nav {
  readonly navElem: HTMLElement;
  readonly appState: TAppState;

  constructor(appState: TAppState, navElem: HTMLElement) {
    this.appState = appState;
    this.navElem = navElem;
    // this.doc = doc;
  }
 
  render() {
    this.navElem.innerHTML = 
      `
      <nav style="position:fixed; left: 0.5em; top:0.5em">
        <button id='btn-new' >New</button>
        <button id='btn-load'>Load</button>
        <button id='btn-save'>Save</button>
        <button id='btn-dele'>Delete</button>
        <button id='btn-undo'>Undo</button>
        <button id='btn-redo'>Redo</button>
      </nav>
      `;
      const btnNew = document.querySelector<HTMLElement>('#btn-new') as HTMLElement;
      if (btnNew) btnNew.onclick = this.handleClick_New;

      const btnLoad = document.querySelector<HTMLElement>('#btn-load') as HTMLElement;
      if (btnLoad) btnLoad.onclick = this.handleClick_Load;
      
      const btnSave = document.querySelector<HTMLElement>('#btn-save') as HTMLElement;
      if (btnSave) btnSave.onclick = this.handleClick_Save;
      
      const btnDelete = document.querySelector<HTMLElement>('#btn-dele') as HTMLElement;
      if (btnDelete) btnDelete.onclick = this.handleClick_Delete;

      const btnUndo = document.querySelector<HTMLElement>('#btn-undo') as HTMLElement;
      if (btnUndo) btnUndo.onclick = this.handleClick_Undo;
      
      const btnRedo = document.querySelector<HTMLElement>('#btn-redo') as HTMLElement;
      if (btnRedo) btnRedo.onclick = this.handleClick_Redo;
      
  }

  private handleClick_New = () => {
    console.log("handleClick_New");
  }

  private handleClick_Load = () => {
    console.log("handleClick_Load");
  }

  private handleClick_Save = () => {
    console.log("handleClick_Save");
  }

  private handleClick_Undo = () => {
    console.log("handleClick_Undo");
  }

  private handleClick_Redo = () => {
    console.log("handleClick_Redo");
  }

  private handleClick_Delete = () => {
    console.log("handleClick_Delete");
  }

}