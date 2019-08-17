import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { withStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import MenuLecturer from "./Menu-Lecturer";
import MenuStudent from "./Menu-Student";
import Link from "@material-ui/core/Link";

const styles = {
  "@global": {
    body: {
      background: "white"
    }
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 2
  },
  title: {
    flexGrow: 1
  }
};

class ButtonAppBar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { classes } = this.props;
    const authLinks = (
      <Button
        onClick={this.onLogoutClick.bind(this)}
        className={classes.button}
      >
        Logout
      </Button>
    );
    const guestLinks = (
      <Toolbar>
        <MenuStudent />
        <MenuLecturer />
      </Toolbar>
    );
    return (
      <div className={classes.root}>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>

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
            {isAuthenticated ? authLinks : guestLinks}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(withStyles(styles)(ButtonAppBar)));
