import { call, put, takeEvery } from "redux-saga/effects";
import { usersAPI } from "../../api/api";
import {
  actions,
  FOLLOW_REQUEST,
  REQUESTED_USERS,
  UNFOLLOW_REQUEST,
} from "../users-reducer";

export function* userWatcher() {
  yield takeEvery<any>(REQUESTED_USERS, requestedUsers);
  yield takeEvery<any>(FOLLOW_REQUEST, followRequest);
  yield takeEvery<any>(UNFOLLOW_REQUEST, unfollowRequest);
}

interface IRequestedUsers {
  pageNumber: number;
  pageSize: number;
  term: string;
  friend: boolean | null;
}

export function* requestedUsers(action: IRequestedUsers) {
  yield put(actions.toggleIsFetching(true));
  yield put(actions.setCurrentPage(action.pageNumber));
  yield put(actions.setFilter(action.term, action.friend));
  let data = yield call(
    usersAPI.getUsers,
    action.pageNumber,
    action.pageSize,
    action.term,
    action.friend
  );
  yield put(actions.toggleIsFetching(false));
  yield put(actions.setUsers(data.items));
  yield put(actions.setTotalCount(data.totalCount));
}

interface IFollowRequest {
  userId: number;
}

export function* followRequest(action: IFollowRequest) {
  let response = yield call(usersAPI.follow, action.userId);
  if (response.data.resultCode === 0) {
    yield put(actions.followSuccess(action.userId));
  }
}

interface IUnfollowRequest {
  userId: number;
}

export function* unfollowRequest(action: IUnfollowRequest) {
  let response = yield call(usersAPI.unfollow, action.userId);
  if (response.data.resultCode === 0) {
    yield put(actions.unfollowSuccess(action.userId));
  }
}
