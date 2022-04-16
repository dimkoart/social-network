export type UserPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type UserTokenPayload = {
  id: number,
  email: string;
}

export type IUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string
  // isLogin: boolean;
  isMailSubscribe: boolean;
}