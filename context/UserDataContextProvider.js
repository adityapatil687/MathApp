import React, { createContext, useEffect, useState } from "react";

export const UserDataContext = createContext();

const UserDataContextProvider = ({ children }) => {
  const [userData, setUserData] = useState("");
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContextProvider;
