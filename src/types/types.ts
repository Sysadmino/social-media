export type PostType = {
  id: number;
  message: string;
  likesCount: number;
};

export type ContactType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};

export type UserInfoType = {
  small: string | null;
  large: string | null;
};

export type PhotoType = {
  small: string | null;
  large: string | null;
};

export type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  aboutMe: string;
  contacts: ContactType;
  photos: PhotoType;
};

export type UserType = {
  id: number;
  name: string;
  status: string;
  photos: {
    small: string | null;
    large: string | null;
  };
  followed: boolean;
};
