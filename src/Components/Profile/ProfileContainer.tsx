import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { useParams, useHistory } from "react-router-dom";
import Profile from "./Profile";
import { compose } from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { AppStateType } from "../../Redux/redux-store";
import { ProfileType } from "../../types/types";
import { actions } from "../../Redux/profile-reducer";
// import styles from "./profile.module.scss";

interface IProfileContainerProps {
  profile: ProfileType;
  profileStatus: string;
  authorizedUserId: number | null;
  isAuth: boolean;
  saveProfile: (profile: ProfileType) => void;
  updateUserProfileStatus: (newStatus: string) => void;
  updateUserProfilePhoto: (file: File) => void;
  getUserProfile: (userId: number) => void;
  getUserProfileStatus: (userId: number) => void;
}

type PathParamsType = {
  userId: string;
};

const ProfileContainer: React.FC<
  IProfileContainerProps & RouteComponentProps<PathParamsType>
> = (props) => {
  const { authorizedUserId, getUserProfile, getUserProfileStatus } = props;

  const { userId } = useParams<{ userId: string }>();
  const history = useHistory();

  useEffect(() => {
    let id: number | null = +userId;
    if (!id) {
      id = authorizedUserId;
      console.log(id);
      if (!id) {
        history.push("/login");
        console.log('history.push("/login")');
      }
    }
    if (!id) {
      console.error(
        "id should exists in URI params or in state (authorizedUserId)"
      );
    } else {
      getUserProfile(id);
      getUserProfileStatus(id);
      console.log(id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return <Profile {...props} isOwner={!userId} />;
};

const mapStateToProps = (state: AppStateType) => {
  return {
    profile: state.profilePage.profile,
    profileStatus: state.profilePage.profileStatus,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth,
  };
};
export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUserProfile: actions.getUserProfile,
    getUserProfileStatus: actions.getUserProfileStatus,
    updateUserProfileStatus: actions.updateUserProfileStatus,
    updateUserProfilePhoto: actions.updatePhotoRequest,
    saveProfile: actions.saveProfile,
  }),
  // withRouter,
  withAuthRedirect
)(ProfileContainer);
