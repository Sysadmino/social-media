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
          <a className={styles.item} href="http://localhost:3000/">
            News
          </a>
        </li>
        <li activeClassName={styles["active-item"]}>
          <a className={styles.item} href="http://localhost:3000/">
            Music
          </a>
        </li>
        <li activeClassName={styles["active-item"]}>
          <a className={styles.item} href="http://localhost:3000/">
            Settings
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SiteBar;
