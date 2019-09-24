import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getAllClassrooms,
  joinClassroom
} from "../../../../actions/classroomActions";
import { withStyles } from "@material-ui/core";
import CircularProgress from "../../../common/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({
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
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  button: {
    margin: theme.spacing(0)
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  }
});

class JoinClassroom extends Component {
  state = { open: false };

  componentDidMount() {
    if (this.props.getAllClassrooms()) {
      this.props.getAllClassrooms();
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  _refreshPage = () => {
    this.setState({ open: false });
    window.location.reload();
  };

  onJoinClick(classroomid, userid, dialog) {
    if (dialog) {
      const userData = { student: userid };
      this.props.joinClassroom(classroomid, userData);
      this.setState({ open: true });
    } else {
      this.setState({ open: true, userid: userid, classroomid: classroomid });
    }
  }

  render() {
    const { user } = this.props.auth;
    const { open } = this.state;
    const { classes } = this.props;
    const { classrooms, loading } = this.props.classroom;
    let classroomItems;

    if (classrooms === null || loading) {
      classroomItems = <CircularProgress />;
    } else {
      if (classrooms.data.length > 0) {
        classroomItems = classrooms.data.map(classroom => (
          <TableRow key={classroom._id} classroom={classroom}>
            <TableCell component="th" scope="row">
              {classroom.classroomName}
            </TableCell>
            <TableCell align="right">{classroom.courseID}</TableCell>
            <TableCell align="center">{classroom.student.length}</TableCell>
            <TableCell align="center">
              <Button
                color="primary"
                className={classes.button}
                onClick={this.onJoinClick.bind(
                  this,
                  classroom._id,
                  user.id,
                  true
                )}
              >
                Join
              </Button>
            </TableCell>
          </TableRow>
        ));
      } else {
        classroomItems = <h4>No classroom found...</h4>;
      }
    }

    return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Join Classroom
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Classroom"
                variant="outlined"
                fullWidth
                autoFocus
              />
            </Grid>
          </Grid>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Class Name</TableCell>
                  <TableCell align="right">Course ID</TableCell>
                  <TableCell align="center">Students</TableCell>
                  <TableCell align="center">Join</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{classroomItems}</TableBody>
            </Table>
          </Paper>
          <Dialog
            open={open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Success!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Successfully join!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this._refreshPage} autoFocus color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Container>
    );
  }
}

JoinClassroom.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  classroom: PropTypes.object.isRequired,
  getAllClassrooms: PropTypes.func.isRequired,
  joinClassroom: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  classroom: state.classroom
});

export default connect(
  mapStateToProps,
  { getAllClassrooms, joinClassroom }
)(withStyles(styles)(JoinClassroom));
