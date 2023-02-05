import React, { useCallback } from "react";
import User from "./User";
import Pagination from "../Common/Pagination/Pagination";
import { Input } from "../Common/FormsControls/FormsControls";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  getUsersFilterFriend,
  getUsersFilterTerm,
  getIsFetching,
} from "../../Redux/selectors";
// import { followRequest, unfollowRequest } from "../../Redux/Sagas/users-saga";
import { actions } from "../../Redux/users-reducer";

import styles from "./users.module.scss";
import Preloader from "../Common/Preloader/Preloader";

type PropsType = {
  onPageChanged: (pageNumber: number) => void;
  onFilterChanged: (term: string, friend: boolean | null) => void;
};

const Users: React.FC<PropsType> = (props) => {
  const { onPageChanged } = props;

  const users = useSelector(getUsers);
  const isFetching = useSelector(getIsFetching);

  const dispatch = useDispatch();

  const followCallback = useCallback((userId: number) => {
    dispatch(actions.followRequest(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unfollowCallback = useCallback((userId: number) => {
    dispatch(actions.unfollowRequest(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isFetching) {
    return <Preloader inBlock transparent />;
  }

  return (
    <div>
      <UsersSearchForm {...props} />
      <Pagination onPageChanged={onPageChanged} />
      <div className={styles["users-container"]}>
        {users.map((x) => (
          <User
            key={x.id}
            follow={followCallback}
            unfollow={unfollowCallback}
            user={x}
          />
        ))}
      </div>
    </div>
  );
};

interface FormValues {
  term: string;
  friend: boolean | null;
}

interface IOptions {
  value: boolean | null;
  label: string;
}

const options: IOptions[] = [
  { value: null, label: "All" },
  { value: true, label: "Only followed" },
  { value: false, label: "Only unfollowed" },
];

const UsersSearchForm: React.FC<PropsType> = (props) => {
  const term = useSelector(getUsersFilterTerm);
  const friend = useSelector(getUsersFilterFriend);

  const { register, handleSubmit, control } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { term, friend },
  });

  const onSubmit: SubmitHandler<FormValues> = (value) => {
    props.onFilterChanged(value.term, value.friend);
  };

  const getValue = (value: boolean | null) =>
    options.find((option) => option.value === value);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        placeholder="Search user"
        name={{ ...register("term") }}
        className={styles["search-user"]}
      />
      <Controller
        control={control}
        defaultValue={friend}
        name="friend"
        render={({ field: { onChange, value } }) => (
          <Select
            options={options}
            value={getValue(value)}
            onChange={(newValue) => onChange((newValue as IOptions).value)}
          />
        )}
      />
      <button className={styles["search-button"]}>Search</button>
    </form>
  );
};

export default React.memo(Users);
