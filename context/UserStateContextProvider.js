import React, { createContext, useEffect, useState } from "react";

const UserStateContext = createContext();

const UserStateContextProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    console.log(isSignedIn);
  }, [isSignedIn]);
  return (
    <UserStateContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {children}
    </UserStateContext.Provider>
  );
};

export default UserStateContextProvider;
export {UserStateContext}
