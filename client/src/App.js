import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import "./include/css/bootstrap.css";
import "./include/css/bootstrap.min.css";

import Landing from './components/layout/Landing';
import Auth from "./containers/Auth";
import Resturant from "./containers/Resturant/index";
import Pages from "./containers/pages";
import Home from "./containers/Home/index";



// Check for token to keep user logged in
if (localStorage.jwtToken && localStorage.jwtToken!="Bearer undefined" && localStorage.jwtToken!="undefined") {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing } />s
            <Route exact = {false} path="/home" component={Home} />
            <Route exact = {false} path="/auth" component={Auth} />
            <Route exact = {false} path="/pages" component={Pages} />
            <Route exact = {false} path="/resturant" component={Resturant} />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
