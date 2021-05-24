// export default () => {
//   const login = `<div class="modal-header">
//   <h3>SignUp</h3>
// </div>
// <div class="modal-body">
//   <form id="signup-form">
//     <div class="form-group">
//       <input type="text" id="signup-email" class="form-control" placeholder="Title" required>
//     </div>
//     <div class="form-group">
// <input type="password" id="signup-password" class="form-control" placeholder="Password" required>
//     </div>
//     <button type="submit" class="btn btn-primary">Save changes</button>
//   </form>
// </div>`;
//   const divElemt = document.createElement('div');
//   divElemt.classList.add('position');
//   divElemt.innerHTML = login;

//   const signUpForm = divElemt.querySelector('#signup-form');
//   signUpForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const email = signUpForm['signup-email'].value;
//     const password = signUpForm['signup-password'].value;

//     // Authenticate the User
//     firebase.auth()
//       .createUserWithEmailAndPassword(email, password)
//     // eslint-disable-next-line no-unused-vars
//       .then((userCredential) => {
//         // clear the form
//         //  signUpForm.reset();
//       // eslint-disable-next-line no-console
//         console.log('Se agregó nuevo usuario');
//       });
//   });
//   return divElemt;
// };

export default () => {
  const login = ` <div class="container">
  <input id="txtEmail" type="email" placeholder="Email">
  <input id="txtPassword" type="password" placeholder="Contraseña">
  <button id = "btnLogin" class="btn btn-action">Login</button>
  <button id = "btnSignUp" class="btn btn-secondary">Registrarse</button>
  <button id = "btnLogout" class="btn btn-action hide">Logout</button>
</div>`;
  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = login;

  // Obtener elementos
  const txtEmail = divElemt.querySelector('#txtEmail');
  const txtPassword = divElemt.querySelector('#txtPassword');
  const btnLogin = divElemt.querySelector('#btnLogin');
  const btnSignUp = divElemt.querySelector('#btnSignUp');
  const btnLogout = divElemt.querySelector('#btnLogout');

  // Añadir Evento login
  btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    // Obtener email y pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    // eslint-disable-next-line no-console
    // eslint-disable-next-line no-shadow
    promise.catch((e) => console.log(e.message));
    window.location.hash = '#/home';
  });

  // Añadir evento signup
  btnSignUp.addEventListener('click', (e) => {
    // Obtener email y pass
    // TODO: comprobar que el email sea real
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch((e) => console.log(e.message));
  });

  btnLogout.addEventListener('click', (e) => {
    firebase.auth().signOut();
  });

  // Añadir un listener en tiempo real
  firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      console.log(firebaseUser);
    } else {
      console.log('no logueado');
      btnLogout.classList.add('hide');
    }
  });
  return divElemt;
};
