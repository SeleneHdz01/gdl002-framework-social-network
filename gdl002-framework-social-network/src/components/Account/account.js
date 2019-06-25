import React from "react";

import { AuthUserContext } from "../Session/session";
import { PasswordForgetForm } from "../PasswordForget/passwordForget";
import PasswordChangeForm from "../PasswordChange/passwordChange";
import { withAuthorization } from "../Session/session";

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Tu cuenta: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
