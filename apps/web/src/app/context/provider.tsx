// This is an example of a context provider in a React application.
// It creates a context to share data across components.
// This prevents prop drilling and makes data accessible globally within the provider's scope.

"use client";

import type { ReactNode } from "react";
import { createContext, useContext } from "react";

type DataContextType =
  | {
      data: { hello: string };
    }
  | undefined;

const DataContext = createContext<DataContextType>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const data = {
    hello: "world",
  };

  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
}

export function useDataProvider() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataProvider must be used within a DataProvider");
  }
  return context;
}
