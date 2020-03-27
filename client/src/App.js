import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/Dashboard.js";
import { Login } from "./components/Login/Login.js";
import { Signup } from "./components/Signup/Signup.js";
import { PrivateRoute } from "./components/PrivateRoute.js";
import { AdminRoute } from "./components/AdminRoute.js";
import { Information } from "./components/Perso/Information.js"
import { CreatePost } from "./components/Post/CreatePost.js"
import { ShowPost } from "./components/Post/ShowPost.js"
import { Notification } from "./components/Notification/Notification.js"
import { MyPosts } from "./components/Post/MyPosts.js"
import { AdminPage } from "./components/Admin/AdminPage.js"
import { CreateCategorie } from "./components/Admin/CreateCategorie.js"

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-content">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/post/:id" component={ShowPost} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/information" component={Information} />
            <PrivateRoute path="/createPost" component={CreatePost} />
            <PrivateRoute path="/notification" component={Notification} />
            <PrivateRoute path="/myPosts" component={MyPosts} />
            <AdminRoute path="/adminPage" component={AdminPage} />
            <AdminRoute path="/createCategorie" component={CreateCategorie} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;