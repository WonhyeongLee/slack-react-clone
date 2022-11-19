export interface Id{
  id: number;
}
export interface NewUser {
  email: string;
  nickname?: string;
  password?: string;
}

export type User = Id & NewUser;