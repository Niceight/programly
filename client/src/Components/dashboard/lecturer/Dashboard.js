import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import { getCurrentLecturer } from "../../../actions/lecturerActions";
//import Spinner from "../common/Spinner";

const styles = {
  "@global": {
    body: {
      background: "white"
    }
  },
  paper: {
    marginTop: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentLecturer();
  }

  render() {
    const { user } = this.props.auth;
    const { classes } = this.props;
    const { lecturer, loading } = this.props.lecturer;

    let dashboardContent;

    if (lecturer === null || loading) {
      //dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has lecturer data
      dashboardContent = <h4>TODO: DISPLAY PROFILE</h4>;
    }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h1">
            {dashboardContent}
          </Typography>
        </div>
      </Container>
    );
  }
}

Dashboard.propTypes = {
  getCurrentLecturer: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  lecturer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  lecturer: state.lecturer,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentLecturer }
)(withStyles(styles)(Dashboard));
