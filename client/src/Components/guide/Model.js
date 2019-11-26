import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  }
}));

export default function Model() {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <CardMedia
        component={"img"}
        image={require("../../img/instructional_model.jpg")}
      />
    </Container>
  );
}
