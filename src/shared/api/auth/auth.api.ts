import { RequestData, apiInstance } from "shared";
import { IRegisterBody } from ".";
import { IAuthBody, IAuthResponse, IRefreshBody } from "./auth.types";

export const authAPI = {
  async signUp(body: IRegisterBody): Promise<RequestData<string>> {
    try {
      const response = await apiInstance.post("/auth/sign-up", body);
      console.log(response);

      if (response.status === 200) {
        return [false, response.data];
      }
      //@ts-ignore
      if (response.response.status === 400) {
        console.log(1);

      //@ts-ignore
        return [true, response.response.data];
      }
      return [false, response.data];
    } catch (error) {
      return [true, error];
    }
  },
  async signIn(body: IAuthBody): Promise<RequestData<IAuthResponse>> {
    try {
      const { data } = await apiInstance.post("/auth/sign-in", body);
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  },
  async refresh(body: IRefreshBody): Promise<RequestData<IAuthResponse>> {
    try {
      const { data } = await apiInstance.post("/auth/refresh", body);
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  },
};
