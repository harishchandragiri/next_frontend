"use client";

import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const MyContext = createContext();
const API_URL = process.env.NEXT_PUBLIC_API;

export const MyContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);

  // ✅ Reusable fetchUser function
  const fetchUser = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/api/users/me?populate=image`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = res.data.data || res.data;

      if (userData.image?.url && !userData.image.url.startsWith("http")) {
        userData.image.url = `${API_URL}${userData.image.url}`;
      }

      console.log("Fetched user data:", userData);
      setUser(userData);
      setImage(userData.image || null);
    } catch (err) {
      console.error("Fetch user error:", err.response?.data || err.message);
      setUser(null);
      setImage(null);
      localStorage.removeItem("jwt");
    }
  };

  // Load user when provider mounts
  useEffect(() => {
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    setImage(null);
  };

  return (
    <MyContext.Provider
      value={{ user, setUser, logout, image, setImage, fetchUser }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
