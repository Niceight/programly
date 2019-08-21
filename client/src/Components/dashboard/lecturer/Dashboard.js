import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentLecturer } from "../../../actions/lecturerActions";
import CircularProgress from "../../common/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";

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

    let dashboardContent, dashboardLoading;

    if (lecturer === null || loading) {
      dashboardLoading = <CircularProgress />;
    } else {
      dashboardContent = <h4>TODO: DISPLAY PROFILE</h4>;
    }
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {dashboardLoading}
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
