import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface SimulationContextType {
  currentYear: number;
  setCurrentYear: (year: number) => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
}

interface Props {
  children: ReactNode;
}

export function SimulationProvider({ children }: Props) {
  const [currentYear, setCurrentYear] = useState(0);

  return (
    <React.Fragment>
      <SimulationContext.Provider value={{ currentYear, setCurrentYear }}>
        {children}
      </SimulationContext.Provider>
    </React.Fragment>
  );
} 