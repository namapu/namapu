import './style.css'
import App from './app';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>NAMAPU</h1>
    <p>
     Welcome to NAMAPU 
    </p>
  </div>
`

window.onload = () => {
  const appElem = document.querySelector<HTMLDivElement>('#app') as HTMLDivElement;
  appElem!.innerHTML = `
  <div>
    <br />
    <h1>NAMAPU</h1>
    <p>
     Welcome to NAMAPU 
    </p>
  </div>
`;

  const navElem = document.querySelector<HTMLDivElement>('#nav') as HTMLDivElement;
  navElem!.innerHTML = `
  <nav style="position:fixed; left: 0.5em; top:0.5em">
    <button id='btn-new'  onclick="this.handleClick_New()">New</button>
    <button id='btn-load' onclick="handleClick_Load()">Load</button>
    <button id='btn-save' onclick="handleClick_Save()">Save</button>
    <button id='btn-dele' onclick="handleClick_Delete()">Delete</button>
    <button id='btn-undo' onclick="handleClick_Undo()">Undo</button>
    <button id='btn-redo' onclick="handleClick_Redo()">Redo</button>
  </nav>
  `;


  // let app = new App(appElem, navElem);
  // app.render();
}

