import { components } from '../view/index.js';

const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '':
    { return container.appendChild(components.login()); }
    case '#/':
    { return container.appendChild(components.login()); }
    case '#/login':
    { return container.appendChild(components.login()); }
    case '#/signup':
    { return container.appendChild(components.signup()); }
    default:
      break;
  }
  console.log(route);
  return 1;
};
export { changeView };
