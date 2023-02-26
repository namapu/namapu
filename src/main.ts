import './style.css'
import App from './app';

window.onload = () => {
  const appElem = document.querySelector<HTMLDivElement>('#app') as HTMLDivElement;
  const navElem = document.querySelector<HTMLDivElement>('#nav') as HTMLDivElement;
  
  let app = new App(appElem, navElem);
  app.render();
}

