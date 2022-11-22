// export interface Id{
//   id: number;
// }
export interface NewUser {
  id: number;
  email: string;
  nickname?: string;
  password?: string;
}

export type User = NewUser;