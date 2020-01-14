import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getProgressByID,
  clearCurrentProgress
} from "../../../../actions/progressActions";
import CircularProgress from "../../../common/CircularProgress";
import CollaborateItem from "./CollaborateItem";

class Collaborate extends Component {
  componentDidMount() {
    this.props.getProgressByID(this.props.match.params.progressid);
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
        <CollaborateItem
          room={progress._id}
          codeSnippetAnswer={progress.codeSnippetAnswer}
          messages={progress.messages}
        />
      </div>
    );
  }
}

Collaborate.propTypes = {
  getProgressByID: PropTypes.func.isRequired,
  clearCurrentProgress: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  let progData;
  if (state.progress.progress !== null) {
    if (state.progress.progress.data) {
      progData = state.progress.progress.data;
    }
  }
  return { progress: progData };
};

export default connect(mapStateToProps, {
  getProgressByID,
  clearCurrentProgress
})(withRouter(Collaborate));
