import React, { Component } from "react";
import openSocket from "socket.io-client";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getExerciseDetails } from "../../../../actions/exerciseActions";
import { getProgressByID } from "../../../../actions/progressActions";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "../../../common/CircularProgress";
import UserList from "./UserList";
import ModeSelect from "./ModeSelect";
import ThemeSelect from "./ThemeSelect";
import Codemirror from "react-codemirror";

require("codemirror/lib/codemirror.css");
require("codemirror/mode/clike/clike.js");
require("codemirror/theme/neat.css");
require("codemirror/theme/monokai.css");
require("codemirror/theme/bespin.css");
require("codemirror/theme/3024-day.css");
require("codemirror/theme/3024-night.css");
require("codemirror/theme/cobalt.css");
require("codemirror/theme/eclipse.css");
require("codemirror/theme/dracula.css");
require("codemirror/theme/isotope.css");
require("codemirror/theme/duotone-light.css");
require("codemirror/theme/icecoder.css");
require("codemirror/theme/material.css");
require("codemirror/theme/midnight.css");
require("codemirror/theme/solarized.css");

require("codemirror/mode/javascript/javascript.js");
require("codemirror/mode/ruby/ruby.js");
require("codemirror/mode/swift/swift.js");
require("codemirror/mode/clojure/clojure.js");
require("codemirror/mode/python/python.js");
require("codemirror/mode/php/php.js");
require("codemirror/mode/erlang/erlang.js");
require("codemirror/mode/coffeescript/coffeescript.js");
require("codemirror/mode/crystal/crystal.js");

const socket = openSocket("http://localhost:5000");

const styles = theme => ({
  "@global": {
    body: {
      background: "white"
    }
  },
  root: {
    padding: theme.spacing(3, 2)
  },
  button: {
    margin: theme.spacing(1)
  }
});

class Collaborate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      mode: "text/x-java",
      theme: "neat",
      users: [],
      currentlyTyping: null
    };
    socket.on("receive content", payload => this.updateContentInState(payload));
    socket.on("receive change mode", newMode =>
      this.updateModeInState(newMode)
    );
    socket.on("new user join", users => this.joinUser(users));
    socket.on("load users and content", () => this.sendUsersAndContent());
    socket.on("receive users and content", payload =>
      this.updateUsersAndContentInState(payload)
    );
    socket.on("user left room", user => this.removeUser(user));
  }

  componentDidMount() {
    this.props.getExerciseDetails(this.props.match.params.exerciseid);
    this.props.getProgressByID(this.props.match.params.progressid);

    const user = this.props.auth.user.name;
    sessionStorage.setItem("currentUser", user);
    const users = [...this.state.users, this.props.auth.user.name];
    socket.emit("room", {
      room: this.props.match.params.progressid,
      user: user
    });
    this.setState({ users: users });
  }

  componentWillUnmount() {
    socket.emit("leave room", {
      room: this.props.match.params.progressid,
      user: this.props.currentUser
    });
  }

  //   static getDerivedStateFromProps(props, state) {
  //     const user = props.currentUser;
  //     const users = [...state.users, user];
  //     socket.emit("room", {
  //       room: props.match.params.progressid,
  //       user: user
  //     });
  //     this.setState({ users: users });
  //   }

  componentWillReceiveProps(nextProps) {
    const user = nextProps.currentUser;
    const users = [...this.state.users, user];
    socket.emit("room", {
      room: nextProps.match.params.progressid,
      user: user
    });
    this.setState({ users: users });
  }

  sendUsersAndContent() {
    socket.emit("send users and content", {
      room: this.props.match.params.progressid,
      users: this.state.users,
      content: this.state.content
    });
  }

  removeUser(user) {
    const newUsers = Object.assign([], this.state.users);
    const indexOfUserToDelete = this.state.users.findIndex(Olduser => {
      return Olduser === user.user;
    });
    newUsers.splice(indexOfUserToDelete, 1);
    this.setState({ users: newUsers });
  }

  joinUser(user) {
    const combinedUsers = [...this.state.users, user];
    const newUsers = Array.from(new Set(combinedUsers));
    const cleanUsers = newUsers.filter(user => {
      return user.length > 1;
    });
    this.setState({ users: cleanUsers });
  }

  updateContentInState(payload) {
    this.setState({
      content: payload.content,
      currentlyTyping: payload.currentlyTyping
    });
  }

  updateContentForCurrentUser(newContent) {
    this.setState({
      content: newContent
    });
  }

  updateModeInState(newMode) {
    this.setState({
      mode: newMode
    });
  }

  updateUsersAndContentInState(payload) {
    const combinedUsers = this.state.users.concat(payload.users);
    const newUsers = Array.from(new Set(combinedUsers));
    const cleanUsers = newUsers.filter(user => {
      return user.length > 1;
    });
    this.setState({ users: cleanUsers, content: payload.content });
  }

  contentIsHappening(newContent) {
    console.log("here");

    this.updateContentForCurrentUser(newContent);
    this.updateCurrentlyTyping();
    socket.emit("coding event", {
      content: newContent,
      room: this.props.match.params.progressid,
      currentlyTyping: this.props.currentUser
    });
  }

  updateCurrentlyTyping() {
    this.setState({ currentlyTyping: this.props.currentUser });
  }

  changeMode(newMode) {
    this.updateModeInState(newMode);
    socket.emit("change mode", {
      mode: newMode,
      room: this.props.match.params.progressid
    });
  }

  changeTheme(newTheme) {
    this.setState({ theme: newTheme });
  }

  clearContent(e) {
    e.preventDefault();
    this.setState({ content: "" });
    socket.emit("coding event", {
      content: "",
      room: this.props.match.params.progressid
    });
  }

  render() {
    const { classes } = this.props;
    const { exercise, loading } = this.props.exercise;
    const { progress } = this.props.progress;
    let exerciseData;

    if (exercise === null && progress === null) {
      exerciseData = <CircularProgress />;
    } else if (exercise !== null && progress !== null) {
      if (exercise && progress) {
        exerciseData = (
          <div className={classes.root}>
            <Typography variant="h5" component="h2">
              {exercise.data.topicName}
            </Typography>
            <br />
            <Divider />
            <br />
            <Typography component="p">{exercise.data.question}</Typography>
          </div>
        );
      } else {
        exerciseData = <h4>No exercises found...</h4>;
      }
    }

    const option = {
      mode: this.state.mode,
      theme: this.state.theme,
      lineNumbers: true
    };
    return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        {exerciseData}
        {this.state.progress}
        <div className={classes.root}>
          <Divider />
          <UserList
            users={this.state.users}
            currentlyTyping={this.state.currentlyTyping}
          />
          <Divider />
          <ModeSelect
            mode={this.state.mode}
            changeMode={this.changeMode.bind(this)}
          />

          <ThemeSelect
            theme={this.state.theme}
            changeTheme={this.changeTheme.bind(this)}
          />

          <Codemirror
            value={this.state.content}
            onChange={this.contentIsHappening.bind(this)}
            options={option}
          />
        </div>
        <Button
          onClick={this.clearContent.bind(this)}
          className={classes.button}
        >
          clear code
        </Button>
      </Container>
    );
  }
}

Collaborate.propTypes = {
  auth: PropTypes.object.isRequired,
  exercise: PropTypes.object.isRequired,
  progress: PropTypes.object.isRequired,
  getExerciseDetails: PropTypes.func.isRequired,
  getProgressByID: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    exercise: state.exercise,
    progress: state.progress,
    currentUser: sessionStorage.currentUser || state.auth.user.name
  };
};

export default connect(
  mapStateToProps,
  { getExerciseDetails, getProgressByID }
)(withRouter(withStyles(styles)(Collaborate)));
