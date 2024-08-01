interface Movement {
  id: number;
  fechaSalida: string;
  fechaRegreso: string;
  codigo: string;
  solicitante: string;
  motivo: string;
  actaSalida: string;
  actaRegreso: string;
}

interface MovementsContextProps {
  movements: Movement[];
  addMovement: (movement: Movement) => void;
  removeMovement: (id: number) => void;
  updateMovement: (movement: Movement) => void;
}

export type { Movement, MovementsContextProps };