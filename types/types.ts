export interface NewUser {
  email: string;
  nickname?: string;
  password?: string;
  token?: string;
}

export type User = NewUser;