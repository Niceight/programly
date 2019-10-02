import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      background: "white"
    }
  },
  card: {
    boxShadow: "none",
    "&:hover": {
      transform: "scale(1.04)",
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)"
    },
    width: 345,
    margin: theme.spacing(3, 2)
  },
  media: {
    height: 140
  },
  paper: {
    marginTop: 50,
    display: "flex",
    alignItems: "center"
  },
  root: {
    marginTop: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  font: {
    fontWeight: 500,
    flexDirection: "column"
  }
}));

export default function Layout() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.root}>
        <Typography variant="h1" component="h1" className={classes.font}>
          programly
        </Typography>
      </div>
      <div className={classes.paper}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              style={{ height: 0, paddingTop: "56%" }}
              image={require("../../img/undraw_collab_8oes.png")}
              title="collaboration"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Collaboration
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                What is important? Working together! Collaborating with someone,
                you're working together to formulate something. It can be an
                idea, building something, or even solving a problem just like
                Wonder Pets!
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              style={{ height: 0, paddingTop: "56%" }}
              image={require("../../img/undraw_code_typing_7jnv.png")}
              title="code typing"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Code Typing
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Typing real code just from your browser! Use online code editor
                to code whatever you like. Do I mention about the syntax
                checking? Of course they will check your terrible syntax!
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              style={{ height: 0, paddingTop: "56%" }}
              image={require("../../img/undraw_Group_chat_unwm.png")}
              title="group chat"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Group chat
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Chat with real people! Not one but lots of them. Chat with them
                about exercises, works, problems or maybe you can even find your
                perfect soulmate! It does have end-to-end encryption, so
                worry-free people and gossip more!
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              style={{ height: 0, paddingTop: "56%" }}
              image={require("../../img/undraw_live_collaboration_2r4y.png")}
              title="live collaboration"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Live Collaboration
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Another collaboration?! Does the developer run out of ideas? No
                no no people. This is collaboration with live infront of it.
                Meaning you lots can do crime together virtually! Seamlessly!
                The future is here people!
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </Container>
  );
}
