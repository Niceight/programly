import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const ThemeSelect = props => {
  const classes = useStyles();

  function triggerChangeTheme(e) {
    props.changeTheme(e.target.value);
  }

  function renderModeSelect() {
    const themes = [
      "neat",
      "monokai",
      "bespin",
      "3024-day",
      "3024-night",
      "cobalt",
      "eclipse",
      "dracula",
      "isotope",
      "duotone-light",
      "icecoder",
      "material",
      "midnight",
      "solarized"
    ];
    return themes.map((theme, i) => {
      if (theme === props.theme) {
        return (
          <MenuItem key={i} value={theme} selected>
            {theme}
          </MenuItem>
        );
      } else {
        return (
          <MenuItem key={i} value={theme}>
            {theme}
          </MenuItem>
        );
      }
    });
  }
  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel>Theme</InputLabel>
        <Select value={props.theme} onChange={triggerChangeTheme}>
          {renderModeSelect()}
        </Select>
      </FormControl>
    </form>
  );
};

export default ThemeSelect;
