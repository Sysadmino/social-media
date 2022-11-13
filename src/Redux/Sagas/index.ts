import { all } from "redux-saga/effects";
import { appWatcher } from "./app-saga";
import { authWatcher } from "./auth-saga";
import { profileWatcher } from "./profile-saga";
import { userWatcher } from "./users-saga";

export function* rootWatcher() {
  yield all([userWatcher(), profileWatcher(), authWatcher(), appWatcher()]);
}
