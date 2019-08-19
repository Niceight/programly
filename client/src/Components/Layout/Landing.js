import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";

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

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h1">
            <h4>programly</h4>
          </Typography>
        </div>
      </Container>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(styles)(Landing));
