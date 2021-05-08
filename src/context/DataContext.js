import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import DRIVERS_DATA from './data';

const Context = React.createContext({ data: [] });

function DataProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => setTimeout(() => setData(DRIVERS_DATA), 1000), []);

  return (
    <Context.Provider
      value={{
        data
      }}
    >
      {children}
    </Context.Provider>
  );
}

function useData() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useData must be used within a DataContextProvider');
  }
  return context;
}

export { DataProvider, useData };
