/* eslint-disable no-console */
import { logIn, googleSignIn } from '../model/firebase_auth.js';
import { createUser } from '../model/firebase_user.js';

// export const changeHash = (hash) => {
//   window.location.hash = hash;
// };

export default () => {
  const viewHome = `
  <img class="logo" src="img/logo.png">
  <p id='texto'>¿Te gusta viajar,o conocer nuevos lugares?
  Esta es la comunidad de viajeros,que comparten sus mejores momentos</p>
  <img id="travel" src="img/travel.jpg">
  <p class='subtitle'>INICIA SESIÓN</p>
  <div><i class="far fa-user"></i><input class='allInputs 'id ="email" type="text" placeholder="Correo electronico"></div>
  <div><i class="fas fa-lock"></i><input class='allInputs 'id ="pass" type="password" placeholder="Contraseña"></div>
  <button id = "btn-login" class='principal-button'><a class='links-on-buttons'>INGRESAR</a></button>
  <span id="messages" class="messages"></span>
  <p class='lil-text'>O ingresa con...</p>
  <div>
  
  <a class='links-on-buttons'><img id="gmail" src="img/gmail.png"></a>
  </div>
  <p class='lil-text'>¿No tienes una cuenta?</p>
  <p id='just-link'><a href="#/register">REGISTRATE</a></p>
  `;
  const divElemt = document.createElement('div');
  divElemt.classList.add('view-register');
  divElemt.innerHTML = viewHome;
  const btnLogIn = divElemt.querySelector('#btn-login');
  btnLogIn.addEventListener(('click'), () => {
    const email = divElemt.querySelector('#email');
    const pass = divElemt.querySelector('#pass');
    const logInEmail = email.value;
    const logInPass = pass.value;

    logIn(logInEmail, logInPass)
      .then(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            if (user.emailVerified === false) {
              divElemt.querySelector('#messages').innerHTML = '⚠️ Email no verificado, revise su correo porfavor.';
              firebase.auth().signOut();
            } else {
              divElemt.querySelector('#messages').innerHTML = 'Puede ingresar';
              window.location.hash = '#/wall';
              // changeView(window.location.hash);
            }
          }
        });
      })
      .catch(() => {
        divElemt.querySelector('#messages').innerHTML = '⚠️ Cuenta o clave no coinciden verifique o pulse click en REGISTRATE.';
      });
  });
  // googlesignin function
  const btngoogleSignIn = divElemt.querySelector('#gmail');
  btngoogleSignIn.addEventListener(('click'), () => {
    googleSignIn()
      .then((result) => {
        createUser(result.user.uid, result.user.displayName, result.user.photoURL, 'Apasionados por viajar')
          .catch((error) => {
            console.log(error);
            console.log('No se actualizo usuario');
          });
        window.location.hash = '#/wall';
        // changeHash('#/wall');
        console.log(result);
        console.log('Cuenta de Google registrada!!!');
      }).catch((error) => {
        console.log(error);
        console.log('No se registro la cuenta :c');
      });
  });

  return divElemt;
};
