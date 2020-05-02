import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Header extends Component {
  render() {
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
            <span>Hacker News</span>
          </div>
          <Link to="/" className="ml1 no-underline black">
            new
          </Link>
          <div className="ml1">|</div>
          <Link to="/create" className="ml1 no-underline black">
            submit
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
