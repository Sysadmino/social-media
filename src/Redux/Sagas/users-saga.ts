import { errorActions } from "../../Utils/EnqueueSnackbar";
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
  try {
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
    yield put(actions.setUsers(data.items));
    yield put(actions.setTotalCount(data.totalCount));
    yield put(actions.toggleIsFetching(false));
  } catch {
    yield put(
      errorActions.getSnackbarPopup("Не удалось загрузить пользователей")
    );
  }
}

interface IFollowRequest {
  userId: number;
}

export function* followRequest(action: IFollowRequest) {
  try {
    yield call(usersAPI.follow, action.userId);
    yield put(actions.followSuccess(action.userId));
  } catch {
    yield put(
      errorActions.getSnackbarPopup(
        "Не удалось совершить действие. Попробуйте позже."
      )
    );
  }
}

interface IUnfollowRequest {
  userId: number;
}

export function* unfollowRequest(action: IUnfollowRequest) {
  try {
    yield call(usersAPI.unfollow, action.userId);
    yield put(actions.unfollowSuccess(action.userId));
  } catch {
    yield put(
      errorActions.getSnackbarPopup(
        "Не удалось совершить действие. Попробуйте позже."
      )
    );
  }
}
