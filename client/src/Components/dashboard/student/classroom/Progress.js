import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getExerciseDetails } from "../../../../actions/exerciseActions";
import { getCurrentProgress } from "../../../../actions/progressActions";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "../../../common/CircularProgress";
import Divider from "@material-ui/core/Divider";
import { Controlled as CodeMirror } from "react-codemirror2";
require("codemirror/lib/codemirror.css");
require("codemirror/theme/neat.css");
require("codemirror/mode/clike/clike.js");

const styles = theme => ({
  "@global": {
    body: {
      background: "white"
    }
  },
  root: {
    padding: theme.spacing(3, 2)
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
  }

  getData() {
    this.props.getExerciseDetails(this.props.match.params.exerciseid);
    this.props.getCurrentProgress(
      this.props.match.params.studentid,
      this.props.match.params.exerciseid
    );
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { classes } = this.props;
    const { exercise, loading } = this.props.exercise;
    const { progress } = this.props.progress;
    let exerciseData, progressData;

    if ((exercise === null && progress === null) || loading) {
      exerciseData = <CircularProgress />;
    } else {
      if (exercise && progress) {
        progressData = progress.data.content;
        exerciseData = (
          <Paper className={classes.root}>
            <Typography variant="h5" component="h2">
              {exercise.data.topicName}
            </Typography>
            <br />
            <Divider />
            <br />
            <Typography component="p">{exercise.data.question}</Typography>
          </Paper>
        );
      } else {
        exerciseData = <h4>No exercises found...</h4>;
      }
    }

    const option = {
      mode: "text/x-java",
      theme: "neat",
      lineNumbers: true
    };
    return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        {exerciseData}
        <CodeMirror
          className={classes.root}
          value={progressData}
          options={option}
          onBeforeChange={(editor, data, content) => {
            this.setState({ content });
          }}
          onChange={(editor, data, content) => {}}
        />
      </Container>
    );
  }
}

Progress.propTypes = {
  auth: PropTypes.object.isRequired,
  exercise: PropTypes.object.isRequired,
  progress: PropTypes.object.isRequired,
  getExerciseDetails: PropTypes.object.isRequired,
  getCurrentProgress: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  exercise: state.exercise,
  progress: state.progress
});

export default connect(
  mapStateToProps,
  { getExerciseDetails, getCurrentProgress }
)(withRouter(withStyles(styles)(Progress)));
