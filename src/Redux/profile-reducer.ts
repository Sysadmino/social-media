import { InferActionsTypes } from "./redux-store";
import { PostType, ProfileType, PhotoType } from "./../types/types";

export type initialStateType = {
  posts: Array<PostType>;
  profile: ProfileType | null;
  profileStatus: string;
};

type ActionsTypes = InferActionsTypes<typeof actions>;

let initialState: initialStateType = {
  posts: [
    { id: 1, message: "New post", likesCount: 12 },
    { id: 2, message: "it is my first post", likesCount: 11 },
  ],
  profile: null,
  profileStatus: "",
};

export const SET_USER_PROFILE = "SET_USER_PROFILE";
export const SET_USER_PROFILE_STATUS = "SET_USER_PROFILE_STATUS";
export const UPDATE_PHOTO_SUCCESS = "UPDATE_PHOTO_SUCCESS";
export const SAVE_PROFILE = "SAVE_PROFILE";
export const GET_USER_PROFILE_STATUS = "GET_USER_PROFILE_STATUS";
export const UPDATE_USER_PROFILE_STATUS = "UPDATE_USER_PROFILE_STATUS";
export const UPDATE_PHOTO_REQUEST = "UPDATE_PHOTO_REQUEST";
export const GET_USER_PROFILE = "GET_USER_PROFILE";

const profileReducer = (
  state = initialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile };
    }
    case SET_USER_PROFILE_STATUS: {
      return { ...state, profileStatus: action.profileStatus };
    }
    case UPDATE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.profilePhoto,
        } as ProfileType,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  getUserProfile: (userId: number) =>
    ({
      type: GET_USER_PROFILE,
      userId,
    } as const),
  updatePhotoRequest: (file: File) =>
    ({
      type: UPDATE_PHOTO_REQUEST,
      file,
    } as const),
  updateUserProfileStatus: (newStatus: string) =>
    ({
      type: UPDATE_USER_PROFILE_STATUS,
      newStatus,
    } as const),
  getUserProfileStatus: (userId: number) =>
    ({
      type: GET_USER_PROFILE_STATUS,
      userId,
    } as const),
  saveProfile: (profile: ProfileType) =>
    ({
      type: SAVE_PROFILE,
      profile,
    } as const),
  setUserProfile: (profile: ProfileType) =>
    ({
      type: SET_USER_PROFILE,
      profile,
    } as const),
  setUserProfileStatus: (profileStatus: string) =>
    ({
      type: SET_USER_PROFILE_STATUS,
      profileStatus,
    } as const),
  updatePhotoSuccess: (profilePhoto: PhotoType) =>
    ({
      type: UPDATE_PHOTO_SUCCESS,
      profilePhoto,
    } as const),
};

export default profileReducer;
