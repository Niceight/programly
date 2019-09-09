import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CircularProgress from "../../../common/CircularProgress";
import ExerciseItem from "./ExerciseItem";
import { getExercises } from "../../../../actions/exerciseActions";
import { withStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
  }
});

class Exercises extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getExercises(this.props.match.params.id);
    }
  }

  render() {
    const { exercises, loading } = this.props.exercise;
    const { classes } = this.props;
    let exerciseItems;

    if (exercises === null || loading) {
      exerciseItems = <CircularProgress />;
    } else {
      if (exercises.data.length > 0) {
        exerciseItems = exercises.data.map(exercise => (
          <TableRow key={exercise._id} exercise={exercise}>
            <TableCell component="th" scope="row">
              {exercise.topicName}
            </TableCell>
            <TableCell align="right">{exercise.topic}</TableCell>
            <TableCell align="right">{exercise.question}</TableCell>
            <TableCell align="right">{exercise.content}</TableCell>
            <TableCell align="right">{exercise.answer}</TableCell>
          </TableRow>
        ));
      } else {
        exerciseItems = <h4>No exercises found...</h4>;
      }
    }

    return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Topic Name</TableCell>
                <TableCell align="right">Topic</TableCell>
                <TableCell align="right">Question</TableCell>
                <TableCell align="right">Content</TableCell>
                <TableCell align="right">Answer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{exerciseItems}</TableBody>
          </Table>
        </Paper>
      </Container>
    );
  }
}

Exercises.propTypes = {
  getExercises: PropTypes.func.isRequired,
  exercise: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  exercise: state.exercise
});

export default connect(
  mapStateToProps,
  { getExercises }
)(withStyles(styles)(Exercises));
