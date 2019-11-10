import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import ClassOutlinedIcon from "@material-ui/icons/ClassOutlined";
import AllInboxOutlinedIcon from "@material-ui/icons/AllInboxOutlined";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
});

class ListDrawer extends Component {
  state = { openExercise: false, openClass: false };
  handleClickExercise = () => {
    this.setState({ openExercise: !this.state.openExercise });
  };
  handleClickClass = () => {
    this.setState({ openClass: !this.state.openClass });
  };

  render() {
    const { user } = this.props.auth;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List
          component="nav"
          aria-label="main folders"
          subheader={
            <ListSubheader component="div" id="main">
              Home
            </ListSubheader>
          }
        >
          <ListItem button component={Link} to="/lecturers/dashboard">
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={this.handleClickExercise}>
            <ListItemIcon>
              <AssignmentOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Exercise" />
            {this.state.openExercise ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.openExercise} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/exercises/new-exercise"
                className={classes.nested}
              >
                <ListItemIcon>
                  <AddOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="New exercise" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to={`/exercises/${user.id}`}
                className={classes.nested}
              >
                <ListItemIcon>
                  <AllInboxOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Exercises" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={this.handleClickClass}>
            <ListItemIcon>
              <SchoolOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Classroom" />
            {this.state.openClass ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.openClass} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/classrooms/new-classroom"
                className={classes.nested}
              >
                <ListItemIcon>
                  <AddOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="New classroom" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to={`/classrooms/${user.id}`}
                className={classes.nested}
              >
                <ListItemIcon>
                  <ClassOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Classrooms" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

ListDrawer.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(styles)(ListDrawer));
