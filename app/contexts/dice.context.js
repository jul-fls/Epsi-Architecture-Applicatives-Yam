import React, { createContext, useState } from "react";

export const DiceContext = createContext();

export const DiceProvider = ({ children }) => {
  const [isDiceAnimated, setIsDiceAnimated] = useState(false);

  return (
    <DiceContext.Provider value={{ isDiceAnimated, setIsDiceAnimated }}>
      {children}
    </DiceContext.Provider>
  );
};
