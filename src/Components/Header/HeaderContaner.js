import React from "react";
import { connect } from "react-redux";
import { actions } from "../../Redux/auth-reducer";
import Header from "./Header";

class HeaderContainer extends React.Component {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.auth.login,
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps, { logout: actions.logoutRequest })(
  HeaderContainer
);
