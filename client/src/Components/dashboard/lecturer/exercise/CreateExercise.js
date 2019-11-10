import React, { Component } from "react";
import { Link } from "react-router-dom";
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
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Controlled as CodeMirror } from "react-codemirror2";
require("codemirror/lib/codemirror.css");
require("codemirror/theme/neat.css");
require("codemirror/mode/clike/clike.js");

const styles = theme => ({
  "@global": {
    body: {
      background: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    background: "secondary"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class CreateExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicName: "",
      topic: "",
      question: "",
      content: "",
      answer: "",
      errors: {},
      open: false
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

    this.props.createExercise(newExercise);

    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { user } = this.props.auth;
    const { open, errors } = this.state;
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
          <Dialog
            open={open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Success!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Successfully create!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleClose}
                component={Link}
                to={`/exercises/${user.id}`}
                autoFocus
                color="primary"
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Container>
    );
  }
}

CreateExercise.propTypes = {
  auth: PropTypes.object.isRequired,
  exercise: PropTypes.object.isRequired,
  createExercise: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  exercise: state.exercise,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createExercise }
)(withRouter(withStyles(styles)(CreateExercise)));
