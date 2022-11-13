import { InferActionsTypes } from "./redux-store";

let initialState = {
  id: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isAuth: false,
  errorMessage: false,
  captchaUrl: null as string | null,
};

export type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>;

export const SET_USER_DATA = "social-network/auth/SET_USER_DATA";
export const SET_CAPTCHA_URL = "social-network/auth/SET_CAPTCHA_URL";
export const SET_ERROR = "social-network/auth/SET_ERROR";
export const GET_LOGIN_DATA = "social-network/auth/GET_LOGIN_DATA";
export const LOGOUT_REQUEST = "social-network/auth/LOGOUT_REQUEST";
export const GET_CAPTCHA_URL = "social-network/auth/GET_CAPTCHA_URL";

const authReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA: {
      console.log(
        "Теперь данные точно обновились в редюсере. Принимай их App!"
      );
      return {
        ...state,
        ...action.data,
      };
    }
    case SET_CAPTCHA_URL: {
      return {
        ...state,
        captchaUrl: action.captchaUrl,
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  getLoginData: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
  ) =>
    ({
      type: GET_LOGIN_DATA,
      email,
      password,
      rememberMe,
      captcha,
    } as const),
  logoutRequest: () =>
    ({
      type: LOGOUT_REQUEST,
    } as const),
  getCaptchaUrl: () =>
    ({
      type: GET_CAPTCHA_URL,
    } as const),
  setAuthUserData: (
    id: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean
  ) =>
    ({
      type: SET_USER_DATA,
      data: { id, login, email, isAuth },
    } as const),
  setCaptchaUrl: (captchaUrl: string | null) =>
    ({
      type: SET_CAPTCHA_URL,
      captchaUrl,
    } as const),
  stopSubmit: (errorMessage: boolean) =>
    ({
      type: SET_ERROR,
      errorMessage,
    } as const),
};

export default authReducer;
