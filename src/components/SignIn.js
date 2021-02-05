import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { FacebookLoginButton } from "react-social-login-buttons";
import logo from "./logo.svg";

import { withRouter } from "react-router-dom";

import { SignUpLink } from "./SignUp";
import { PasswordForgetLink } from "./PasswordForget";
import { auth, db } from "../firebase";
import * as routes from "../constants/routes";

const SignInPage = ({ history }) => {
  return (
    <section>
      <div class="container">
        <div class="user signinBx">
          <div class="imgBx">
            <img
              src="https://images.pexels.com/photos/2628215/pexels-photo-2628215.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
            />
          </div>
          <SignInForm history={history} />
        </div>
      </div>
    </section>
  );
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
  showingAlert: false,
};

class SignInForm extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
        this.timer(); //defined below
      });

    event.preventDefault();
  };

  facebookLogin = () => {
    const { history } = this.props;
    auth
      .doFacebookSignIn()
      .then(authUser => {
        console.log("authUser", authUser);

        db.doCreateUser(
          //store some info from facebook into the firebase db
          authUser.user.uid,
          authUser.user.displayName,
          authUser.user.email
        )
          .then(() => {
            history.push(routes.HOME); //redirects to Home Page
          })
          .catch(error => {
            this.setState(byPropKey("error", error));
          });
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });
  };

  timer = () => {
    this.setState({
      showingAlert: true,
    });

    setTimeout(() => {
      this.setState({
        showingAlert: false,
      });
    }, 4000);
  };

  render() {
    const { email, password, error, showingAlert } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <>
        {showingAlert && (
          <Alert color="danger" onLoad={this.timer}>
            {error.message}
          </Alert>
        )}
        <div class="formBx">
          <Form onSubmit={this.onSubmit}>
            <h2>Sign In</h2>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Username"
              value={email}
              onChange={event =>
                this.setState(byPropKey("email", event.target.value))
              }
            />

            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Password"
              value={password}
              onChange={event =>
                this.setState(byPropKey("password", event.target.value))
              }
            />

            <input type="submit" name="" value="Login" />
            <SignUpLink />
          </Form>
        </div>
      </>
    );
  }
}

export default withRouter(SignInPage);

export { SignInForm };
