import React, { Component } from "react";
import openSocket from "socket.io-client";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const socket = openSocket();

const styles = {
  root: {
    margin: 16,
    alignItems: "middle"
  },
  button: {
    margin: 8,
    color: "#fff",
    backgroundColor: "#ffa000"
  }
};

class Notification extends Component {
  sendHelp = () => {
    let payload = {
      name: this.props.name,
      room: this.props.room,
      exercise: this.props.exercise
    };
    socket.emit("sendHelp", payload);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={this.sendHelp}
        >
          Help!
        </Button>
      </div>
    );
  }
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Notification);
