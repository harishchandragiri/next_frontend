"use client";

import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const MyContext = createContext();

const API_URL = "http://localhost:1337";

export const MyContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [values, setValues] = useState(null);
  const [ID, setID] = useState(null);

    useEffect(()=>{
    axios.get(`${API_URL}/api/users`, {withCredentials:true})
    .then(res =>{
      // res have email and username get from the backend '/' route
      setUser(res.data[0])
    })
    .catch(err => console.log(err))
  }, [])


  return (
    <MyContext.Provider value={{ user, setUser, values, setValues }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
