import React, { Component } from "react";
import openSocket from "socket.io-client";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import ExerciseItem from "./ExerciseItem";
import UserList from "./UserList";
import ModeSelect from "./ModeSelect";
import ThemeSelect from "./ThemeSelect";
import Chat from "./Chat";

import { Controlled as CodeMirror } from "react-codemirror2";

require("codemirror/lib/codemirror.css");
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
require("codemirror/mode/python/python.js");
require("codemirror/mode/php/php.js");

const socket = openSocket("http://localhost:5000");

const styles = theme => ({
  "@global": {
    body: {
      background: theme.palette.common.white
    }
  },
  root: {
    padding: theme.spacing(3, 2)
  },
  flex: {
    display: "flex"
  },
  flexReverse: {
    display: "flex",
    flexDirection: "row-reverse"
  },
  codemirror: {
    fontSize: 16,
    width: "50%",
    paddingRight: 5
  },
  chat: {
    width: "50%",
    paddingLeft: 5
  }
});

class CollaborateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      mode: "text/x-java",
      theme: "neat",
      users: [],
      currentlyTyping: null,
      message: "",
      messages: []
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
    socket.on("receiveMessage", payload => this.setMessage(payload));
  }

  componentDidMount() {
    const user = this.props.auth.user.name;
    sessionStorage.setItem("currentUser", user);
    const users = [...this.state.users, this.props.auth.user.name];
    socket.emit("room", {
      room: this.props.room,
      user: user
    });
    this.setState({ users: users });
  }

  componentWillUnmount() {
    socket.emit("leave room", {
      room: this.props.room,
      user: this.props.auth.user.name
    });
  }

  sendUsersAndContent() {
    socket.emit("send users and content", {
      room: this.props.room,
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
      room: this.props.room,
      currentlyTyping: this.props.currentUser
    });
  };

  updateCurrentlyTyping() {
    this.setState({ currentlyTyping: this.props.currentUser });
  }

  changeMode(newMode) {
    this.updateModeInState(newMode);
    socket.emit("change mode", {
      mode: newMode,
      room: this.props.room
    });
  }

  changeTheme(newTheme) {
    this.setState({ theme: newTheme });
  }

  changeMessage = newMessage => {
    this.setState({ message: newMessage });
  };

  setMessage(payload) {
    const combinedMessages = [...this.state.messages, payload];
    this.setState({ messages: combinedMessages });
  }

  sendMessage = () => {
    let payload = {
      user: this.props.auth.user.name,
      message: this.state.message,
      room: this.props.room
    };
    this.setMessage(payload);
    if (this.state.message) {
      socket.emit("sendMessage", payload);
    }
    this.setState({ message: "" });
  };

  render() {
    const { classes } = this.props;

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
        <ExerciseItem id={this.props.match.params.exerciseid} />
        <div className={classes.root}>
          <Divider />
          <UserList
            users={this.state.users}
            currentlyTyping={this.state.currentlyTyping}
          />
          <Divider />
          <div className={classes.flexReverse}>
            <ModeSelect
              mode={this.state.mode}
              changeMode={this.changeMode.bind(this)}
            />
            <ThemeSelect
              theme={this.state.theme}
              changeTheme={this.changeTheme.bind(this)}
            />
          </div>
          <div className={classes.flex}>
            <div className={classes.codemirror}>
              <CodeMirror
                value={this.state.content}
                options={option}
                onBeforeChange={(editor, data, value) => {
                  this.contentIsHappening(value);
                }}
              />
            </div>
            <div className={classes.chat}>
              <Chat
                message={this.state.message}
                messages={this.state.messages}
                name={this.props.currentUser}
                changeMessage={this.changeMessage}
                sendMessage={this.sendMessage}
              />
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

CollaborateItem.propTypes = {
  auth: PropTypes.object.isRequired,
  progress: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    progress: state.progress,
    currentUser: sessionStorage.currentUser || state.auth.user.name
  };
};

export default connect(
  mapStateToProps,
  {}
)(withRouter(withStyles(styles)(CollaborateItem)));
