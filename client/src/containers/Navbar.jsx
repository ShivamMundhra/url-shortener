import React from "react";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
  return (
    <div className={styles.nav}>
      <NavLink to="/" className={styles.title}>
        Url-Shortner
      </NavLink>
      <div>
        <button className={styles.btn}>
          <NavLink activeClassName={styles.navLinkActive} to="/login">
            Login
          </NavLink>
        </button>
        <button className={styles.btn}>
          <NavLink activeClassName={styles.navLinkActive} to="signup">
            Signup
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
