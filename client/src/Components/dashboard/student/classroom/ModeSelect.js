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

const ModeSelect = props => {
  const classes = useStyles();

  function triggerChangeMode(e) {
    props.changeMode(e.target.value);
  }

  function renderModeSelect() {
    const modes = [
      "text/x-java",
      "ruby",
      "javascript",
      "clojure",
      "coffeescript",
      "crystal",
      "erlang",
      "php",
      "python",
      "swift"
    ];
    return modes.map((mode, i) => {
      if (mode === props.mode) {
        return (
          <MenuItem key={i} value={mode} selected>
            {mode}
          </MenuItem>
        );
      } else {
        return (
          <MenuItem key={i} value={mode}>
            {mode}
          </MenuItem>
        );
      }
    });
  }
  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel>Language</InputLabel>
        <Select value={props.mode} onChange={triggerChangeMode}>
          {renderModeSelect()}
        </Select>
      </FormControl>
    </form>
  );
};

export default ModeSelect;
