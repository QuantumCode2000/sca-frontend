import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { weapons as importedWeapons } from "../../data/data";
import type { Weapon, WeaponsContextProps } from "./interfaces";

const WeaponsContext = createContext<WeaponsContextProps | undefined>(undefined);

const WeaponsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weapons, setWeapons] = useState<Weapon[]>(() => {
    const storedWeapons = localStorage.getItem("weapons");
    return storedWeapons ? JSON.parse(storedWeapons) : importedWeapons;
  });

  useEffect(() => {
    localStorage.setItem("weapons", JSON.stringify(weapons));
  }, [weapons]);

  const addWeapon = (weapon: Weapon) => {
    setWeapons((prevWeapons) => {
      if (prevWeapons.some((w) => w.codigo === weapon.codigo)) {
        throw new Error("Weapon with the same code already exists");
      }
      return [...prevWeapons, weapon];
    });
  };

  const removeWeapon = (codigo: string) => {
    setWeapons((prevWeapons) => {
      const weaponExists = prevWeapons.some((weapon) => weapon.codigo === codigo);
      if (!weaponExists) {
        throw new Error("Weapon not found");
      }
      return prevWeapons.filter((weapon) => weapon.codigo !== codigo);
    });
  };

  const updateWeapon = (updatedWeapon: Weapon) => {
    setWeapons((prevWeapons) => {
      const weaponExists = prevWeapons.some((weapon) => weapon.codigo === updatedWeapon.codigo);
      if (!weaponExists) {
        throw new Error("Weapon not found");
      }
      return prevWeapons.map((weapon) =>
        weapon.codigo === updatedWeapon.codigo ? updatedWeapon : weapon,
      );
    });
  };

  return (
    <WeaponsContext.Provider value={{ weapons, addWeapon, removeWeapon, updateWeapon }}>
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
