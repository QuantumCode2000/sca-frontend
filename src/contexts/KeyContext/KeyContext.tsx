import React, { createContext, useContext, useState, ReactNode } from "react";

// Define la interfaz del contexto
interface KeyContextProps {
  privateKey: string;
  setPrivateKey: (key: string) => void;
}

// Crea el contexto con valores iniciales
const KeyContext = createContext<KeyContextProps | undefined>(undefined);

// Proveedor de contexto para envolver la aplicación
export const KeyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [privateKey, setPrivateKey] = useState<string>("");

  return (
    <KeyContext.Provider value={{ privateKey, setPrivateKey }}>
      {children}
    </KeyContext.Provider>
  );
};

// Hook para usar el contexto
export const useKey = (): KeyContextProps => {
  const context = useContext(KeyContext);
  if (!context) {
    throw new Error("useKey must be used within a KeyProvider");
  }
  return context;
};
