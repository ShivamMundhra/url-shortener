import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

import Shorten from "./Shorten";

const Home = (props) => {
  return (
    <div className={styles.Home}>
      <div className={styles.nav}>
        <div className={styles.title}>Url-Shortner</div>
        <div>
          <button className={styles.btn}>
            <Link to="/login">Login</Link>
          </button>
          <button className={styles.btn}>
            <Link to="signup">Signup</Link>
          </button>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.shortenContainer}>
          <span className={styles.label}>Enter long Url</span>
          <Shorten />
        </div>
      </div>
    </div>
  );
};

export default Home;
