import React, { Component } from "react";
import openSocket from "socket.io-client";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateCodeSnippet,
  sendMessages
} from "../../../../actions/progressActions";
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

const socket = openSocket();

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
      codeSnippet: this.props.codeSnippetAnswer,
      mode: "text/x-java",
      theme: "neat",
      users: [],
      currentlyTyping: null,
      message: "",
      messages: this.props.messages
    };
    socket.on("receive code", payload => this.updateCodeInState(payload));
    socket.on("receive change mode", newMode =>
      this.updateModeInState(newMode)
    );
    socket.on("new user join", users => this.joinUser(users));
    socket.on("load users and code", () => this.sendUsersAndCode());
    socket.on("receive users and code", payload =>
      this.updateUsersAndCodeInState(payload)
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

  sendUsersAndCode() {
    socket.emit("send users and code", {
      room: this.props.room,
      users: this.state.users,
      codeSnippet: this.state.codeSnippet
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

  updateCodeInState(payload) {
    this.setState({
      codeSnippet: payload.codeSnippet,
      currentlyTyping: payload.currentlyTyping
    });
  }

  updateCodeForCurrentUser(newCodeSnippet) {
    this.setState({
      codeSnippet: newCodeSnippet
    });
  }

  updateModeInState(newMode) {
    this.setState({
      mode: newMode
    });
  }

  updateUsersAndCodeInState(payload) {
    const combinedUsers = this.state.users.concat(payload.users);
    const newUsers = Array.from(new Set(combinedUsers));
    const cleanUsers = newUsers.filter(user => {
      return user.length > 1;
    });
    this.setState({ users: cleanUsers, codeSnippet: payload.codeSnippet });
  }

  codeIsHappening = newCodeSnippet => {
    this.updateCodeForCurrentUser(newCodeSnippet);
    this.updateCurrentlyTyping();

    const updateCode = {
      codeSnippet: newCodeSnippet,
      room: this.props.room
    };
    this.props.updateCodeSnippet(updateCode);

    socket.emit("coding event", {
      codeSnippet: newCodeSnippet,
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

    const sendMessagesData = {
      room: this.props.room,
      messages: combinedMessages
    };
    this.props.sendMessages(sendMessagesData);

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
                value={this.state.codeSnippet}
                options={option}
                onBeforeChange={(editor, data, value) => {
                  this.codeIsHappening(value);
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
  progress: PropTypes.object.isRequired,
  updateCodeSnippet: PropTypes.func.isRequired,
  sendMessages: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    progress: state.progress,
    currentUser: sessionStorage.currentUser || state.auth.user.name
  };
};

export default connect(mapStateToProps, { updateCodeSnippet, sendMessages })(
  withRouter(withStyles(styles)(CollaborateItem))
);
