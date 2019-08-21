import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

class LogoutButton extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  }
  render() {
    return (
      <Toolbar>
        <Button onClick={this.onLogoutClick.bind(this)}>Logout</Button>
      </Toolbar>
    );
  }
}

LogoutButton.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(LogoutButton));
