import { all, call, put, takeEvery } from "redux-saga/effects";
import { actions, INITIALIZE_APP } from "../app-reducer";
import { getAuthUserData } from "./auth-saga";

export function* appWatcher() {
  yield takeEvery(INITIALIZE_APP, initializeApp);
}

export function* initializeApp() {
  const promise = yield call(getAuthUserData);
  yield all([promise]);
  yield put(actions.initializedSuccess());
}
