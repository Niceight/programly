import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createExercise } from "../../../../actions/exerciseActions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import { Controlled as CodeMirror } from "react-codemirror2";
require("codemirror/lib/codemirror.css");
require("codemirror/theme/neat.css");
require("codemirror/mode/clike/clike.js");

const styles = {
  "@global": {
    body: {
      background: "white"
    }
  },
  paper: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: 8,
    background: "secondary"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: 8
  },
  submit: {
    margin: (24, 0, 16, 0)
  }
};

class CreateExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicName: "",
      topic: "",
      question: "",
      content: "",
      answer: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newExercise = {
      topicName: this.state.topicName,
      topic: this.state.topic,
      question: this.state.question,
      content: this.state.content,
      answer: this.state.answer
    };

    this.props.createExercise(newExercise, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { classes } = this.props;
    const option = {
      mode: "text/x-java",
      theme: "neat",
      lineNumbers: true
    };
    return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Exercise
          </Typography>
          <form onSubmit={this.onSubmit} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="topicName"
                  name="topicName"
                  label="Topic Name"
                  variant="outlined"
                  fullWidth
                  required
                  autoFocus
                  autoComplete="topicName"
                  value={this.state.topicName}
                  onChange={this.onChange}
                  error={!!errors.topicName}
                  helperText={errors.topicName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="topic"
                  name="topic"
                  label="Topic"
                  variant="outlined"
                  fullWidth
                  required
                  autoComplete="topic"
                  value={this.state.topic}
                  onChange={this.onChange}
                  error={!!errors.topic}
                  helperText={errors.topic}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="question"
                  name="question"
                  label="Question"
                  variant="outlined"
                  fullWidth
                  required
                  autoComplete="question"
                  value={this.state.question}
                  onChange={this.onChange}
                  error={!!errors.question}
                  helperText={errors.question}
                />
              </Grid>
              <Grid item xs={12}>
                <CodeMirror
                  value={this.state.content}
                  options={option}
                  onBeforeChange={(editor, data, content) => {
                    this.setState({ content });
                  }}
                  onChange={(editor, data, content) => {}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="answer"
                  name="answer"
                  type="answer"
                  label="Answer"
                  variant="outlined"
                  fullWidth
                  required
                  autoComplete="answer"
                  value={this.state.answer}
                  onChange={this.onChange}
                  error={!!errors.answer}
                  helperText={errors.answer}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

CreateExercise.propTypes = {
  exercise: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  exercise: state.exercise,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createExercise }
)(withRouter(withStyles(styles)(CreateExercise)));
