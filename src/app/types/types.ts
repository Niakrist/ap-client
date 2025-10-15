export interface IUser {
  id: number;
  name?: string;
  email?: string;
  avatarUrl?: string;
  country?: string;
  role: UserRole;
}

export enum UserRole {
  User = "USER",
  Admin = "ADMIN",
}

// Pick -> Забираем email и добавляем password
export interface IAuthFromData extends Pick<IUser, "email"> {
  password: string;
}
