import React, { Component } from "react";
import openSocket from "socket.io-client";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getExerciseDetails } from "../../../../actions/exerciseActions";
import { getCurrentProgress } from "../../../../actions/progressActions";
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
import Chat from "./Chat";

import { Controlled as CodeMirror } from "react-codemirror2";

require("codemirror/lib/codemirror.css");
require("codemirror/addon/comment/comment");
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

require("codemirror/mode/clike/clike.js");
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
  },
  flex: {
    display: "flex"
  },
  codemirror: {
    fontSize: 16,
    width: "50%"
  },
  chat: {
    width: "50%"
  }
});

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      mode: "text/x-java",
      theme: "neat",
      user: this.props.auth.user.name,
      users: [],
      currentlyTyping: null,
      message: "",
      messages: [
        { user: "Affan", message: "Hello", room: "5da331f1f314a63454bb57fd" },
        {
          user: "Affan",
          message: "What are you doing",
          room: "5da331f1f314a63454bb57fd"
        },
        { user: "Mohammad", message: "Hi", room: "5da331f1f314a63454bb57fd" },
        {
          user: "Mohammad",
          message: "Trying to solve problem",
          room: "5da331f1f314a63454bb57fd"
        }
      ]
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
    socket.on("message", payload => this.setMessage(payload));
  }

  componentDidMount() {
    if (!this.props.progress.progress) {
      this.props.getCurrentProgress(
        this.props.match.params.studentid,
        this.props.match.params.exerciseid
      );
      this.props.getExerciseDetails(this.props.match.params.exerciseid);
    } else {
      const user = this.props.auth.user.name;
      sessionStorage.setItem("currentUser", user);
      const users = [...this.state.users, this.props.auth.user.name];
      socket.emit("room", {
        room: this.props.progress.progress._id,
        user: user
      });
      this.setState({ users: users });
    }
  }

  componentWillUnmount() {
    socket.emit("leave room", {
      room: this.props.progress.progress._id,
      user: this.props.auth.user.name
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.progress.progress) {
      const user = nextProps.currentUser;
      const users = [...this.state.users, user];
      socket.emit("room", {
        room: nextProps.progress.progress._id,
        user: user
      });
      this.setState({ users: users });
    }
  }

  sendUsersAndContent() {
    socket.emit("send users and content", {
      room: this.props.progress.progress._id,
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

  contentIsHappening = newContent => {
    this.updateContentForCurrentUser(newContent);
    this.updateCurrentlyTyping();
    socket.emit("coding event", {
      content: newContent,
      room: this.props.progress.progress._id,
      currentlyTyping: this.props.auth.user.name
    });
  };

  updateCurrentlyTyping() {
    this.setState({ currentlyTyping: this.props.auth.user.name });
  }

  changeMode(newMode) {
    this.updateModeInState(newMode);
    socket.emit("change mode", {
      mode: newMode,
      room: this.props.progress.progress._id
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
      room: this.props.progress.progress._id
    });
  }

  changeMessage = newMessage => {
    this.setState({ message: newMessage });
  };

  setMessage(payload) {
    console.log(payload);

    const combinedMessages = [...this.state.messages, payload];
    console.log(combinedMessages);
    this.setState({ messages: combinedMessages });
  }

  sendMessage = () => {
    if (this.state.message) {
      socket.emit("sendMessage", {
        user: this.props.auth.user.name,
        message: this.state.message,
        room: this.props.progress.progress._id
      });
    }
    this.setState({ message: "" });
  };

  render() {
    const { classes } = this.props;
    const { exercise } = this.props.exercise;
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
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      extraKeys: { "Ctrl-/": "toggleComment", "Ctrl-Space": "autocomplete" }
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
          <div className={classes.flex}>
            <CodeMirror
              className={classes.codemirror}
              value={this.state.content}
              options={option}
              onBeforeChange={(editor, data, value) => {
                this.setState({ content: value });
              }}
              onChange={(editor, data, value) => {
                this.contentIsHappening(value);
              }}
            />
            <Chat
              className={classes.chat}
              message={this.state.message}
              messages={this.state.messages}
              name={this.props.currentUser}
              changeMessage={this.changeMessage}
              sendMessage={this.sendMessage}
            />
          </div>
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

Progress.propTypes = {
  auth: PropTypes.object.isRequired,
  exercise: PropTypes.object.isRequired,
  progress: PropTypes.object.isRequired,
  getExerciseDetails: PropTypes.func.isRequired,
  getCurrentProgress: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    exercise: state.exercise,
    progress: state.progress,
    content: state.content,
    currentUser: sessionStorage.currentUser || state.auth.user.name
  };
};

export default connect(
  mapStateToProps,
  { getExerciseDetails, getCurrentProgress }
)(withRouter(withStyles(styles)(Progress)));
