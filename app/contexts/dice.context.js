import React, { createContext, useState } from "react";

export const DiceContext = createContext();

export const DiceProvider = ({ children }) => {
  const [isDiceRolled, setIsDiceRolled] = useState(false);

  return (
    <DiceContext.Provider value={{ isDiceRolled, setIsDiceRolled }}>
      {children}
    </DiceContext.Provider>
  );
};
