import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { movimientos as importedMovements } from "../../data/movements";
import type { Movement, MovementsContextProps } from "./interfaces";

const MovementsContext = createContext<MovementsContextProps | undefined>(
  undefined,
);

const MovementsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [movements, setMovements] = useState<Movement[]>(() => {
    const storedMovements = localStorage.getItem("movements");
    return storedMovements ? JSON.parse(storedMovements) : importedMovements;
  });

  useEffect(() => {
    localStorage.setItem("movements", JSON.stringify(movements));
  }, [movements]);

  const addMovement = (movement: Movement) => {
    setMovements((prevMovements) => {
      if (prevMovements.some((m) => m.id === movement.id)) {
        throw new Error("Movement with the same ID already exists");
      }
      return [...prevMovements, movement];
    });
  };

  const removeMovement = (id: number) => {
    setMovements((prevMovements) => {
      const movementExists = prevMovements.some(
        (movement) => movement.id === id,
      );
      if (!movementExists) {
        throw new Error("Movement not found");
      }
      return prevMovements.filter((movement) => movement.id !== id);
    });
  };

  const updateMovement = (updatedMovement: Movement) => {
    setMovements((prevMovements) => {
      const movementExists = prevMovements.some(
        (movement) => movement.id === updatedMovement.id,
      );
      if (!movementExists) {
        throw new Error("Movement not found");
      }
      return prevMovements.map((movement) =>
        movement.id === updatedMovement.id ? updatedMovement : movement,
      );
    });
  };

  return (
    <MovementsContext.Provider
      value={{ movements, addMovement, removeMovement, updateMovement }}
    >
      {children}
    </MovementsContext.Provider>
  );
};

const useMovements = (): MovementsContextProps => {
  const context = useContext(MovementsContext);
  if (!context) {
    throw new Error("useMovements must be used within a MovementsProvider");
  }
  return context;
};

export { MovementsProvider, useMovements };
