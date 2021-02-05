import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import withAuthorization from "./withAuthorization";
import { db } from "../firebase";
import "./style.css";
class HomePage extends Component {
  state = {
    users: null,
    username: "",
    loading: true,
  };

  componentDidMount() {
    const { loggedUser } = this.props;
    db.doGetAnUnser(loggedUser.uid).then(res => {
      console.log("Res", res.val().url);
      this.setState({
        username: res.val().username,
        loading: false,
        url: res.val().url,
        title: res.val().title,
        description: res.val().description,
      });
    });
  }

  render() {
    const { users, username, loading, url, title, description } = this.state;
    return (
      <>
        <div className="background" id="parallax-bg" />
        <div className="card">
          <div className="cover-bg" />
          <div className="user-info-wrap">
            <div className="user-photo">
              <img src={url} alt="" />
            </div>
            <div className="user-info">
              <div className="user-name">{username}</div>
              <div className="user-title">{title}</div>
              <Link to={"/account"}>Update Profile</Link>
            </div>
          </div>
          <div className="user-bio">
            <h3>Description</h3>
            <p>{description}</p>

            <Link to={"./signin"}>Sign out</Link>
          </div>
        </div>
      </>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomePage); //grants authorization to open endpoint if an user is signed in
