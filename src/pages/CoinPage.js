import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

import CoinInfo from "../components/CoinInfo";
import { singleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "../components/Carousel";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sideBar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid white",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    paddingTop: 0,
    paddingBottom: 15,
    padding: 25,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignSelf: "start",
    },
  },
  marketDataItem: {
    fontFamily: "Montserrat",
    fontSize: 18,
    paddingBottom: 10,
  },
}));

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();
  const classes = useStyles();

  const currencyLc = currency.toLowerCase();

  const fetchCoin = async () => {
    const { data } = await axios.get(singleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  const coinWebsite = `${coin.links.homepage[0]}`;
  console.log(coinWebsite);

  return (
    <div className={classes.container}>
      <div className={classes.sideBar}>
        <img
          src={coin.image.large}
          alt={coin.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin.name}{" "}
          <span style={{ fontSize: 16, color: "gray" }}>{coin.symbol}</span>
        </Typography>
        <Typography
          variant="h4"
          className={classes.marketDataItem}
          style={{ textDecorationLine: "none" }}
        >
          <a href={coinWebsite}>{coin.links.homepage}</a>
        </Typography>

        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <Typography variant="h4" className={classes.marketDataItem}>
            Rank: {coin.market_cap_rank}
          </Typography>
          <Typography variant="h4" className={classes.marketDataItem}>
            Current Price: {symbol}{" "}
            {numberWithCommas(coin.market_data.current_price[currencyLc])}
          </Typography>
          <Typography variant="h4" className={classes.marketDataItem}>
            Market Cap: {symbol}{" "}
            {numberWithCommas(coin.market_data.market_cap[currencyLc])}
          </Typography>
          {coin.genesis_date && (
            <Typography variant="h4" className={classes.marketDataItem}>
              Genesis Date: {coin.genesis_date}
            </Typography>
          )}
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
