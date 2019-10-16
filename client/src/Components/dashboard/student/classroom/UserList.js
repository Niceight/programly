import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(1, 0, 2)
  },
  typing: {
    fontSize: "14px",
    fontStyle: "italic",
    opacity: ".5"
  },
  textGlow: {
    textShadow: "#6AD8C9 0 0 10px"
  }
}));

const UserList = props => {
  const classes = useStyles();
  const [dense] = React.useState(false);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            Students
          </Typography>
          <div className={classes.demo}>
            <List dense={dense}>
              {props.users.map((user, i) => {
                if (user === props.currentlyTyping) {
                  return (
                    <ListItem>
                      <ListItemText
                        key={i}
                        className={classes.textGlow}
                        primary={user}
                      >
                        {user} <span className={classes.typing}>typing...</span>
                      </ListItemText>
                    </ListItem>
                  );
                } else {
                  return (
                    <ListItem>
                      <ListItemText key={i} primary={user}>
                        {user}
                      </ListItemText>
                    </ListItem>
                  );
                }
              })}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserList;
