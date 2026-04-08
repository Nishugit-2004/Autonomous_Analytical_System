import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [results, setResults] = useState(null);
  const [simpleMode, setSimpleMode] = useState(false);

  return (
    <AppContext.Provider value={{
      dataLoaded, setDataLoaded,
      results, setResults,
      simpleMode, setSimpleMode
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
