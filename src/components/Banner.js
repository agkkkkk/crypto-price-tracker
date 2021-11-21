import { Container, makeStyles, Typography } from "@material-ui/core";

import React from "react";
import Carousel from "./Carousel";

const changeBackground = () => {};

const useStyles = makeStyles(() => ({
  banner: {
    backgroundColor: "#444",
    backgroundImage: "url(./cryptohash.jpg)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagLine: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagLine}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Tracker
          </Typography>
          <Typography
            variant="subtitle1"
            style={{
              color: "white",
              fontSize: "20px",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Information regarding your favourite CryptoCurrency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
