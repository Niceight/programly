import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentStudent } from "../../../actions/studentActions";
import CircularProgress from "../../common/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  "@global": {
    body: {
      background: theme.palette.common.white
    }
  },
  paper: {
    marginTop: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentStudent();
  }

  render() {
    const { user } = this.props.auth;
    const { classes } = this.props;
    const { student, loading } = this.props.student;

    let dashboardContent, dashboardLoading;

    if (student === null || loading) {
      dashboardLoading = <CircularProgress />;
    } else {
      dashboardContent = (
        <div>
          <p>Welcome, {user.name}!</p>
        </div>
      );
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
  getCurrentStudent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  student: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  student: state.student,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentStudent }
)(withStyles(styles)(Dashboard));
