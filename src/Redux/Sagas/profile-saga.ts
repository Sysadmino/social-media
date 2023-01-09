import { ProfileType } from "./../../types/types";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { profileAPI, ResultCodesEnum } from "../../api/api";
import { errorActions } from "../../Utils/EnqueueSnackbar";
import {
  actions,
  GET_USER_PROFILE,
  GET_USER_PROFILE_STATUS,
  SAVE_PROFILE,
  UPDATE_PHOTO_REQUEST,
  UPDATE_USER_PROFILE_STATUS,
} from "../profile-reducer";
import { AppStateType } from "../redux-store";

export function* profileWatcher() {
  yield takeEvery<any>(GET_USER_PROFILE, getUserProfile);
  yield takeEvery<any>(GET_USER_PROFILE_STATUS, getUserProfileStatus);
  yield takeEvery<any>(UPDATE_USER_PROFILE_STATUS, updateUserProfileStatus);
  yield takeEvery<any>(UPDATE_PHOTO_REQUEST, updateUserProfilePhoto);
  yield takeEvery<any>(SAVE_PROFILE, saveProfile);
}

interface IGetUserProfile {
  userId: number;
}

export function* getUserProfile(action: IGetUserProfile) {
  try {
    let response = yield call(profileAPI.getProfile, action.userId);
    yield put(actions.setUserProfile(response.data));
  } catch {
    yield put(
      errorActions.getSnackbarPopup("Не удалось получить профиль пользователя")
    );
  }
}

interface IGetUserProfileStatus {
  userId: number;
}

export function* getUserProfileStatus(action: IGetUserProfileStatus) {
  try {
    let response = yield call(profileAPI.getStatus, action.userId);
    yield put(actions.setUserProfileStatus(response.data));
  } catch {
    yield put(
      errorActions.getSnackbarPopup("Не удалось получить статус пользователя")
    );
  }
}

interface IUpdateUserProfileStatus {
  newStatus: string;
}

export function* updateUserProfileStatus(action: IUpdateUserProfileStatus) {
  let response = yield call(profileAPI.updateStatus, action.newStatus);
  if (response.data.resultCode === ResultCodesEnum.Success) {
    yield put(actions.setUserProfileStatus(action.newStatus));
  } else {
    yield put(
      errorActions.getSnackbarPopup("Не удалось обновить статус профиля")
    );
  }
}

interface IUpdateUserProfilePhoto {
  file: File;
}

export function* updateUserProfilePhoto(action: IUpdateUserProfilePhoto) {
  let response = yield call(profileAPI.updatePhoto, action.file);
  if (response.data.resultCode === ResultCodesEnum.Success) {
    yield put(actions.updatePhotoSuccess(response.data.data.photos));
  } else {
    yield put(
      errorActions.getSnackbarPopup("Не удалось обновить фото профиля")
    );
  }
}

interface ISaveProfile {
  profile: ProfileType;
}

export function* saveProfile(action: ISaveProfile) {
  const userId = yield select((state: AppStateType) => state.auth.id);
  let response = yield call(profileAPI.saveProfile, action.profile);
  if (response.data.resultCode === ResultCodesEnum.Success) {
    if (userId !== null) {
      const userIdAction: IGetUserProfile = { userId };
      yield call(getUserProfile, userIdAction);
    } else {
      yield put(errorActions.getSnackbarPopup("userId can't be null"));
    }
  } else {
    yield put(errorActions.getSnackbarPopup("Не удалось сохранить профиль"));
  }
}
