"use client";

import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const MyContext = createContext();
const API_URL = "http://localhost:1337";

export const MyContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [values, setValues] = useState(null);
  const [ID, setID] = useState(null);

  // 🔑 Load token from localStorage and fetch user
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ pass JWT
          },
        });

        console.log("Fetched user on refresh:", res.data);
        setUser(res.data);
      } catch (err) {
        console.log("Fetch user error:", err.response?.data || err.message);
        setUser(null);
        localStorage.removeItem("jwt"); // clear invalid token
      }
    };

    fetchUser();
  }, []);

  // 🔐 Logout function
  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
  };

  return (
    <MyContext.Provider value={{ user, setUser, logout, values, setValues, ID, setID }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
