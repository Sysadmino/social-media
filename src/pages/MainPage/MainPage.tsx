import React, { FC, Suspense, useEffect } from "react";
import HeaderContainer from "../../Components/Header/HeaderContaner";
import SiteBar from "../../Components/SiteBar/SiteBar";
import styles from "./main-page.module.scss";
import "../../app.scss";
import { Redirect, Route, Switch } from "react-router-dom";
import UsersContainer from "../../Components/Users/UsersContainer";
import Login from "../../Components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../../Components/Common/Preloader/Preloader";
import { actions } from "../../Redux/app-reducer";
import { getInitialized } from "../../Redux/selectors";
const Dialogs = React.lazy(() => import("../../Components/Dialogs/Dialogs"));
const ProfileContainer = React.lazy(
  () => import("../../Components/Profile/ProfileContainer")
);

const MainPage: FC = () => {
  const initialized = useSelector(getInitialized);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.initializeApp());
  }, [dispatch]);

  if (!initialized) {
    return <Preloader />;
  }

  return (
    <div className={styles.wrapper}>
      <HeaderContainer />
      <main className={styles.main}>
        <SiteBar />
        <div className="content">
          <Suspense fallback={<Preloader />}>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/profile" />} />
              <Route path="/dialogs" render={() => <Dialogs />} />
              <Route
                path="/profile/:userId?"
                render={() => <ProfileContainer />}
              />
              <Route path="/users" render={() => <UsersContainer />} />
              <Route path="/login" render={() => <Login />} />
              <Route render={() => <div>404 NOT FOUND</div>} />
            </Switch>
          </Suspense>
        </div>
      </main>
    </div>
  );
};
//Убрал withRouter
export default MainPage;
