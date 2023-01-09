import React, { FC, useEffect } from "react";
import HeaderContainer from "../Components/Header/HeaderContaner";
import SiteBar from "../Components/SiteBar/SiteBar";
import styles from "./layout.module.scss";
import "../app.scss";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../Components/Common/Preloader/Preloader";
import { actions } from "../Redux/app-reducer";
import { getInitialized } from "../Redux/selectors";
import LayoutModals from "../LayoutModals/LayoutModals";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  const initialized = useSelector(getInitialized);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.initializeApp());
  }, [dispatch]);

  if (!initialized) {
    return <Preloader transparent />;
  }

  return (
    <div>
      <HeaderContainer />
      <main className={styles.main}>
        <SiteBar />
        <div className={styles.content}>{children}</div>
      </main>
      <LayoutModals />
    </div>
  );
};

export default Layout;
