import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import CodeOutlinedIcon from "@material-ui/icons/CodeOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import LocalParkingOutlinedIcon from "@material-ui/icons/LocalParkingOutlined";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
import SettingsEthernetOutlinedIcon from "@material-ui/icons/SettingsEthernetOutlined";
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

class ListGuide extends Component {
  state = { openClass: false };
  handleClickClass = () => {
    this.setState({ openClass: !this.state.openClass });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List
          component="nav"
          aria-label="main folders"
          subheader={
            <ListSubheader component="div" id="main">
              Guide
            </ListSubheader>
          }
        >
          <ListItem button component={Link} to="/guide/instructional-model">
            <ListItemIcon>
              <HelpOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Instructional Model" />
          </ListItem>
          <ListItem button onClick={this.handleClickClass}>
            <ListItemIcon>
              <CodeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Object-Oriented Programming" />
            {this.state.openClass ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.openClass} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/"
                className={classes.nested}
              >
                <ListItemIcon>
                  <AccountTreeOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Inheritance" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to={"/"}
                className={classes.nested}
              >
                <ListItemIcon>
                  <LocalParkingOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Polymorphism" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to={"/"}
                className={classes.nested}
              >
                <ListItemIcon>
                  <SupervisorAccountOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Abstraction" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to={"/"}
                className={classes.nested}
              >
                <ListItemIcon>
                  <SettingsEthernetOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Encapsulation" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(ListGuide);
