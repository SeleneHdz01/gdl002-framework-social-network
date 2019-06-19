import app from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};
class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
  }
  //Auth API (Interfaz de Autenticación para componentes React que se conectaran a la API de FIrebase).
  doCreateUserWhitEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  //Función de Inicio de Sesión
  doSignInWhithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email.password);
  //Si no se autentica ningun usuario, no ocurrirá nada
  doSignOut = () => this.auth.signOut();
  //Dos métodos de autenticación más para restablecer y cambiar una contraseña para un usuario autenticado
  doPasswordReset = email => this.auth.sendPasswordReserEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
