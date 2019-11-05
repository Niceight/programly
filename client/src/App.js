import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import store from "./store";
import PrivateRoute from "./Components/common/PrivateRoute";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import CssBaseline from "@material-ui/core/CssBaseline";
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
  LinkDashboard as LinkLecturer,
  ListDrawerLecturer,
  CreateExercise,
  Exercises,
  EditExercise,
  Classrooms,
  CreateClassroom,
  EditClassroom
} from "./Components/dashboard/lecturer";
import {
  DashboardStudent,
  LinkDashboard as LinkStudent,
  ListDrawerStudent,
  JoinClassroom,
  MyClassrooms,
  Classroom,
  Students,
  Student,
  Progress,
  Collaborate
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
      <SnackbarProvider preventDuplicate>
        <Provider store={store}>
          <Router>
            <div className="App">
              <Root config={config} style={{ minHeight: "100vh" }}>
                <CssBaseline />
                <Header
                  menuIcon={{
                    inactive: <MenuIcon />,
                    active: <ChevronLeftIcon />
                  }}
                >
                  <Route
                    exact
                    path={[
                      "/",
                      "/lecturers/login",
                      "/lecturers/register",
                      "/students/login",
                      "/students/register"
                    ]}
                    component={LinkProgramly}
                  />

                  <Switch>
                    <PrivateRoute
                      path={[
                        "/students/dashboard",
                        "/classrooms/join-classroom",
                        "/myClassrooms/:id",
                        "/myClassrooms/classroom/:id",
                        "/myClassrooms/classroom/students/:id",
                        "/myClassrooms/classroom/student/classroomid/:studentid",
                        "/myClassrooms/classroom/progress/:studentid/:exerciseid",
                        "/myClassrooms/classroom/collaborate/:progressid/:exerciseid"
                      ]}
                      component={LinkStudent}
                    />
                    <PrivateRoute
                      path={[
                        "/lecturers/dashboard",
                        "/exercises/new-exercise",
                        "/exercises/:id",
                        "/classrooms/new-classroom",
                        "/classrooms/:id"
                      ]}
                      component={LinkLecturer}
                    />
                  </Switch>

                  <Route
                    path={[
                      "/lecturers/dashboard",
                      "/exercises/new-exercise",
                      "/exercises/:id",
                      "/classrooms/new-classroom",
                      "/classrooms/:id",
                      "/students/dashboard",
                      "/myClassrooms/:id",
                      "/myClassrooms/classroom/:id",
                      "/myClassrooms/classroom/students/:id",
                      "/myClassrooms/classroom/student/classroomid/:studentid",
                      "/myClassrooms/classroom/progress/:studentid/:exerciseid",
                      "/myClassrooms/classroom/collaborate/:progressid/:exerciseid"
                    ]}
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
                  <Switch>
                    <PrivateRoute
                      path={[
                        "/students/dashboard",
                        "/classrooms/join-classroom",
                        "/myClassrooms/:id",
                        "/myClassrooms/classroom/:id",
                        "/myClassrooms/classroom/students/:id",
                        "/myClassrooms/classroom/student/classroomid/:studentid",
                        "/myClassrooms/classroom/progress/:studentid/:exerciseid",
                        "/myClassrooms/classroom/collaborate/:progressid/:exerciseid"
                      ]}
                      component={ListDrawerStudent}
                    />
                    <PrivateRoute
                      path={[
                        "/lecturers/dashboard",
                        "/exercises/new-exercise",
                        "/exercises/:id",
                        "/classrooms/new-classroom",
                        "/classrooms/:id"
                      ]}
                      component={ListDrawerLecturer}
                    />
                  </Switch>
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
                  <Switch>
                    <PrivateRoute
                      path="/lecturers/dashboard"
                      component={DashboardLecturer}
                    />
                    <PrivateRoute
                      path="/exercises/new-exercise"
                      component={CreateExercise}
                    />
                    <PrivateRoute
                      path="/exercises/:lecturerID/:exerciseID"
                      component={EditExercise}
                    />
                    <PrivateRoute
                      path="/classrooms/new-classroom"
                      component={CreateClassroom}
                    />
                    <PrivateRoute
                      path="/classrooms/:lecturerID/:classroomID"
                      component={EditClassroom}
                    />
                    <PrivateRoute path="/exercises/:id" component={Exercises} />
                    <PrivateRoute
                      path="/classrooms/join-classroom"
                      component={JoinClassroom}
                    />
                    <PrivateRoute
                      path="/classrooms/:id"
                      component={Classrooms}
                    />
                    <PrivateRoute
                      exact
                      path="/students/dashboard"
                      component={DashboardStudent}
                    />
                    <PrivateRoute
                      path="/classrooms/join-classroom"
                      component={JoinClassroom}
                    />
                    <PrivateRoute
                      path="/myClassrooms/classroom/progress/:studentid/:exerciseid"
                      component={Progress}
                    />
                    <PrivateRoute
                      path="/myClassrooms/classroom/collaborate/:progressid/:exerciseid"
                      component={Collaborate}
                    />
                    <PrivateRoute
                      path="/myClassrooms/classroom/student/:classroomid/:studentid"
                      component={Student}
                    />
                    <PrivateRoute
                      path="/myClassrooms/classroom/students/:id"
                      component={Students}
                    />
                    <PrivateRoute
                      path="/myClassrooms/classroom/:id"
                      component={Classroom}
                    />
                    <PrivateRoute
                      path="/myClassrooms/:id"
                      component={MyClassrooms}
                    />
                  </Switch>
                </Content>
                <Footer>{/* footer goes here */}</Footer>
              </Root>
            </div>
          </Router>
        </Provider>
      </SnackbarProvider>
    );
  }
}

export default App;
