import React from "react";

import { withAuthorization } from "../Session/session";

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>
      La página de inicio es accesible para el usuario que haya iniciado sesión.
    </p>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
