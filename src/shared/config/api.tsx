import axios from "axios";
import { authAPI } from "shared/api/auth/auth.api";

export const apiInstance = axios.create({
  baseURL: "https://25.39.246.253:50443/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
apiInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (response) => {
    if (response.response.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userID");
      if (refreshToken && accessToken && userId) {
        const [error, data] = await authAPI.refresh({
          refreshToken: refreshToken,
          accessToken: accessToken,
          id: userId,
        });
        if (!error) {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem("userID", data.id);
          location.reload();
        }
      }
    }
    return response;
  }
);
