import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { Weapon, WeaponsContextProps } from "./interfaces";
import axios, { AxiosError } from "axios";
import {
  handleEncryptJSON,
  handleDecryptReturnJSON,
} from "../../utils/encryptionUtils";
const WeaponsContext = createContext<WeaponsContextProps | undefined>(
  undefined,
);

const WeaponsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);

  const fetchAndDecryptWeapons = async () => {
    try {
      const response = await axios.get("/armas");
      const armasDesencriptadasConId = await Promise.all(
        response.data.map(
          async ({
            _id,
            createdAt,
            __v,
            ...resto
          }: {
            _id: string;
            createdAt: string;
            __v: number;
          }) => {
            try {
              const dataDesencriptada = await handleDecryptReturnJSON(
                JSON.stringify(resto),
                (error: Error) =>
                  console.error("Error decrypting weapons:", error),
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
      setWeapons(armasDesencriptadasConId);
    } catch (error: AxiosError | any) {
      if (error.response) {
        console.error("Error fetching weapons:", error.response.data);
      } else {
        console.error("Error fetching weapons:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchAndDecryptWeapons();
  }, []);

  const addWeapon = async (weapon: Weapon) => {
    try {
      await handleEncryptJSON(
        JSON.stringify(weapon),
        async (encryptedData: string) => {
          const response = await axios.post(
            "/armas",
            JSON.parse(encryptedData),
          );
          console.log("response", response);
          setWeapons((prevWeapons) => [
            ...prevWeapons,
            { ...weapon, id: response.data.id },
          ]);
        },
        (error: Error) => console.error("Error encrypting weapon:", error),
      );
    } catch (error) {
      console.error("Error adding weapon:", error);
    }
  };

  const updateWeapon = async (updateWeapon: Weapon) => {
    console.log("updateWeapon", updateWeapon);
    const { id, ...resto } = updateWeapon;
    try {
      await handleEncryptJSON(
        JSON.stringify(resto),
        async (encryptedData: string) => {
          await axios.patch(`/armas/${id}`, JSON.parse(encryptedData));
          await fetchAndDecryptWeapons();
        },
        (error: Error) => console.error("Error encrypting weapon:", error),
      );
    } catch (error) {
      console.error("Error updating weapon:", error);
    }
  };

  return (
    <WeaponsContext.Provider value={{ weapons, addWeapon, updateWeapon }}>
      {children}
    </WeaponsContext.Provider>
  );
};

const useWeapons = (): WeaponsContextProps => {
  const context = useContext(WeaponsContext);
  if (!context) {
    throw new Error("useWeapons must be used within a WeaponsProvider");
  }
  return context;
};

export { WeaponsProvider, useWeapons };
export type { Weapon, WeaponsContextProps };
