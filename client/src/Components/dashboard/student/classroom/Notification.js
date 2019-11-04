import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withSnackbar } from "notistack";

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
  handleClickWithAction = () => {
    this.props.enqueueSnackbar(`Your friend ${this.props.name} need help!`, {
      variant: "warning",
      autoHideDuration: 8000,
      action: (
        <Button
          color="secondary"
          size="small"
          href={`/myClassrooms/classroom/collaborate/${this.props.room}/${this.props.exercise}`}
        >
          Help
        </Button>
      )
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={this.handleClickWithAction}
        >
          Help!
        </Button>
      </Paper>
    );
  }
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withStyles(styles)(withSnackbar(Notification));
