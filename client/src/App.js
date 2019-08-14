import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AppBar, Landing, Footer } from "./Components/Layout";
import {
  LoginLecturer,
  RegisterLecturer,
  LoginStudent,
  RegisterStudent
} from "./Components/auth";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AppBar />
          <Route exact path="/" component={Landing} />
          <Route path="/lecturers/login" component={LoginLecturer} />
          <Route path="/lecturers/register" component={RegisterLecturer} />
          <Route path="/students/login" component={LoginStudent} />
          <Route path="/students/register" component={RegisterStudent} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
