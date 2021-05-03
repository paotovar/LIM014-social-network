export default () => {
  const viewLogIn = `
    <p><input type="email" id="Email" placeholder="Email"></p>
    <p><input type="password" id="txtPass" placeholder="Password"></p>
    <p><input type="button" id="SignUp" value="Log In"></p>
    <h2>You don't have an account? <a href="#/signup">SIGN UP</a></h2>
    `;
  const divElem = document.createElement('div');
  divElem.innerHTML = viewLogIn;

  return divElem;
};
