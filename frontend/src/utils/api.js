import axios from "axios";

export const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  window.location.href = "/login";
};

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } 
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      console.warn("🔁 401 detected, attempting token refresh");
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newToken = res.data.accessToken;
        // console.log("New access token:", newToken);

        setAccessToken(newToken); // <== Save token here!
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (refreshErr) {
        console.error("Refresh token failed:", refreshErr);
        logout();
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
