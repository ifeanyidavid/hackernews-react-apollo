import React from "react";
import { Switch, Route } from "react-router";
import "../styles/App.css";
import LinkList from "./LinkList";
import CreateLink from "./CreateLink";
import Header from "./Header";
import Login from "./Login";

function App() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={LinkList}></Route>
          <Route exact path="/create" component={CreateLink}></Route>
          <Route exact path="/login" component={Login}></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
