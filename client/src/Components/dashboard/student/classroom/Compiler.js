import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { runCompiler } from "../../../../actions/compilerActions";
import classNames from "classnames/bind";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const styles = theme => ({
  paper: {
    margin: theme.spacing(1),
    height: theme.spacing(16)
  },
  root: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(2)
  },
  title: {
    fontSize: 14
  },
  error: {
    color: "red"
  },
  succes: {
    color: "green"
  },
  default: {
    color: "grey"
  }
});

class Compiler extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onCompile = this.onCompile.bind(this);
  }

  onCompile() {
    const compilerData = {
      codeSnippet: this.props.codeSnippet
    };
    this.props.runCompiler(compilerData);
  }

  render() {
    const { classes } = this.props;
    const { compiler } = this.props.compiler;
    let compilerResult;

    if (compiler !== null) {
      compilerResult = compiler.data;
    } else {
      compilerResult = null;
    }

    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.onCompile}
        >
          Compile
        </Button>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Output
            </Typography>
            <Typography
              className={classNames(
                compilerResult
                  ? compilerResult.stderr
                    ? classes.error
                    : classes.succes
                  : classes.default
              )}
            >
              {compilerResult
                ? compilerResult.stdout
                  ? compilerResult.stdout
                  : compilerResult.stderr
                : "Output will display here"}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Compiler.propTypes = {
  classes: PropTypes.object.isRequired,
  compiler: PropTypes.object.isRequired,
  runCompiler: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  compiler: state.compiler
});

export default connect(mapStateToProps, { runCompiler })(
  withStyles(styles)(Compiler)
);
