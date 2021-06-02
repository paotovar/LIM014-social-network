import {
  logIn,
  googleSignIn,
  verifEmail,
  logOut,

} from '../src/model/firebase_auth.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
);
// Función signIn
describe('función logIn', () => {
  it('Deberia ser una función', () => {
    expect(typeof logIn).toBe('function');
  });
  it('Debería poder iniciar sesion', () => logIn('mp9108966@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('mp9108966@gmail.com');
    }));
});

// Función emailVerification
describe('función verifEmail', () => {
  it('Deberia ser una función', () => {
    expect(typeof verifEmail).toBe('function');
  });
  it('Debería enviar un email de verificación', () => {
    const verificationMock = jest.fn();
    firebase.auth().currentUser.sendEmailVerification = verificationMock;
    verifEmail();
    expect(verificationMock).toHaveBeenCalled();
    expect(verificationMock.mock.calls).toHaveLength(1);
  });
});

// Función Google
describe('googleSignIn', () => {
  it('debería ser una función', () => {
    expect(typeof googleSignIn).toBe('function');
  });
  it('debería poder ingresar con Google', () => {
    googleSignIn('ptovargavilan@gmail.com')
      .then((user) => {
        expect(user.email).toBe('ptovargavilan@gmail.com');
      });
  });
});
// Función logOut
describe('función logOut', () => {
  it('Deberia ser una función', () => {
    expect(typeof logOut).toBe('function');
  });
  it('Debería poder salir de la  sesion', () => logOut()
    .then((user) => {
      expect(user).toBe(undefined);
    }));
});
