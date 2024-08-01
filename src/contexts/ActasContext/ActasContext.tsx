import React from "react";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

const ActasContext = createContext<undefined>(undefined);

const ActasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const encargados = [
    {
      id: 1,
      nombre: "Tte. Frag. CGON. Aldair Paredes",
      cargo: "ENC. DE PANOL DEL ARMAMENTO DEL CGAB.",
    },
    {
      id: 2,
      nombre: "Tte. Nav. CGON. Javier Noriega Barriga",
      cargo: 'JEFE DIV. "C" MATERIAL BELICO',
    },
    {
      id: 3,
      nombre: "Cap. Frag. DAEN. Max Gustavo Paredes",
      cargo: "SUB-JEFE DE DPTO. IV-LOG",
    },
    {
      id: 4,
      nombre: "Cap. Nav. DAEN. Juan Carlos Rodriguez",
      cargo: "JEFE DEL DEPARTAMENTO IV-LOG DEL EMGAB",
    },
  ];

  return (
    <ActasContext.Provider value={{ encargados }}>
      {children}
    </ActasContext.Provider>
  );
};

const useActas = () => {
  const context = useContext(ActasContext);
  if (context === undefined) {
    throw new Error("useActas must be used within a ActasProvider");
  }
  return context;
};

export { ActasProvider, useActas };
