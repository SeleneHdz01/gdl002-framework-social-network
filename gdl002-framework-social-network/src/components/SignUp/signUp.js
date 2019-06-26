import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        //Creando usuario en Realtime database.
        //Se crea un usuario en la BD de autenticación interna de Firebase que tiene acceso limitado.
        //Si es así, crea usuario en la BD en Realtime Database que es accesible.
        //Para crear usuario usa identificador(uid)del usuario de la BD, luego el método set()
        //para proporcionar datos para esta entidadque se asigna a usuarios "uid".
        //Por último se puede usar "username" para dar información adicional acerca de un usuario.
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email
        });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Nombre"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Dirección de correo"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Contraseña"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirma tu contraseña"
        />
        <button disabled={isInvalid} type="submit">
          Registrar
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
const SignUpLink = () => (
  <p>
    ¿No tienes una cuenta? <Link to={ROUTES.SIGN_UP}>Regístrate</Link>
  </p>
);
//Función de anidamiento (paracomponentes de orden superior) para comunicarse entre sí.
//"Compose" aplica a los componentesde orden superios de derecha a izquierda
const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

// const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUpPage;
export { SignUpForm, SignUpLink };
