import React, { createContext, useEffect, useState } from "react";

export const TabDisplayContext = createContext();

const TabDisplayContextProvider = ({ children }) => {
  const [tabDisplay, setTabDisplay] = useState("flex");
  const [headerState, setHeaderState] = useState(true);
  useEffect(() => {
    console.log(tabDisplay);
  }, [tabDisplay]);
  return (
    <TabDisplayContext.Provider value={{ tabDisplay, setTabDisplay, headerState, setHeaderState }}>
      {children}
    </TabDisplayContext.Provider>
  );
};

export default TabDisplayContextProvider;
