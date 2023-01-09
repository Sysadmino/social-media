import { call, put, takeEvery, delay } from "redux-saga/effects";
import {
  errorActions,
  EnqueueSnackbarVariantType,
  GET_SNACKBAR_POPUP,
} from "./EnqueueSnackbar";

export function* enqueueSnackbarWatcher() {
  yield takeEvery<any>(GET_SNACKBAR_POPUP, showSnackbarPopup);
}

export interface IShowEnqueueSnackbarPopup {
  message: string | undefined;
  variant: EnqueueSnackbarVariantType;
}

export function* showSnackbarPopup(object: IShowEnqueueSnackbarPopup | null) {
  if (typeof window === "undefined") return;
  yield put(errorActions.setVisible(true));
  const newMessageObject: IShowEnqueueSnackbarPopup | null = {
    message: object?.message,
    variant: object?.variant,
  };
  yield put(errorActions.setMessage(newMessageObject));
  yield delay(3000);
  yield call(hide);
}

export function* hide() {
  yield put(errorActions.setVisible(false));
}

export function* clear() {
  yield put(errorActions.setMessage(null));
}
