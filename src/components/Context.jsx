// Context.js
import React, { createContext, useState } from 'react';

export const MyContext = createContext();

function Context({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <MyContext.Provider value={{ darkTheme, setDarkTheme }}>
      {children}
    </MyContext.Provider>
  );
}

export default Context;
