import React, { Suspense } from "react";
import Layout from "./Layout/Layout";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/redux-store";
import Preloader from "./Components/Common/Preloader/Preloader";
import UsersContainer from "./Components/Users/UsersContainer";
import Login from "./Components/Login/Login";
const ProfileContainer = React.lazy(() =>
  import("./Components/Profile/ProfileContainer")
);

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Layout>
          <Suspense fallback={<Preloader inBlock transparent />}>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/profile" />} />
              <Route
                path="/profile/:userId?"
                render={() => <ProfileContainer />}
              />
              <Route path="/users" render={() => <UsersContainer />} />
              <Route path="/login" render={() => <Login />} />
              <Route render={() => <div>404 NOT FOUND</div>} />
            </Switch>
          </Suspense>
        </Layout>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
