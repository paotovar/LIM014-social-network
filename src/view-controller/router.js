import { components } from '../view/index.js';

export const changeTmp = (hash) => {
  const id = hash.split('/')[1];
  const sectionMain = document.getElementById('container');
  sectionMain.innerHTML = '';
  // console.log(hash);
  // console.log(id);
  // console.log(components.SignUp());
  switch (hash) {
    case '':
    case '#':
    case '#/home':
    { return sectionMain.appendChild(components.home()); }
    case '#/SignUp':
    { return sectionMain.appendChild(components.SignUp()); }
    case '#/SignIn':
    { return sectionMain.appendChild(components.SignIn()); }
    case '#/Otros':
    { return sectionMain.appendChild(components[id]()); }

    default:
      return sectionMain.appendChild(components.home());
  }
};
