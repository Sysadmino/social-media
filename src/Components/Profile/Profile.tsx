import React from "react";
import { ProfileType } from "../../types/types";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
// import styles from "./profile.module.scss";

interface IProfileProps {
  isOwner: boolean;
  profile: ProfileType;
  profileStatus: string;
  saveProfile: (profile: ProfileType) => void;
  updateUserProfileStatus: (newStatus: string) => void;
  updateUserProfilePhoto: (file: File) => void;
}

const Profile: React.FC<IProfileProps> = (props) => {
  return (
    <div>
      <ProfileInfo
        isOwner={props.isOwner}
        profile={props.profile}
        saveProfile={props.saveProfile}
        profileStatus={props.profileStatus}
        updateUserProfilePhoto={props.updateUserProfilePhoto}
        updateUserProfileStatus={props.updateUserProfileStatus}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
