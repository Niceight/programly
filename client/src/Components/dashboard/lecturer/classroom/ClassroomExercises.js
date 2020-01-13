import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getExercises,
  clearCurrentExercise
} from "../../../../actions/exerciseActions";
import CircularProgress from "../../../common/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const styles = theme => ({});

class ClassroomExercises extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exes: []
    };

    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    this.props.getExercises(this.props.id);
  }

  componentWillUnmount() {
    this.props.clearCurrentExercise();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.exes) {
      const checkedExercises = nextProps.exes;
      this.setState({
        exes: checkedExercises
      });
    }
  }

  handleCheck(e, x) {
    let values = this.state.exes.includes(x)
      ? this.state.exes.filter(c => c !== x)
      : [...this.state.exes, x];

    this.setState(
      {
        exes: values
      },
      this.updateExercises
    );
  }

  updateExercises = () => {
    const { exes } = this.state;
    this.props.updateCheckExercises(exes);
  };

  render() {
    const { exercises } = this.props.exercise;
    let exerciseData;

    if (exercises === null) {
      exerciseData = (
        <TableRow>
          <TableCell component="th" scope="row">
            <CircularProgress />
          </TableCell>
        </TableRow>
      );
    } else {
      if (exercises.data.length > 0) {
        exerciseData = exercises.data.map(exercise => (
          <TableRow key={exercise._id}>
            <TableCell component="th" scope="row">
              {exercise.question}
            </TableCell>
            <TableCell align="right">{exercise.topic}</TableCell>
            <TableCell align="right">{exercise.difficulty}</TableCell>
            <TableCell align="center">
              <Checkbox
                key={exercise._id}
                onChange={e => this.handleCheck(e, exercise._id)}
                checked={this.state.exes.includes(exercise._id)}
              />
            </TableCell>
          </TableRow>
        ));
      } else {
        exerciseData = (
          <TableRow>
            <TableCell component="th" scope="row">
              No exercises found...
            </TableCell>
          </TableRow>
        );
      }
    }

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell align="right">Topic</TableCell>
            <TableCell align="right">Difficulty</TableCell>
            <TableCell align="right"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{exerciseData}</TableBody>
      </Table>
    );
  }
}

ClassroomExercises.propTypes = {
  exercise: PropTypes.object.isRequired,
  getExercises: PropTypes.func.isRequired,
  clearCurrentExercise: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    exercise: state.exercise
  };
};

export default connect(mapStateToProps, { getExercises, clearCurrentExercise })(
  withRouter(withStyles(styles)(ClassroomExercises))
);
