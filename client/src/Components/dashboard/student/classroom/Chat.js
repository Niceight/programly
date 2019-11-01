import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(({ palette, spacing }) => {
  const radius = spacing(2.5);
  const rightBgColor = palette.primary.main;
  return {
    flex: {
      display: "flex"
    },
    textField: {
      marginLeft: spacing(1),
      marginRight: spacing(1)
    },
    button: {
      margin: spacing(1)
    },
    msg: {
      padding: spacing(1, 2),
      borderRadius: 4,
      marginBottom: 4,
      display: "inline-block",
      wordBreak: "break-word",
      fontFamily:
        // eslint-disable-next-line max-len
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    },
    leftRow: {
      textAlign: "left"
    },
    left: {
      borderTopRightRadius: radius,
      borderBottomRightRadius: radius,
      backgroundColor: palette.grey[100]
    },
    leftFirst: {
      borderTopLeftRadius: radius
    },
    leftLast: {
      borderBottomLeftRadius: radius
    },
    rightRow: {
      textAlign: "right"
    },
    right: {
      borderTopLeftRadius: radius,
      borderBottomLeftRadius: radius,
      backgroundColor: rightBgColor,
      color: palette.common.white
    },
    rightFirst: {
      borderTopRightRadius: radius
    },
    rightLast: {
      borderBottomRightRadius: radius
    }
  };
});

const Chat = props => {
  const classes = useStyles();
  const attachClass = (index, side) => {
    if (index === 0) {
      return classes[`${side}First`];
    }
    if (index === props.messages.length - 1) {
      return classes[`${side}Last`];
    }
    return "";
  };

  function triggerChangeMessage(e) {
    props.changeMessage(e.target.value);
  }

  function triggerSendMessage(e) {
    props.sendMessage(e.target.value);
  }

  return (
    <div>
      <div>
        {props.messages.map((chat, i) =>
          chat.user === props.name ? (
            <Grid container spacing={2} justify={"flex-end"}>
              <Grid item xs={8}>
                <div className={classes.rightRow}>
                  <Typography
                    align={"left"}
                    className={`${classes.msg} ${classes.right} ${attachClass(
                      i,
                      "right"
                    )}`}
                  >
                    {chat.message}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2} justify={"flex-start"}>
              <Grid item xs={8}>
                <div className={classes.leftRow}>
                  <Typography
                    align={"left"}
                    className={`${classes.msg} ${classes.left} ${attachClass(
                      i,
                      "left"
                    )}`}
                  >
                    {chat.message}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          )
        )}
      </div>

      <div className={classes.flex}>
        <TextField
          className={classes.textField}
          label="Send a message"
          margin="normal"
          value={props.message}
          onChange={triggerChangeMessage}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={triggerSendMessage}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
