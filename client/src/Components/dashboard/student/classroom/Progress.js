import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCurrentProgress,
  clearCurrentProgress
} from "../../../../actions/progressActions";
import CircularProgress from "../../../common/CircularProgress";
import ProgressItem from "./ProgressItem";

class Progress extends Component {
  componentDidMount() {
    this.props.getCurrentProgress(
      this.props.match.params.studentid,
      this.props.match.params.exerciseid
    );
  }

  componentWillUnmount() {
    this.props.clearCurrentProgress();
  }

  render() {
    const progress = this.props.progress;

    if (progress === undefined) {
      return <CircularProgress />;
    }

    return (
      <div>
        <ProgressItem room={progress._id} />
      </div>
    );
  }
}

Progress.propTypes = {
  progress: PropTypes.object.isRequired,
  getCurrentProgress: PropTypes.func.isRequired,
  clearCurrentProgress: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  if (state.progress.progress !== null) {
    if (state.progress.progress.data) {
      return {
        progress: state.progress.progress.data[0]
      };
    }
    if (state.progress.progress._id) {
      return {
        progress: state.progress.progress
      };
    }
  }
};

export default connect(
  mapStateToProps,
  { getCurrentProgress, clearCurrentProgress }
)(withRouter(Progress));
