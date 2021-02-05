import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";

import { auth, db } from "../firebase";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  username: "",
  error: null,
  showingAlert: false,
};

class PasswordChangeForm extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    const { username } = this.state;
    const { uid } = this.props;
    db.updateUserData(uid, username);

    event.preventDefault();
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
      showingAlert,
    } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      <div style={{ marginTop: "40px" }}>
        {showingAlert && (
          <Alert color="danger" onLoad={this.timer}>
            {error.message}
          </Alert>
        )}

        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="examplePassword2">Username</Label>
            <Input
              type="username"
              name="username"
              id="username"
              placeholder="User Name"
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

          <div className="text-center">
            <Button type="submit">Change My Password</Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default PasswordChangeForm;
