import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./Components/theme/Theme";
import { AppBar, Landing, Footer } from "./Components/layout";
import {
  LoginLecturer,
  RegisterLecturer,
  LoginStudent,
  RegisterStudent
} from "./Components/auth";
import Dashboard from "./Components/dashboard/lecturer/Dashboard";
import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <ThemeProvider theme={theme}>
              <AppBar />
              <Route exact path="/" component={Landing} />
              <Route path="/lecturers/login" component={LoginLecturer} />
              <Route path="/lecturers/register" component={RegisterLecturer} />
              <Route path="/students/login" component={LoginStudent} />
              <Route path="/students/register" component={RegisterStudent} />
              <Route path="/dashboard" component={Dashboard} />
              <Footer />
            </ThemeProvider>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
