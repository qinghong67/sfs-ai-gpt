import React, { createContext, useContext } from 'react';

export const DataContext = createContext<any>(null);

export const useCMSData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useCMSData must be used within a DataProvider");
  }
  return context;
};