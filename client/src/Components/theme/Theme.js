import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  shadows: ["none"],
  palette: {
    types: {
      dark: {
        background: {
          default: "#000000"
        }
      },
      light: {
        background: {
          default: "#ffffff"
        }
      }
    }
  }
});
