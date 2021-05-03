export default () => {
  const viewHome = `
  <p><input type="button" id="return" onclick="location.href='#/login';" value="Return"></p>
  <p><input type="text" id="FirstName" placeholder="First Name"></p>
  <p><input type="text" id="LastName" placeholder="Last Name"></p>
  <p><input type="email" id="Email" placeholder="Email"></p>
  <p><input type="password" id="txtPass" placeholder="Password"></p>
  <p><input type="button" id="SignUp" value="Sign Up"></p>
  `;

  const divElem = document.createElement('div');
  divElem.innerHTML = viewHome;

  return divElem;
};
