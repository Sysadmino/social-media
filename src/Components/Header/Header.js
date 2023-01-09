import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./header.module.scss";

const Header = (props) => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles["header__title"]}>Social Media App</div>
        <div className={styles["login-block"]}>
          {props.isAuth ? (
            <div className="flex _direction-column _align-items-center gap-5">
              <div>{props.login}</div>
              <button
                className={styles["header__logout-button"]}
                onClick={props.logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink to={"/login"}>
              <div className={styles["header__login-button"]}>Login</div>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
