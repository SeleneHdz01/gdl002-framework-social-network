import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    //componentWillUnmoun: Activa la funcion de devolución de llamada cada vez que el usuario autenticado cambia.
    //authUser es el objeto o null dentro de esta función.
    //La función condition() pasada se ejecutacon authUser. Si la autorización falla,ejem (el suario autenticado es null),
    //el componente de orden superosredirige a la página de inicio de sesión.
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          this.props.history.push(ROUTES.SIGN_IN);
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      //   return <Component {...this.props} />;
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase
  )(WithAuthorization);
};

export default withAuthorization;
