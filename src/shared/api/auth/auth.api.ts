import { RequestData, apiInstance } from "shared";
import { IRegisterBody } from ".";

export const authAPI = {
  async signUp(body: IRegisterBody): Promise<RequestData<string>> {
    try {
      const { data } = await apiInstance.post("/auth/sign-up", body);
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  },
};
