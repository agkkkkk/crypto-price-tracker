import {
  AppBar,
  makeStyles,
  MenuItem,
  ThemeProvider,
  Select,
  Toolbar,
  Typography,
  createTheme,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Space Mono",
    fontWeight: "bolder",
    cursor: "pointer",
  },
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();

  const { currency, symbol, setCurrency } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <Typography
            variant="h6"
            onClick={() => history.push("/")}
            className={classes.title}
          >
            Crypto Tracker
          </Typography>
          <Select
            variant="outlined"
            style={{ width: 100, height: 40, marginLeft: 15 }}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
