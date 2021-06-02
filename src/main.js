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
import { changeView } from './controller/router.js';

export const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};
window.addEventListener('load', init);

const firebaseConfig = {
  apiKey: 'AIzaSyBDqeO1mPFOoqSHwTaa2vJ-ELeEKH_jYmk',
  authDomain: 'red-social-aec9b.firebaseapp.com',
  projectId: 'red-social-aec9b',
  storageBucket: 'red-social-aec9b.appspot.com',
  messagingSenderId: '94670757893',
  appId: '1:94670757893:web:b0b858c2cdcf4d45e0fc6c',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    window.location.hash = '#/wall';
  } else {
    window.location.hash = '#';
    // apagar observador
  }
});

export const storage = firebase.storage();

export const storageRef = storage.ref('');
