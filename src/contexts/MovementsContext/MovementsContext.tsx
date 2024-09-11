import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios, { AxiosError } from "axios";
import type { Movement, MovementsContextProps } from "./interfaces";
import {
  handleEncryptJSON,
  handleDecryptReturnJSON,
} from "../../utils/encryptionUtils";

axios.defaults.baseURL = "http://127.0.0.1:4000/api/v1";

const MovementsContext = createContext<MovementsContextProps | undefined>(
  undefined,
);

const MovementsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [movements, setMovements] = useState<Movement[]>([]);

  const fetchAndDecryptMovements = async () => {
    try {
      const response = await axios.get("/movimientos");
      const movimientosDesencriptadosConId = await Promise.all(
        response.data.map(
          async ({
            _id,
            createdAt,
            deletedAt,
            updatedAt,
            __v,
            ...resto
          }: {
            _id: string;
            createdAt: string;
            deletedAt: string;
            updatedAt: string;
            __v: number;
          }) => {
            try {
              const dataDesencriptada = await handleDecryptReturnJSON(
                JSON.stringify(resto),
                (error: Error) =>
                  console.error("Error decrypting movements:", error),
              );

              return {
                ...JSON.parse(dataDesencriptada as string),
                id: _id,
              };
            } catch (error) {
              console.error("Error during decryption", error);
              return { ...resto, id: _id };
            }
          },
        ),
      );
      setMovements(movimientosDesencriptadosConId);
    } catch (error: AxiosError | any) {
      if (error.response) {
        console.error("Error fetching movements:", error.response.data);
      } else {
        console.error("Error fetching movements:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchAndDecryptMovements();
  }, []);

  const addMovement = async (movement: Movement) => {
    try {
      await handleEncryptJSON(
        JSON.stringify(movement),
        async (encryptedData: string) => {
          const response = await axios.post(
            "/movimientos",
            JSON.parse(encryptedData),
          );
          setMovements((prevMovements) => [
            ...prevMovements,
            { ...movement, id: response.data.id },
          ]);
        },
        (error: Error) => console.error("Error encrypting movement:", error),
      );
    } catch (error) {
      console.error("Error adding movement:", error);
    }
  };

  const updateMovement = async (updatedMovement: Movement) => {
    const { id, ...resto } = updatedMovement;
    try {
      await handleEncryptJSON(
        JSON.stringify(resto),
        async (encryptedData: string) => {
          await axios.patch(`/movimientos/${id}`, JSON.parse(encryptedData));
          await fetchAndDecryptMovements();
        },
        (error: Error) => console.error("Error encrypting movement:", error),
      );
    } catch (error) {
      console.error("Error updating movement:", error);
    }
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
