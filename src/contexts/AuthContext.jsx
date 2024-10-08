import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const api = axios.create({
    baseURL: "https://blog-react-api-pied.vercel.app/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await api.get("/users/me");
      setUser(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      const { accessToken, user } = response.data;
      localStorage.setItem("token", accessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      setUser(user);
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const register = async (email, password) => {
    try {
      const response = await api.post("/users", {
        email,
        password,
      });
      const { accessToken, user } = response.data;
      localStorage.setItem("token", accessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      setUser(user);
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, register, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
