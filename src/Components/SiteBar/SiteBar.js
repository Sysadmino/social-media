import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./sitebar.module.scss";

const SiteBar = () => {
  return (
    <nav className={styles.sitebar}>
      <ul>
        <li activeClassName={styles["active-item"]}>
          <NavLink
            className={styles.item}
            activeClassName={styles.active}
            to="/profile"
          >
            Profile
          </NavLink>
        </li>
        <li activeClassName={styles["active-item"]}>
          <NavLink
            className={styles.item}
            activeClassName={styles.active}
            to="/users"
          >
            Users
          </NavLink>
        </li>
        <li activeClassName={styles["active-item"]}>
          <NavLink
            className={styles.item}
            activeClassName={styles.active}
            to="/chat"
          >
            Chat
          </NavLink>
        </li>
        <li activeClassName={styles["active-item"]}>
          <NavLink className={styles.item} to="/">
            News
          </NavLink>
        </li>
        <li activeClassName={styles["active-item"]}>
          <NavLink className={styles.item} to="/">
            Music
          </NavLink>
        </li>
        <li activeClassName={styles["active-item"]}>
          <NavLink className={styles.item} to="/">
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SiteBar;
