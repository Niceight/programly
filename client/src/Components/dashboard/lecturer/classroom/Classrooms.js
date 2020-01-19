import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CircularProgress from "../../../common/CircularProgress";
import {
  getCurrentClassroom,
  getClassrooms,
  deleteClassroom
} from "../../../../actions/classroomActions";
import { withStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
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
      background: theme.palette.background.paper
    }
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
    display: "none"
  }
});

class Classrooms extends Component {
  state = { open: false };
  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getClassrooms(this.props.match.params.id);
    }
  }

  onDeleteClick(userid, classroomid, dialog) {
    if (dialog) {
      this.setState({ open: false });
      this.props.deleteClassroom(userid, classroomid);
    } else {
      this.setState({ open: true, userid: userid, classroomid: classroomid });
    }
  }

  render() {
    const { open, userid, classroomid } = this.state;
    const { user } = this.props.auth;
    const { classrooms, loading } = this.props.classroom;
    const { classes } = this.props;
    let classroomItems;

    if (classrooms === null || loading) {
      classroomItems = (
        <TableRow>
          <TableCell component="th" scope="row">
            <CircularProgress />
          </TableCell>
        </TableRow>
      );
    } else {
      if (classrooms.data.length > 0) {
        classroomItems = classrooms.data.map(classroom => (
          <TableRow key={classroom._id} classroom={classroom}>
            <TableCell component="th" scope="row">
              {classroom.classroomName}
            </TableCell>
            <TableCell align="right">{classroom.courseID}</TableCell>
            <TableCell align="center">
              <Button
                color="primary"
                className={classes.button}
                component={Link}
                to={`/classrooms/${user.id}/${classroom._id}`}
              >
                Edit
              </Button>
            </TableCell>
            <TableCell align="center">
              <Button
                color="secondary"
                className={classes.button}
                onClick={this.onDeleteClick.bind(
                  this,
                  user.id,
                  classroom._id,
                  false
                )}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ));
      } else {
        classroomItems = (
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
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Class Name</TableCell>
                <TableCell align="right">Course ID</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{classroomItems}</TableBody>
          </Table>
          <Dialog
            open={open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Deleting this classroom cannot be recover
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                No
              </Button>
              <Button
                onClick={this.onDeleteClick.bind(
                  this,
                  userid,
                  classroomid,
                  true
                )}
                color="secondary"
                autoFocus
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Container>
    );
  }
}

Classrooms.propTypes = {
  auth: PropTypes.object.isRequired,
  classroom: PropTypes.object.isRequired,
  getCurrentClassroom: PropTypes.func.isRequired,
  getClassrooms: PropTypes.func.isRequired,
  deleteClassroom: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  classroom: state.classroom
});

export default connect(mapStateToProps, {
  getCurrentClassroom,
  getClassrooms,
  deleteClassroom
})(withStyles(styles)(Classrooms));
