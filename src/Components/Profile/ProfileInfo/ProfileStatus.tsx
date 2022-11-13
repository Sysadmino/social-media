import React, { ChangeEvent, useEffect, useState } from "react";
//import styles from "./profile-info.module.scss";

interface IProfileStatusProps {
  isOwner: boolean;
  profileStatus: string;
  updateUserProfileStatus: (newStatus: string) => void;
}

const ProfileStatus: React.FC<IProfileStatusProps> = (props) => {
  const { profileStatus, updateUserProfileStatus, isOwner } = props;
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(profileStatus);

  useEffect(() => {
    setStatus(profileStatus);
  }, [profileStatus]);

  const activateEditMode = () => {
    if (isOwner) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    updateUserProfileStatus(status);
  };

  const setStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newStatus = e.target.value;
    setStatus(newStatus);
  };

  return (
    <div>
      {editMode && (
        <div>
          <input
            autoFocus={true}
            onBlur={deactivateEditMode}
            value={status}
            onChange={setStatusHandler}
          />
        </div>
      )}
      {!editMode && (
        <div>
          <span onDoubleClick={activateEditMode}>
            {profileStatus || "Нет статуса"}
          </span>
        </div>
      )}
    </div>
  );
};

export default React.memo(ProfileStatus);
