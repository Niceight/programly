import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getProgressByID } from "../../../../actions/progressActions";
import CircularProgress from "../../../common/CircularProgress";
import CollaborateItem from "./CollaborateItem";

class Collaborate extends Component {
  componentDidMount() {
    this.props.getProgressByID(this.props.match.params.progressid);
  }

  render() {
    const progress = this.props.progress;

    if (progress === undefined) {
      return <CircularProgress />;
    }

    return (
      <div>
        <CollaborateItem room={progress._id} />
      </div>
    );
  }
}

Collaborate.propTypes = {
  progress: PropTypes.object.isRequired,
  getProgressByID: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  if (state.progress.progress !== null) {
    if (state.progress.progress.data) {
      return {
        progress: state.progress.progress.data
      };
    }
  }
};

export default connect(
  mapStateToProps,
  { getProgressByID }
)(withRouter(Collaborate));
