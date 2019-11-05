import React from "react";
import Typography from "@material-ui/core/Typography";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © programly "}
      {new Date().getFullYear()}
      {". Built with ❤"}
    </Typography>
  );
}

export default function CustomFooter() {
  return <Copyright />;
}
