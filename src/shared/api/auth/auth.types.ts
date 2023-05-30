export interface IRegisterBody {
  username: string;
  email: string;
  password: string;
}
export interface IAuthBody {
  username: string;
  password: string;
}
export interface IRefreshBody {
  id: string;
  refreshToken: string;
  accessToken: string;
}
export interface IAuthResponse {
  id: string;
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}
