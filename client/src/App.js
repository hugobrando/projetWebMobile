import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/Dashboard.js";
import { Login } from "./components/Login/Login.js";
import { Signup } from "./components/Signup/Signup.js";
import { PrivateRoute } from "./components/PrivateRoute.js";
import { Information } from "./components/Perso/Information.js"
import { CreatePost } from "./components/Post/CreatePost.js"
import { ShowPost } from "./components/Post/ShowPost.js"
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-content">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/post/:id" component={ShowPost} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/information" component={Information} />
            <PrivateRoute path="/createPost" component={CreatePost} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;