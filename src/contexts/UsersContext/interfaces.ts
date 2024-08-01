interface User {
  ci: string;
  extension: string;
  grado: string;
  especialidad: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  cm: string;
  correo: string;
  inSystemPermission: string;
  rol: string;
  estado: string;
}

interface UsersContextProps {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (ci: string) => void;
  updateUser: (user: User) => void;
}

export type { User, UsersContextProps };
