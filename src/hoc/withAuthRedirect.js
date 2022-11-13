import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const mapStateToPropsForRedirect = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

const withAuthRedirect = (Component) => {
  let RedirectComponent = (props) => {
    if (!props.isAuth) {
      return <Redirect to="/login" />;
    }
    return <Component {...props} />;
  };

  let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(
    RedirectComponent
  );

  return ConnectedAuthRedirectComponent;
};

export default withAuthRedirect;
