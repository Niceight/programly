import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./Components/theme/Theme";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {
  Root,
  Header,
  Nav,
  Content,
  Footer,
  config
} from "./Components/Layout";
import {
  LoginLecturer,
  RegisterLecturer,
  LoginStudent,
  RegisterStudent
} from "./Components/auth";
import {
  DashboardLecturer,
  LinkDashboard as LinkLecturer
} from "./Components/dashboard/lecturer";
import {
  DashboardStudent,
  LinkDashboard as LinkStudent
} from "./Components/dashboard/student";
import {
  Landing,
  ButtonLecturer,
  ButtonStudents,
  LinkProgramly
} from "./Components/landing";
import LogoutButton from "./Components/common/LogoutButton";
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
              <Root config={config} style={{ minHeight: "100vh" }}>
                <CssBaseline />
                <Header
                  menuIcon={{
                    inactive: <MenuIcon />,
                    active: <ChevronLeftIcon />
                  }}
                >
                  <Route exact path="/" component={LinkProgramly} />
                  <Route path="/students/dashboard" component={LinkStudent} />
                  <Route path="/lecturers/dashboard" component={LinkLecturer} />

                  <Route
                    path={["/lecturers/dashboard", "/students/dashboard"]}
                    component={LogoutButton}
                  />
                  <Route
                    exact
                    path={[
                      "/",
                      "/lecturers/login",
                      "/lecturers/register",
                      "/students/login",
                      "/students/register"
                    ]}
                    component={ButtonStudents}
                  />
                  <Route
                    exact
                    path={[
                      "/",
                      "/lecturers/login",
                      "/lecturers/register",
                      "/students/login",
                      "/students/register"
                    ]}
                    component={ButtonLecturer}
                  />
                </Header>
                <Nav
                  collapsedIcon={{
                    inactive: <ChevronLeftIcon />,
                    active: <ChevronRightIcon />
                  }}
                  header={
                    // you can provide fixed header inside nav
                    // change null to some react element
                    ctx => null
                  }
                >
                  {/* nav goes here */}
                </Nav>
                <Content>
                  <Route exact path="/" component={Landing} />
                  <Route path="/lecturers/login" component={LoginLecturer} />
                  <Route
                    path="/lecturers/register"
                    component={RegisterLecturer}
                  />
                  <Route path="/students/login" component={LoginStudent} />
                  <Route
                    path="/students/register"
                    component={RegisterStudent}
                  />
                  <Route
                    path="/lecturers/dashboard"
                    component={DashboardLecturer}
                  />
                  <Route
                    path="/students/dashboard"
                    component={DashboardStudent}
                  />
                </Content>
                <Footer>{/* footer goes here */}</Footer>
              </Root>
            </ThemeProvider>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
