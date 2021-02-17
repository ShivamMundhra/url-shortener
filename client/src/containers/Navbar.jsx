import React from "react";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
  let navbtuttons;
  if(!props.isLoggedIn){
  navbtuttons=
          <div>
          <button className={styles.btn} >
            <NavLink activeClassName={styles.navLinkActive} to="/login">
              Login
            </NavLink>
          </button>
          <button className={styles.btn}>
            <NavLink activeClassName={styles.navLinkActive} to="/signup">
              Signup
            </NavLink>
          </button>
        </div>
  } else{
    navbtuttons=<div>
    <button className={styles.btn}>
      <NavLink activeClassName={styles.navLinkActive} to="/history">
        History
      </NavLink>
    </button>
    <button className={styles.btn} onClick={props.logout}>
      <NavLink activeClassName={styles.navLinkActive} to="/home">
        Logout
      </NavLink>
    </button>
  </div>
  }
  return (
    <div className={styles.nav}>
      <NavLink to="/home" className={styles.title}>
        Url-Shortner
      </NavLink>
      {navbtuttons}
    </div>
  );
};

export default NavBar;
