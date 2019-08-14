import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AppBar, Landing, Footer } from "./Components/Layout";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AppBar />
          <Landing />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
