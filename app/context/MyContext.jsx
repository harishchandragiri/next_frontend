"use client";

import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const MyContext = createContext();
const API_URL = "http://localhost:1337";

export const MyContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from JWT
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/api/users/me?populate=*`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = res.data.data || res.data;

        if (userData.image?.url && !userData.image.url.startsWith("http")) {
          userData.image.url = `${API_URL}${userData.image.url}`;
        }
        
        console.log("Fetched user data:", userData);
        setUser(userData);
      } catch (err) {
        console.error("Fetch user error:", err.response?.data || err.message);
        setUser(null);
        localStorage.removeItem("jwt");
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
  };

  return (
    <MyContext.Provider value={{ user, setUser, logout }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
