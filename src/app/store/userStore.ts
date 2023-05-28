import { makeAutoObservable } from "mobx";
import { RootStore } from "./rootStore";
import { authAPI } from "shared/api/auth/auth.api";
export class UserStore {
  username: string;
  email: string;
  password: string;

  accessToken: string;
  refreshToken: string;

  constructor(public rootStore: RootStore) {
    this.username = "";
    this.email = "";
    this.password = "";
    this.accessToken = "";
    this.refreshToken = "";
    makeAutoObservable(this);
  }

  async login(username: string, password: string) {
    const requestBody = { username: username, password: password };
    const [error, data] = await authAPI.signIn(requestBody);
    if (!error) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      console.log(data);
    }
  }
  async refresh() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const [error, data] = await authAPI.refresh({
        refreshToken: refreshToken,
      });
      if (!error) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        console.log(data);
      }
    }
  }
  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}
