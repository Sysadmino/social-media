import { call, put, takeEvery } from "redux-saga/effects";
import {
  authAPI,
  ResultCodeForCaptchaEnum,
  ResultCodesEnum,
  securityAPI,
} from "../../api/api";
import {
  actions,
  GET_CAPTCHA_URL,
  GET_LOGIN_DATA,
  LOGOUT_REQUEST,
} from "../auth-reducer";

export function* authWatcher() {
  yield takeEvery<any>(GET_LOGIN_DATA, login);
  yield takeEvery(LOGOUT_REQUEST, logout);
  yield takeEvery(GET_CAPTCHA_URL, getCaptchaUrl);
}

export function* getAuthUserData() {
  let response = yield call(authAPI.me);

  if (response.data.resultCode === ResultCodesEnum.Success) {
    const { id, login, email } = yield response.data.data;
    yield put(actions.setAuthUserData(id, login, email, true));
  }
}

interface ILogin {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string | null;
}

export function* login(action: ILogin) {
  let response = yield call(
    authAPI.login,
    action.email,
    action.password,
    action.rememberMe,
    action.captcha
  );
  if (response.data.resultCode === ResultCodesEnum.Success) {
    yield call(getAuthUserData);
  } else {
    if (
      response.data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired
    ) {
      yield call(getCaptchaUrl);
    }
    yield put(actions.stopSubmit(true));
  }
}

export function* logout() {
  const response = yield call(authAPI.logout);
  if (response.data.resultCode === 0) {
    yield put(actions.setAuthUserData(null, null, null, false));
    yield put(actions.setCaptchaUrl(null));
    yield put(actions.stopSubmit(false));
  }
}

export function* getCaptchaUrl() {
  const response = yield call(securityAPI.getCaptchaUrl);
  const captchaUrl = yield response.data.url;
  yield put(actions.setCaptchaUrl(captchaUrl));
}
