import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import authReducer from "./auth-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
// import thunkMiddleware, { ThunkAction } from "redux-thunk";
// import { reducer as formReducer } from "redux-form";
import createSagaMiddleware from "redux-saga";
import appReducer from "./app-reducer";
import { rootWatcher } from "./Sagas";
import enqueueSnackbarReducer from "../Utils/EnqueueSnackbar";

let rootReducer = combineReducers({
  profilePage: profileReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  error: enqueueSnackbarReducer,
});

type rootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<rootReducerType>;

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type InferActionsTypes<
  T extends { [key: string]: (...args: Array<any>) => any }
> = ReturnType<PropertiesTypes<T>>;

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof (window as any) === "object" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

// export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
//   R,
//   AppStateType,
//   unknown,
//   A
// >;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
  // other store enhancers if any
);

let store = createStore(rootReducer, /* preloadedState, */ enhancer);
//@ts-ignore
window.store = store;

sagaMiddleware.run(rootWatcher);

export default store;
