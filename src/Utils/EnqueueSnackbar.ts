import { InferActionsTypes } from "../Redux/redux-store";
import { IShowEnqueueSnackbarPopup } from "./snackbar-saga";

export type EnqueueSnackbarVariantType = "SUCCESS" | "ERROR" | undefined;

export interface IEnqueueSnackbarMessage {
  message: string | undefined | null;
  variant: EnqueueSnackbarVariantType;
}

export type InitialStateType = {
  visible: boolean;
  object: IEnqueueSnackbarMessage;
};

const initialState: InitialStateType = {
  visible: false,
  object: {
    message: "",
    variant: "ERROR",
  },
};

export const GET_SNACKBAR_POPUP = "GET_SNACKBAR_POPUP";
export const SET_VISIBLE = "SET_VISIBLE";
export const SET_MESSAGE = "SET_MESSAGE";

const enqueueSnackbarReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case SET_VISIBLE:
      return {
        ...state,
        visible: action.visible,
      };
    case SET_MESSAGE:
      return {
        ...state,
        object: {
          ...state.object,
          message: action.message,
          variant: action.variant,
        },
      };
    default:
      return state;
  }
};

export type ActionsTypes = InferActionsTypes<typeof errorActions>;

export const errorActions = {
  getSnackbarPopup: (
    message: string,
    variant: EnqueueSnackbarVariantType = "ERROR"
  ) =>
    ({
      type: GET_SNACKBAR_POPUP,
      message,
      variant,
    } as const),
  setVisible: (visible: boolean) => ({ type: SET_VISIBLE, visible } as const),
  setMessage: (messageObject: IShowEnqueueSnackbarPopup | null) =>
    ({
      type: SET_MESSAGE,
      message: messageObject?.message,
      variant: messageObject?.variant,
    } as const),
};

export default enqueueSnackbarReducer;
