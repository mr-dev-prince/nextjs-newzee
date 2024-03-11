"use client";

import { auth } from "@/config/firebase.config.js";
import { onAuthStateChanged } from "firebase/auth";

const { createContext, useState } = require("react");

export const userContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (User) => {
    if (User) {
      setUser(User);
    } else {
      setUser(null);
    }
  });

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};
