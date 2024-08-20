interface Weapon {
    codigo: string;
    nroarma: string;
    estado: string;
    clasification: string;
    propietario: string;
    modelo: string;
    calibre: string;
    observations: string;
    industria: string;
    armamento: string;
}

interface WeaponsContextProps {
  weapons: Weapon[];
  addWeapon: (weapon: Weapon) => void;
  // removeWeapon: (codigo: string) => void;
  updateWeapon: (weapon: Weapon) => void;
}

export type { Weapon, WeaponsContextProps };
