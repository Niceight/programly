import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ScrollToBottom from "react-scroll-to-bottom";

const useStyles = makeStyles(({ palette, spacing }) => {
  const radius = spacing(2.5);
  const rightBgColor = palette.primary.main;
  return {
    "@global": {
      "*::-webkit-scrollbar": {
        width: "0.4em",
        height: "0"
      },
      "*::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        outline: "1px solid slategrey"
      }
    },
    flexColumn: {
      display: "flex",
      flexDirection: "column",
      height: "300px"
    },
    flexRow: {
      display: "flex",
      flexDirection: "row"
    },
    textField: {
      marginRight: spacing(1),
      width: "90%"
    },
    button: {
      margin: spacing(2, 0, 1, 0),
      width: "10%"
    },
    messages: {
      overflow: "auto",
      flex: "auto"
    },
    username: {
      fontWeight: "bold"
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
      borderTopLeftRadius: radius,
      backgroundColor: palette.grey[100]
    },
    rightRow: {
      textAlign: "right"
    },
    right: {
      borderTopLeftRadius: radius,
      borderBottomLeftRadius: radius,
      borderTopRightRadius: radius,
      backgroundColor: rightBgColor,
      color: palette.common.white
    }
  };
});

const Chat = props => {
  const classes = useStyles();

  function triggerChangeMessage(e) {
    props.changeMessage(e.target.value);
  }

  function triggerSendMessage(e) {
    props.sendMessage(e.target.value);
  }

  return (
    <div className={classes.flexColumn}>
      <ScrollToBottom className={classes.messages}>
        {props.messages.map(chat =>
          chat.user === props.name ? (
            <Grid container spacing={1} justify={"flex-end"}>
              <Grid item xs={8}>
                <div className={classes.rightRow}>
                  <Typography
                    align={"left"}
                    className={`${classes.msg} ${classes.right}`}
                  >
                    {chat.message}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={1} justify={"flex-start"}>
              <Grid item xs={8}>
                <div className={classes.leftRow}>
                  <Typography
                    align={"left"}
                    className={`${classes.msg} ${classes.left}`}
                  >
                    <Typography color="primary" className={classes.username}>
                      {chat.user}
                    </Typography>
                    {chat.message}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          )
        )}
      </ScrollToBottom>

      <div className={classes.flexRow}>
        <TextField
          className={classes.textField}
          label="Send a message"
          margin="normal"
          value={props.message}
          onChange={triggerChangeMessage}
          onKeyDown={e => (e.key === "Enter" ? triggerSendMessage(e) : null)}
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
