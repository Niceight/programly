import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCurrentClassroom,
  updateClassroom,
  clearCurrentClassroom
} from "../../../../actions/classroomActions";
import ClassroomExercises from "./ClassroomExercises";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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

class EditClassroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classroomName: "",
      courseID: "",
      exercises: [],
      errors: {},
      open: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentClassroom(
      this.props.match.params.lecturerID,
      this.props.match.params.classroomID
    );
  }

  componentWillUnmount() {
    this.props.clearCurrentClassroom();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.classroom.classroom) {
      const classroom = nextProps.classroom.classroom.data;

      this.setState({
        classroomName: classroom.classroomName,
        courseID: classroom.courseID,
        exercises: classroom.exercise
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const updateClassroom = {
      classroomName: this.state.classroomName,
      courseID: this.state.courseID,
      exercises: this.state.exercises
    };

    this.props.updateClassroom(
      this.props.match.params.classroomID,
      updateClassroom
    );

    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  updateExercises = x => {
    this.setState({
      exercises: x
    });
  };

  render() {
    const { user } = this.props.auth;
    const { open, errors } = this.state;
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Classroom
          </Typography>
          <form onSubmit={this.onSubmit} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="classroomName"
                  name="classroomName"
                  label="Classroom Name"
                  variant="outlined"
                  fullWidth
                  required
                  autoFocus
                  autoComplete="classroomName"
                  value={this.state.classroomName}
                  onChange={this.onChange}
                  error={!!errors.classroomName}
                  helperText={errors.classroomName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="courseID"
                  name="courseID"
                  label="Course ID"
                  variant="outlined"
                  fullWidth
                  required
                  autoComplete="courseID"
                  value={this.state.courseID}
                  onChange={this.onChange}
                  error={!!errors.courseID}
                  helperText={errors.courseID}
                />
              </Grid>
              <Grid item xs={12}>
                <ClassroomExercises
                  id={this.props.match.params.lecturerID}
                  exes={this.state.exercises}
                  updateCheckExercises={x => this.updateExercises(x)}
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
              Update
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
                Successfully update!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleClose}
                component={Link}
                to={`/classrooms/${user.id}`}
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

EditClassroom.propTypes = {
  auth: PropTypes.object.isRequired,
  exercise: PropTypes.object.isRequired,
  classroom: PropTypes.object.isRequired,
  getCurrentClassroom: PropTypes.func.isRequired,
  updateClassroom: PropTypes.func.isRequired,
  clearCurrentClassroom: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  exercise: state.exercise,
  classroom: state.classroom,
  errors: state.errors
});

export default connect(mapStateToProps, {
  getCurrentClassroom,
  updateClassroom,
  clearCurrentClassroom
})(withRouter(withStyles(styles)(EditClassroom)));
