import { createSelector } from "reselect";
import { AppStateType } from "./redux-store";

const getUsersSelector = (state: AppStateType) => {
  return state.usersPage.users;
};

export const getUsers = createSelector(getUsersSelector, (users) => {
  return users.filter((u) => true);
});

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalItemsCount;
};

export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
};

export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
};

export const getPortionSize = (state: AppStateType) => {
  return state.usersPage.portionSize;
};

export const getDialogs = (state: AppStateType) => {
  return state.dialogsPage.dialogs;
};

export const getMessages = (state: AppStateType) => {
  return state.dialogsPage.messages;
};

export const getUsersFilterTerm = (state: AppStateType) => {
  return state.usersPage.filter.term;
};

export const getUsersFilterFriend = (state: AppStateType) => {
  return state.usersPage.filter.friend;
};

export const getInitialized = (state: AppStateType) => {
  return state.app.initialized;
};
