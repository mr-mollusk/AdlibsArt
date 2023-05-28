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
  refreshToken: string;
}
export interface IAuthResponse {
  id: string;
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}
