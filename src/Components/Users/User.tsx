import React from "react";
import styles from "./users.module.scss";
import userPhoto from "../../Assets/Images/user.png";
import { NavLink } from "react-router-dom";
import { UserType } from "../../types/types";

interface IUserProps {
  user: UserType;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
}

const User: React.FC<IUserProps> = (props) => {
  const { user, follow, unfollow } = props;
  return (
    <div>
      <span>
        <div>
          <NavLink to={`/profile/${user.id}`}>
            <img
              alt=""
              src={user.photos.small != null ? user.photos.small : userPhoto}
              className={styles.userPhoto}
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              type="button"
              onClick={() => {
                unfollow(user.id);
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                follow(user.id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
      </span>
    </div>
  );
};

export default React.memo(User);
