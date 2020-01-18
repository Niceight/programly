import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createClassroom } from "../../../../actions/classroomActions";
import { getExercises } from "../../../../actions/exerciseActions";
import CircularProgress from "../../../common/CircularProgress";
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
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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

class CreateClassroom extends Component {
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
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getExercises(this.props.auth.user.id);
    }
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

    const newClassroom = {
      classroomName: this.state.classroomName,
      courseID: this.state.courseID,
      exercises: this.state.exercises
    };

    this.props.createClassroom(newClassroom);

    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCheck(e, x) {
    this.setState(state => ({
      exercises: state.exercises.includes(x)
        ? state.exercises.filter(c => c !== x)
        : [...state.exercises, x]
    }));
  }

  render() {
    const { user } = this.props.auth;
    const { open, errors } = this.state;
    const { exercises, loading } = this.props.exercise;
    const { classes } = this.props;
    let exerciseItems;

    if (exercises === null || loading) {
      exerciseItems = (
        <TableRow>
          <TableCell component="th" scope="row">
            <CircularProgress />
          </TableCell>
        </TableRow>
      );
    } else {
      if (exercises.data.length > 0) {
        exerciseItems = exercises.data.map(exercise => (
          <TableRow key={exercise._id}>
            <TableCell component="th" scope="row">
              {exercise.question}
            </TableCell>
            <TableCell align="right">{exercise.topic}</TableCell>
            <TableCell align="right">{exercise.difficulty}</TableCell>
            <TableCell align="center">
              <Checkbox
                key={exercise._id}
                onChange={e => this.handleCheck(e, exercise)}
                checked={this.state.exercises.includes(exercise)}
              />
            </TableCell>
          </TableRow>
        ));
      } else {
        exerciseItems = (
          <TableRow>
            <TableCell component="th" scope="row">
              No exercises found...
            </TableCell>
          </TableRow>
        );
      }
    }

    return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Classroom
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
                {
                  "Pick exercise that you wanted to be included in the classroom. This can be add later."
                }
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Question</TableCell>
                      <TableCell align="right">Topic</TableCell>
                      <TableCell align="right">Difficulty</TableCell>
                      <TableCell align="right"> </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{exerciseItems}</TableBody>
                </Table>
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

CreateClassroom.propTypes = {
  auth: PropTypes.object.isRequired,
  exercise: PropTypes.object.isRequired,
  classroom: PropTypes.object.isRequired,
  createClassroom: PropTypes.func.isRequired,
  getExercises: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  exercise: state.exercise,
  classroom: state.classroom,
  errors: state.errors
});

export default connect(mapStateToProps, { createClassroom, getExercises })(
  withRouter(withStyles(styles)(CreateClassroom))
);
