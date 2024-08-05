import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { weapons as importedWeapons } from "../../data/data";
import type { Weapon, WeaponsContextProps } from "./interfaces";
import {
  handleEncryptJSON,
  handleDecryptObjects,
  handleEncryptObjects,
} from "../../utils/encryptionUtils";
const WeaponsContext = createContext<WeaponsContextProps | undefined>(
  undefined,
);

const WeaponsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [encryptedWeapons, setEncryptedWeapons] = useState<Weapon[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const storedWeapons = localStorage.getItem("weapons");
    const itemExists = storedWeapons !== null ? true : false;
    if (itemExists) {
      setEncryptedWeapons(JSON.parse(storedWeapons) as Weapon[]);
      handleDecryptObjects(
        storedWeapons,
        (decryptedData) => setWeapons(JSON.parse(decryptedData) as Weapon[]),
        setError,
      );
    } else {
      handleEncryptObjects(
        JSON.stringify(importedWeapons),
        (encryptedData) => {
          handleDecryptObjects(
            encryptedData,
            (decryptedData) =>
              setWeapons(JSON.parse(decryptedData) as Weapon[]),
            setError,
          );
          localStorage.setItem("weapons", encryptedData);
          setEncryptedWeapons(JSON.parse(encryptedData) as Weapon[]);
        },
        setError,
      );
    }
  }, []);

  useEffect(() => {
    if (weapons.length > 0) {
      localStorage.setItem("weapons", JSON.stringify(encryptedWeapons));
      handleDecryptObjects(
        localStorage.getItem("weapons"),
        (decryptedData) => setWeapons(JSON.parse(decryptedData) as Weapon[]),
        setError,
      );
    }
  }, [encryptedWeapons]);

  const addWeapon = async (weapon: Weapon) => {
    try {
      await handleEncryptJSON(
        JSON.stringify(weapon),
        (encryptedData) => {
          setEncryptedWeapons((prevWeapons) => {
            if (prevWeapons.some((w) => w.codigo === weapon.codigo)) {
              throw new Error("Weapon already exists");
            }
            const encryptedWeapon = JSON.parse(encryptedData);
            return [...prevWeapons, encryptedWeapon];
          });
        },
        setError,
      );
    } catch (error) {
      setError(`Error adding weapon: ${error}`);
    }
  };
  const updateWeapon = async (updateWeapon: Weapon) => {
    handleDecryptObjects(
      localStorage.getItem("weapons"),
      (decryptedData) => {
        const decryptedWeapons = JSON.parse(decryptedData) as Weapon[];
        const updatedWeapons = decryptedWeapons.map((weapon) => {
          if (weapon.codigo === updateWeapon.codigo) {
            return updateWeapon;
          }
          return weapon;
        });
        setWeapons(updatedWeapons);
        handleEncryptObjects(
          JSON.stringify(updatedWeapons),
          (encryptedData) => {
            setEncryptedWeapons(JSON.parse(encryptedData) as Weapon[]);
          },
          setError,
        );
      },
      setError,
    );
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
