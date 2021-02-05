import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  FormText,
} from "reactstrap";

import * as routes from "../constants/routes";
import { auth, db } from "../firebase";

const SignUpPage = ({ history }) => (
  <section>
    <div class="container active">
      <div class="user signupBx">
        <div class="formBx">
          {/* <h1 className="centered">Sign Up</h1> */}
          <SignUpForm history={history} />
        </div>
        <div class="imgBx">
          <img
            src="https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?cs=srgb&dl=pexels-pixabay-416809.jpg&fm=jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  </section>
);

//################### Sign Up Form ###################
const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  description: "",
  passwordTwo: "",
  profilePicture: "",
  title: "",
  error: null,
  showingAlert: false,
};

//A Higher order function with prop name as key and the value to be assigned to
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  //defining state
  state = {
    ...INITIAL_STATE,
  };

  onSubmit = event => {
    const {
      username,
      email,
      passwordOne,
      description,
      title,
      profilePicture,
    } = this.state;
    const { history } = this.props;
    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      //it the above functions resolves, reset the state to its initial state values, otherwise, set the error object
      .then(authUser => {
        //creating a user in the database after the sign up through Firebase auth API

        db.uploadImageFile(
          authUser.user.uid,
          username,
          email,
          description,
          profilePicture,
          title
        );
      })
      .then(history.push(routes.HOME))
      .catch(err => {
        this.setState(byPropKey("error", err));
        this.timer(); //show alert message for some seconds
      });
    event.preventDefault(); //prevents refreshing
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
    const {
      username,
      email,
      description,
      profilePicture,
      passwordOne,
      passwordTwo,
      error,
      showingAlert,
      title,
    } = this.state;
    //a boolen to perform validation
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "" ||
      profilePicture === "" ||
      title === "" ||
      description === "";

    return (
      <>
        {showingAlert && (
          <Alert color="danger" onLoad={this.timer}>
            {error.message}
          </Alert>
        )}
        <Form onSubmit={this.onSubmit}>
          <h2>Create an account</h2>

          <FormGroup>
            {/* <Label for="userName">Full Name</Label> */}
            <Input
              type="username"
              name="username"
              id="userName"
              placeholder="John Doe"
              value={username}
              onChange={e =>
                this.setState(byPropKey("username", e.target.value))
              }
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="user@gmail.com"
              value={email}
              onChange={e => this.setState(byPropKey("email", e.target.value))}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              id="examplePassword1"
              placeholder="Password"
              value={passwordOne}
              onChange={e =>
                this.setState(byPropKey("passwordOne", e.target.value))
              }
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              id="examplePassword2"
              placeholder="Confirm Password"
              value={passwordTwo}
              onChange={e =>
                this.setState(byPropKey("passwordTwo", e.target.value))
              }
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleSelect">Select Your Profile</Label>
            <Input
              type="select"
              name="title"
              id="title"
              onChange={e => this.setState(byPropKey("title", e.target.value))}
            >
              <option>Member</option>
              <option>Personal Trainer</option>
              <option>General Trainer</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Input
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              id="profilePicture"
              placeholder="Profile Picture"
              name="profilePicture"
              onChange={e =>
                this.setState(byPropKey("profilePicture", e.target.files[0]))
              }
            />
            <FormText color="muted">Upload your profile picture here</FormText>
          </FormGroup>
          <FormGroup>
            <Input
              type="textarea"
              name="description"
              id="description"
              placeholder="Enter your description here"
              onChange={e =>
                this.setState(byPropKey("description", e.target.value))
              }
            />
          </FormGroup>
          <input type="submit" name="" value="Sign Up" />
          <p className="signup">
            ALREADY HAVE AN ACCOUNT ? <Link to={routes.SIGN_IN}>Sign In</Link>
          </p>
        </Form>
      </>
    );
  }
}

//################### Sign Up Link ###################
//used in the sign in when the user don't have an account registered yet
const SignUpLink = () => (
  <p className="signup">
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignInLink = () => (
  <p className="signup">
    ALREADY HAVE AN ACCOUNT ? <Link to={routes.SIGN_UP}>Sign In</Link>
  </p>
);

//exports
export default withRouter(SignUpPage); //using a HoC to get access to history
export { SignUpForm, SignUpLink, SignInLink };
