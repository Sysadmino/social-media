import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./header.module.scss";

const Header = (props) => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <img
          src="https://sun9-52.userapi.com/c855428/v855428083/223253/khtG4bBh1yA.jpg"
          alt="logo"
          className={styles.image}
        />
        <div className={styles["login-block"]}>
          {props.isAuth ? (
            <>
              <div style={{ color: "black" }}>{props.login}</div>
              <button onClick={props.logout}>Log out</button>
            </>
          ) : (
            <NavLink to={"/login"}>Login</NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
