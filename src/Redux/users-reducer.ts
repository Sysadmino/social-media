import { UserType } from "./../types/types";
import { InferActionsTypes } from "./redux-store";

export type InitialStateType = {
  users: Array<UserType>;
  pageSize: number;
  totalItemsCount: number;
  currentPage: number;
  portionSize: number;
  isFetching: boolean;
  filter: {
    term: string;
    friend: boolean | null;
  };
};

const initialState: InitialStateType = {
  users: [],
  pageSize: 5,
  totalItemsCount: 0,
  currentPage: 1,
  portionSize: 5,
  isFetching: false,
  filter: {
    term: "",
    friend: null,
  },
};

export const FOLLOW = "FOLLOW";
export const UNFOLLOW = "UNFOLLOW";
export const SET_USERS = "SET_USERS";
export const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_FILTER_PAGE = "SET_FILTER_PAGE";
export const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
export const REQUESTED_USERS = "REQUESTED_USERS";
export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";

const usersReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((x) => {
          if (x.id === action.userId) return { ...x, followed: true };
          return x;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((x) => {
          if (x.id === action.userId) return { ...x, followed: false };
          return x;
        }),
      };
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalItemsCount: action.totalCount,
      } as any;
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case SET_FILTER_PAGE:
      return {
        ...state,
        filter: action.payload,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
};

export type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  requestUsers: (
    pageNumber: number,
    pageSize: number,
    term: string,
    friend: boolean | null
  ) =>
    ({
      type: REQUESTED_USERS,
      pageNumber,
      pageSize,
      term,
      friend,
    } as const),
  followRequest: (userId: number) =>
    ({
      type: FOLLOW_REQUEST,
      userId,
    } as const),
  unfollowRequest: (userId: number) =>
    ({
      type: UNFOLLOW_REQUEST,
      userId,
    } as const),
  followSuccess: (userId: number) =>
    ({
      type: FOLLOW,
      userId,
    } as const),
  unfollowSuccess: (userId: number) =>
    ({
      type: UNFOLLOW,
      userId,
    } as const),
  setUsers: (users: Array<UserType>) =>
    ({
      type: SET_USERS,
      users,
    } as const),
  setTotalCount: (totalCount: number) =>
    ({
      type: SET_TOTAL_COUNT,
      totalCount,
    } as const),
  setCurrentPage: (currentPage: number) =>
    ({
      type: SET_CURRENT_PAGE,
      currentPage,
    } as const),
  setFilter: (term: string, friend: boolean | null) =>
    ({
      type: SET_FILTER_PAGE,
      payload: { term, friend },
    } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: TOGGLE_IS_FETCHING,
      isFetching,
    } as const),
};

export default usersReducer;
