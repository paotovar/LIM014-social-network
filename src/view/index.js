// import Accessories from './ accessories.js';
import signUp from './SignUp.js';
import signIn from './SignIn.js';
import home from './home.js';

// import Places from './places.js';
// import Different from './404.js';

const components = {
//   accesorios: Accessories,
  home,
  SignUp: signUp,
  SignIn: signIn,
  // SignIn: login,
//   lugares: Places,
//   different: Different,
};

export { components };
