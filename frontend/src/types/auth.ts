import { Role } from "./role";

export type Credentials = {
  username: string;
  password: string;
};

export type AccessTokenPayload = {
  exp: number;
  username: string;
  authorities: Role[];
};
