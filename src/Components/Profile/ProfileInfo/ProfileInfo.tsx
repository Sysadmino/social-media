import React, { ChangeEvent, useState } from "react";
import Preloader from "../../Common/Preloader/Preloader";
import styles from "./profile-info.module.scss";
import ProfileStatus from "./ProfileStatus";
import profilePhoto from "../../../Assets/Images/user.png";
import ProfileDataForm from "./ProfileDataForm";
import { ContactType, ProfileType } from "../../../types/types";

interface IProfileInfoProps {
  isOwner: boolean;
  profile: ProfileType;
  profileStatus: string;
  saveProfile: (profile: ProfileType) => void;
  updateUserProfileStatus: (newStatus: string) => void;
  updateUserProfilePhoto: (file: File) => void;
}

const ProfileInfo: React.FC<IProfileInfoProps> = (props) => {
  const {
    isOwner,
    profile,
    profileStatus,
    saveProfile,
    updateUserProfileStatus,
    updateUserProfilePhoto,
  } = props;
  const [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader inBlock transparent />;
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length && e.target.files?.length !== 0)
      updateUserProfilePhoto(e.target.files[0]);
  };

  const onSubmit = (values: ProfileType): void => {
    saveProfile(values);
    setEditMode(false);
  };

  return (
    <>
      <div className={styles.info}>
        <div className={styles["info-block"]}>
          <img
            alt=""
            className={styles["ava-img"]}
            src={profile?.photos?.small || profilePhoto}
          />
          {isOwner && <input type="file" onChange={onMainPhotoSelected} />}
          <br />
          {editMode ? (
            <ProfileDataForm saveProfileCallback={onSubmit} profile={profile} />
          ) : (
            <ProfileData
              profile={profile}
              isOwner={isOwner}
              goToEditMode={() => {
                setEditMode(true);
              }}
            />
          )}
        </div>
        <div className={styles.description}>
          <ProfileStatus
            isOwner={isOwner}
            profileStatus={profileStatus}
            updateUserProfileStatus={updateUserProfileStatus}
          />
        </div>
      </div>
    </>
  );
};

interface IProfileDataProps {
  isOwner: boolean;
  profile: ProfileType;
  goToEditMode: () => void;
}

const ProfileData: React.FC<IProfileDataProps> = (props) => {
  const { isOwner, profile } = props;
  const contactsList = Object.keys(profile.contacts).filter(
    (x) => profile.contacts[x as keyof ContactType] !== ""
  );
  return (
    <>
      {isOwner && (
        <button className={styles["edit-button"]} onClick={props.goToEditMode}>
          Edit profile
        </button>
      )}
      {profile?.fullName && (
        <div>
          <b>Full name:</b> {profile?.fullName}
        </div>
      )}
      {profile?.aboutMe && (
        <div>
          <b>About me:</b> {profile?.aboutMe}
        </div>
      )}
      {profile?.lookingForAJob && (
        <div>
          <b>Looking for a job:</b> {profile?.lookingForAJob ? "Yes" : "No"}
        </div>
      )}
      {profile?.lookingForAJobDescription && (
        <div>
          <b>My professional skills:</b> {profile?.lookingForAJobDescription}
        </div>
      )}
      {profile?.contacts && contactsList.length !== 0 && (
        <div>
          <b>Contacts</b>
          {Object.keys(profile.contacts).map(
            (x) =>
              profile.contacts[x as keyof ContactType] !== "" && (
                <Contact
                  key={x}
                  contactTitle={x}
                  contactValue={profile.contacts[x as keyof ContactType]}
                />
              )
          )}
        </div>
      )}
    </>
  );
};

interface IContactProps {
  contactTitle: string;
  contactValue: string;
}

const Contact: React.FC<IContactProps> = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <b>{contactTitle}:</b> {contactValue}
    </div>
  );
};

export default React.memo(ProfileInfo);
