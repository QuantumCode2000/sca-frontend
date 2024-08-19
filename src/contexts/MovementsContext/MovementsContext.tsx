import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { movimientos as importedMovements } from "../../data/movements";
import type { Movement, MovementsContextProps } from "./interfaces";
import {
  handleEncryptJSON,
  handleDecryptObjects,
  handleEncryptObjects,
} from "../../utils/encryptionUtils";

const MovementsContext = createContext<MovementsContextProps | undefined>(
  undefined,
);

const MovementsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [encryptedMovements, setEncryptedMovements] = useState<Movement[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const storedMovements = localStorage.getItem("movements");
    const itemExists = storedMovements !== null ? true : false;
    if (itemExists) {
      setEncryptedMovements(JSON.parse(storedMovements) as Movement[]);
      handleDecryptObjects(
        storedMovements,
        (decryptedData) =>
          setMovements(JSON.parse(decryptedData) as Movement[]),
        setError,
      );
    } else {
      handleEncryptObjects(
        JSON.stringify(importedMovements),
        (encryptedData) => {
          handleDecryptObjects(
            encryptedData,
            (decryptedData) =>
              setMovements(JSON.parse(decryptedData) as Movement[]),
            setError,
          );
          localStorage.setItem("movements", encryptedData);
          setEncryptedMovements(JSON.parse(encryptedData) as Movement[]);
        },
        setError,
      );
    }
  }, []);

  useEffect(() => {
    if (movements.length > 0) {
      localStorage.setItem("movements", JSON.stringify(encryptedMovements));
      handleDecryptObjects(
        localStorage.getItem("movements"),
        (decryptedData) =>
          setMovements(JSON.parse(decryptedData) as Movement[]),
        setError,
      );
    }
  }, [encryptedMovements]);

  const addMovement = async (movement: Movement) => {
    console.log(movement);
    try {
      await handleEncryptJSON(
        JSON.stringify(movement),
        (encryptedData) => {
          setEncryptedMovements((prevMovements) => {
            if (prevMovements.some((m) => m.id === movement.id)) {
              throw new Error("Movement already exists");
            }
            const encryptedMovement = JSON.parse(encryptedData);
            return [...prevMovements, encryptedMovement];
          });
        },
        setError,
      );
    } catch (error) {
      setError(`Error adding movement: ${error}`);
    }
  };

  // const removeMovement = (id: number) => {
  //   setMovements((prevMovements) => {
  //     const movementExists = prevMovements.some(
  //       (movement) => movement.id === id,
  //     );
  //     if (!movementExists) {
  //       throw new Error("Movement not found");
  //     }
  //     return prevMovements.filter((movement) => movement.id !== id);
  //   });
  // };

  const updateMovement = async (updatedMovement: Movement) => {
    handleDecryptObjects(
      localStorage.getItem("movements"),
      (decryptedData) => {
        const decryptedMovements = JSON.parse(decryptedData) as Movement[];
        const updatedMovements = decryptedMovements.map((movement) => {
          if (movement.id === updatedMovement.id) {
            return updatedMovement;
          }
          return movement;
        });
        setMovements(updatedMovements);
        handleEncryptObjects(
          JSON.stringify(updatedMovements),
          (encryptedData) => {
            setEncryptedMovements(JSON.parse(encryptedData) as Movement[]);
          },
          setError,
        );
      },
      setError,
    );
  };

  return (
    <MovementsContext.Provider
      value={{ movements, addMovement, updateMovement }}
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
