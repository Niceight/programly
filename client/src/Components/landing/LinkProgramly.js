import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/styles";

const styles = {
  title: {
    flexGrow: 1
  }
};

class LinkProgramly extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Link
        underline="none"
        component={RouterLink}
        to="/"
        variant="h6"
        color="inherit"
        className={classes.title}
      >
        programly
      </Link>
    );
  }
}

export default withStyles(styles)(LinkProgramly);
