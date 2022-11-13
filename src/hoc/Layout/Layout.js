import React from "react";
import styles from "./layout.module.scss";
import MainPage from "../../pages/MainPage/MainPage";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

const Layout = (props) => {
  return (
    <div className={styles.layout}>
      <BrowserRouter>
        <Provider store={props.store}>
          <MainPage
            state={props.state}
            // dispatch={props.dispatch}
            store={props.store}
          />
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default Layout;
