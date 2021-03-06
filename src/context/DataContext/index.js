import React, { useState, useContext, useMemo } from 'react';
import { useEffect } from 'react';
import DRIVERS_DATA from './data';
import { getTransformedData } from './utils';

const initialStateContext = {
  drivers: {},
  rankingByRace: {},
  globalRanking: {},
  isTVMode: false
};
const Context = React.createContext(initialStateContext);

function DataProvider({ children }) {
  const [data, setData] = useState(initialStateContext);
  const [isTVMode, setIsTVMode] = useState(false);

  const transformedData = useMemo(() => getTransformedData(DRIVERS_DATA), []);
  useEffect(() => setTimeout(() => setData(transformedData), 1000), [transformedData]);

  return <Context.Provider value={{ ...data, isTVMode, setIsTVMode }}>{children}</Context.Provider>;
}

function useData() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useData must be used within a DataContextProvider');
  }
  return context;
}

export { DataProvider, useData };
