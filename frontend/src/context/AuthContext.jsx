import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import api, { setAccessToken, logout as performLogout } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  // const [tokenReady, setTokenReady] = useState(false);
  const [tokenReady, setTokenReady] = useState(() => {
    return !!localStorage.getItem("accessToken");
  });

  // Wait for token on load
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setTokenReady(true);
  }, []);

  const fetcher = (url) => api.get(url).then((res) => res.data);

  // Only fetch if token exists
  const {
    data: user,
    error,
    mutate,
  } = useSWR(tokenReady ? "/auth/me" : null, fetcher, {
    shouldRetryOnError: false,
  });

  const login = async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    const { accessToken, user } = res.data;

    setAccessToken(accessToken);
    setTokenReady(true); // Tell SWR we can now fetch /auth/me
    await mutate(); // Trigger revalidation
    return user;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {}
    performLogout(); // clears token + redirects
    setTokenReady(false);
    await mutate(null);
  };

  const isLoading = tokenReady && !user && !error;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
