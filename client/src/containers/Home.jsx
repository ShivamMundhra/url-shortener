import React from "react";
import styles from "./styles.module.css";

import Shorten from "./Shorten";

const Home = (props) => {
  return (
    <div className={styles.Home}>
      <div className={styles.row}>
        <div className={styles.shortenContainer}>
          <Shorten />
        </div>
      </div>
    </div>
  );
};

export default Home;
