import {
  Container,
  LinearProgress,
  ThemeProvider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  createTheme,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { coinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "./Carousel";

const useStyles = makeStyles({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#444",
    },
    fontFamily: "Montserrat",
  },
  cell: {
    textTransform: "uppercase",
    fontSize: 18,
    fontWeight: "bold",
    color: "darkgray",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
});

const CoinsTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const history = useHistory();
  const { currency, symbol, coins, loading, fetchCoins } = CryptoState();

  const classes = useStyles();

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{
            margin: 18,
            fontFamily: "Space Mono",
            color: "whitesmoke",
          }}
        >
          CryptoCurrency Prices with Market Cap
        </Typography>
        <TextField
          label="Search for CryptoCurrency.. "
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead
                style={{
                  backgroundColor: "#EEBC1D",
                  width: "100%",
                  overflowX: "hidden",
                }}
              >
                <TableRow>
                  {[
                    "Coin Name",
                    "Symbol",
                    "Price",
                    "24H Change",
                    "Market Cap",
                  ].map((head) => (
                    <TableCell
                      key={head}
                      align={head === "Coin Name" ? "" : "center"}
                      style={{
                        color: "black",
                        fontSize: 18,
                        fontWeight: 500,
                        fontFamily: "Montserrat",
                      }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((coin) => {
                    const profit = coin.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => history.push(`/coins/${coin.id}`)}
                        className={classes.row}
                        key={coin.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                            fontWeight: "bold",
                          }}
                        >
                          <img src={coin?.image} alt={coin.name} height="50" />
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              color: "darkgray",
                              fontSize: 20,
                            }}
                          >
                            {coin.name}
                          </span>
                        </TableCell>
                        <TableCell align="center">
                          <span className={classes.cell}>{coin.symbol}</span>
                        </TableCell>
                        <TableCell align="center">
                          <span className={classes.cell}>
                            {symbol}{" "}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                          </span>
                        </TableCell>
                        <TableCell align="center">
                          <span
                            className={classes.cell}
                            style={{
                              color: profit ? "rgb(14,203,129)" : "red",
                            }}
                          >
                            {profit && "+"}
                            {numberWithCommas(
                              coin.price_change_percentage_24h.toFixed(2)
                            )}
                            %
                          </span>
                        </TableCell>
                        <TableCell align="center">
                          <span className={classes.cell}>
                            {symbol} {numberWithCommas(coin.market_cap)}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          style={{
            padding: 10,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
