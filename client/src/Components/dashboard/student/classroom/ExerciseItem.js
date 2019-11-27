import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getExerciseDetails } from "../../../../actions/exerciseActions";
import CircularProgress from "../../../common/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
});

class ExerciseItem extends Component {
  componentDidMount() {
    this.props.getExerciseDetails(this.props.id);
  }

  render() {
    const { classes } = this.props;
    const { exercise } = this.props.exercise;
    let exerciseData;

    if (exercise === null) {
      exerciseData = <CircularProgress />;
    } else if (exercise !== null) {
      if (exercise) {
        exerciseData = (
          <div className={classes.root}>
            <Typography variant="h5" component="h2">
              {exercise.data.topic}
            </Typography>
            <br />
            <Divider />
            <br />
            <Typography component="p">{exercise.data.question}</Typography>
          </div>
        );
      } else {
        exerciseData = <h4>No exercises found...</h4>;
      }
    }
    return <div>{exerciseData}</div>;
  }
}

ExerciseItem.propTypes = {
  exercise: PropTypes.object.isRequired,
  getExerciseDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    exercise: state.exercise
  };
};

export default connect(mapStateToProps, { getExerciseDetails })(
  withRouter(withStyles(styles)(ExerciseItem))
);
