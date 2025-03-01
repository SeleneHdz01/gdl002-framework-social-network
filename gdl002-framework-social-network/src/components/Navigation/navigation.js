import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut/signOut";
import * as ROUTES from "../../constants/routes";

import { AuthUserContext } from "../Session/session";

// const Navigation = ({ authUser }) => (
//   <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
// );

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);
const NavigationAuth = () => (
  <ul>
    {/* <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li> */}
    <li>
      <Link to={ROUTES.LANDING}>Página de destino</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>

    <li>
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </li>

    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Bienvenid@</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Inicia Sesión</Link>
    </li>
  </ul>
);

export default Navigation;
