import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

import * as routes from "../constants/routes";

//nav stuff
import LandingPage from "./Landing";
import SignUpPage from "./SignUp";
import SignInPage from "./SignIn";
import PasswordForgetPage from "./PasswordForget";
import HomePage from "./Home";
import AccountPage from "./Account";

import withAuthentication from "./withAuthentication";

const App = () => (
  <BrowserRouter>
    <>
      {/* <Navigation /> */}

      <Route exact path={routes.LANDING} component={LandingPage} />
      <Route exact path={routes.SIGN_UP} component={SignUpPage} />
      <Route exact path={routes.SIGN_IN} component={SignInPage} />
      <Route
        exact
        path={routes.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route exact path={routes.HOME} component={HomePage} />
      <Route exact path={routes.ACCOUNT} component={AccountPage} />
    </>
  </BrowserRouter>
);

export default withAuthentication(App); //using HoC to handle session
