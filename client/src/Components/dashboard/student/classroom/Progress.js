import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import { Controlled as CodeMirror } from "react-codemirror2";
require("codemirror/lib/codemirror.css");
require("codemirror/theme/neat.css");
require("codemirror/mode/clike/clike.js");

const styles = theme => ({
  "@global": {
    body: {
      background: "white"
    }
  }
});

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: "",
      exercise: "",
      content: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newExercise = {
      student: this.state.student,
      exercise: this.state.exercise,
      content: this.state.content
    };

    this.props.createExercise(newExercise);

    this.setState({ open: true });
  }

  render() {
    const { user } = this.props.auth;
    const { classes } = this.props;
    const option = {
      mode: "text/x-java",
      theme: "neat",
      lineNumbers: true
    };
    return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <CodeMirror
          value={this.state.content}
          options={option}
          onBeforeChange={(editor, data, content) => {
            this.setState({ content });
          }}
          onChange={(editor, data, content) => {}}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Save
        </Button>
      </Container>
    );
  }
}

Progress.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(withStyles(styles)(Progress)));
