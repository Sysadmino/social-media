import { InferActionsTypes } from "./redux-store";

export type InitialStateType = {
  initialized: boolean;
};

let initialState: InitialStateType = {
  initialized: false,
};

export const INITIALIZED_SUCCESS = "social-network/app/INITIALIZED_SUCCESS";
export const INITIALIZE_APP = "social-network/app/INITIALIZE_APP";

const appReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS: {
      return {
        ...state,
        initialized: true,
      };
    }
    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  initializeApp: () =>
    ({
      type: INITIALIZE_APP,
    } as const),
  initializedSuccess: () =>
    ({
      type: INITIALIZED_SUCCESS,
    } as const),
};

export default appReducer;
