export default () => {
  const signin = `<div class="modal-header">
    <h3>SignIn</h3>
  </div>
  <div class="modal-body">
    <form id="login-form">
      <div class="form-group">
        <input type="text" id="login-email" class="form-control" placeholder="Title" required>
      </div>
      <div class="form-group">
        <input type="password" id="login-password" class="form-control" placeholder="Password" required>
      </div>
      <button type="submit" class="btn btn-secondary btn-block">Login</button>
    </form>
    <button type="button" class="btn btn-info btn-block" id="googleLogin">Login with Google</button>
    <button type="button" class="btn btn-primary btn-block" id="facebookLogin">Login with Facebook</button>

  </div>`;
  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = signin;

  const signInForm = divElemt.querySelector('#login-form');
  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signInForm['login-email'].value;
    const password = signInForm['login-password'].value;

    // Authenticate the User
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      // eslint-disable-next-line no-unused-vars
      .then((userCredential) => {
        // clear the form
        //  signUpForm.reset();
        // eslint-disable-next-line no-console
        console.log('Se agregó nuevo usuario en gmail');
        window.location.hash = '#/home';
      });
  });

  // GOOGLE
  const signInGoogle = divElemt.querySelector('#googleLogin');
  signInGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    // 1.
    const provider = new firebase.auth.GoogleAuthProvider();
    // 5.
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        //   const credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        //  const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        // Luego de autenticar ir al home
        window.location.hash = '#/home';
        // ...
        // eslint-disable-next-line no-console
        console.log(user);
      // eslint-disable-next-line no-unused-vars
      }).catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        //  const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // const credential = error.credential;
        // ...
      });
  });

  return divElemt;
};
