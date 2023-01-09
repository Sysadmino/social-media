import React, { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Users from "./Users";
import {
  getCurrentPage,
  getPageSize,
  getUsersFilterFriend,
  getUsersFilterTerm,
} from "../../Redux/selectors";
import { useHistory } from "react-router-dom";
import { actions } from "../../Redux/users-reducer";

const UsersContainer: FunctionComponent = () => {
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const term = useSelector(getUsersFilterTerm);
  const friend = useSelector(getUsersFilterFriend);

  const dispatch = useDispatch();
  const history = useHistory();
  const queryString = require("querystring");

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.slice(1));

    let actualPage = currentPage;
    let actualFriend = friend;
    if (!!parsed.page) actualPage = Number(parsed.page);

    switch (parsed.friend) {
      case "true":
        actualFriend = true;
        break;
      case "false":
        actualFriend = false;
        break;
      case "null":
        actualFriend = null;
        break;
    }

    dispatch(
      actions.requestUsers(actualPage, pageSize, parsed.term, actualFriend)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const query: {
      term?: string;
      friend?: string;
      page?: string;
    } = {};

    if (!!term) query.term = term;
    if (friend !== null) query.friend = String(friend);
    if (currentPage !== 1) query.page = String(currentPage);

    history.push({
      pathname: "/users",
      search: queryString.stringify(query),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term, friend, currentPage]);

  const onPageChanged = (pageNumber: number): void => {
    dispatch(actions.requestUsers(pageNumber, pageSize, term, friend));
  };

  const onFilterChanged = (term: string, friend: boolean | null): void => {
    dispatch(actions.requestUsers(1, pageSize, term, friend));
  };

  return (
    <>
      <Users onPageChanged={onPageChanged} onFilterChanged={onFilterChanged} />
    </>
  );
};

export default UsersContainer;
