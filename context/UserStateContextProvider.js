import React, { createContext, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth"; // Import Firebase authentication
const UserStateContext = createContext();

const UserStateContextProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    console.log(isSignedIn);
  }, [isSignedIn]);
  useEffect(() => {
    // Check if user is already signed in
    // const unsubscribe = auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     setIsSignedIn(true);
    //   } else {
    //     setIsSignedIn(false);
    //   }
    // });

    return () => unsubscribe();
  }, []);
  return (
    <UserStateContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {children}
    </UserStateContext.Provider>
  );
};

export default UserStateContextProvider;
export { UserStateContext };
