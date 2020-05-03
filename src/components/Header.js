import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <div className="flex pa1 justify-between nowrap orange">
        <div className="flex flex-fixed black items-center">
          <div className="fw7 mr1 flex items-center">
            <img
              src="https://news.ycombinator.com/y18.gif"
              style={{ border: "1px solid #fff" }}
              className="mr1"
              alt="logo"
            />
            <Link to="/" className="ml1 no-underline black">
              Hacker News
            </Link>
          </div>
          <Link to="/" className="ml1 no-underline black">
            new
          </Link>
          <div className="ml1">|</div>
          <Link to="/search" className="ml1 no-underline black">
            search
          </Link>
          {authToken && (
            <div className="flex">
              <div className="ml1">|</div>
              <Link to="/create" className="ml1 no-underline black">
                submit
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-fixed">
          {authToken ? (
            <div
              className="ml1 pointer black"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
                this.props.history.push("/");
              }}
            >
              logout
            </div>
          ) : (
            <Link to="/login" className="ml1 no-underline black">
              login
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
