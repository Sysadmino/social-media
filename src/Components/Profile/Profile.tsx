import React from "react";
import { ProfileType } from "../../types/types";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

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
    </div>
  );
};

export default Profile;
