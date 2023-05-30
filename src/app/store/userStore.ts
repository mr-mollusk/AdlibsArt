import { makeAutoObservable } from "mobx";
import { RootStore } from "./rootStore";
import { authAPI } from "shared/api/auth/auth.api";
export class UserStore {
  username: string;
  email: string;
  password: string;
  isLogin: boolean;
  accessToken: string;
  refreshToken: string;

  constructor(public rootStore: RootStore) {
    this.username = "";
    this.email = "";
    this.password = "";
    this.accessToken = "";
    this.refreshToken = "";
    this.isLogin = false;
    makeAutoObservable(this);
  }

  async login(username: string, password: string) {
    this.isLogin = true;
    const requestBody = { username: username, password: password };
    const [error, data] = await authAPI.signIn(requestBody);
    if (!error) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("userID", data.id);
    }
  }
  async refresh() {
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userID");

    if (refreshToken && accessToken && userId) {
      this.refreshToken = refreshToken;
      const [error, data] = await authAPI.refresh({
        refreshToken: refreshToken,
        accessToken: accessToken,
        id: userId,
      });
      if (!error) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("userID", data.id);
      }
    }
  }
  logout() {
    this.isLogin = true;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userID");
  }
}
