// Este es el punto de entrada de tu aplicacion
// import { myFunction } from './lib/index.js';
// myFunction();
// import { SignUp } from './view/SignUp.js';

// const container = document.getElementById('container');

// window.addEventListener('hashchange', () => {
//   const hash = window.location.hash;
//   // eslint-disable-next-line no-console
//   console.log(hash);

//   switch (hash) {
//     case '#/home':

//       container.innerHTML = '<p>Hola mundo </p>';

//       break;

//     case '#/SignUp':
//       container.appendChild(SignUp());

//       break;

//     default:
//       break;
//   }
// });
import { changeTmp } from './view-controller/router.js';

const init = () => {
  changeTmp(window.location.hash);
  window.addEventListener('hashchange', () => changeTmp(window.location.hash));
};

window.addEventListener('load', init);
