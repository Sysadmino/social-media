import { PhotoType, ProfileType, UserType } from "./../types/types";
import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "a1c49f5e-263d-438c-8493-378ba78c02f4",
  },
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10,
}

type ResponseType<T = {}, RC = ResultCodesEnum> = {
  data: T;
  resultCode: RC;
  messages: Array<string>;
};

export type GetItemsType = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};

export const usersAPI = {
  getUsers(
    currentPage: number,
    pageSize: number,
    term: string = "",
    friend: boolean | null = null
  ) {
    return instance
      .get<GetItemsType>(
        `users?page=${currentPage}&count=${pageSize}&term=${term}` +
          (friend === null ? "" : `&friend=${friend}`)
      )
      .then((response) => response.data);
  },
  follow(userId: number) {
    return instance.post<ResponseType>(`follow/${userId}`);
  },
  unfollow(userId: number) {
    return instance.delete<ResponseType>(`follow/${userId}`);
  },
};

type UpdatePhotoResponseDataType = {
  photos: PhotoType;
};

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get<ProfileType>(`profile/${userId}`);
  },
  getStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`);
  },
  updateStatus(status: string) {
    return instance.put<ResponseType>(`profile/status`, { status: status });
  },
  saveProfile(profile: ProfileType) {
    return instance.put<ResponseType>(`profile`, profile);
  },
  updatePhoto(photo: any) {
    const formData = new FormData();
    formData.append("image", photo);
    return instance.put<ResponseType<UpdatePhotoResponseDataType>>(
      `profile/photo`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
  },
};

type MeResponseType = {
  id: number;
  email: string;
  login: string;
};

type LoginResponseType = {
  userId: number;
};

type LoginResultCodeResponseType = ResultCodesEnum | ResultCodeForCaptchaEnum;

export const authAPI = {
  me() {
    return instance.get<ResponseType<MeResponseType>>(`auth/me`);
  },
  login(
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
  ) {
    return instance.post<
      ResponseType<LoginResponseType, LoginResultCodeResponseType>
    >(`auth/login`, {
      email: email,
      password: password,
      rememberMe: rememberMe,
      captcha: captcha,
    });
  },
  logout() {
    return instance.delete(`auth/login`);
  },
};

type GetCaptchaUrlResponseType = { url: string };

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get<GetCaptchaUrlResponseType>("security/get-captcha-url");
  },
};
