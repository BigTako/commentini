export interface ILoginDto {
  email: string;
  password: string;
}

export interface ISignupDto {
  email: string;
  username: string;
  password: string;
}

export interface IJwtResponce {
  token: string;
}

export enum AuthProvider {
  GOOGLE,
  LOCAL,
}

export interface IUserProfile {
  id: string;
  email: string;
  username: string;
  authProvider: AuthProvider;
  createdAt: Date;
}
