import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios, { AxiosError } from "axios"; // Importamos AxiosError
import type { User, UsersContextProps } from "./interfaces";
import {
  handleEncryptJSON,
  handleDecryptReturnJSON,
} from "../../utils/encryptionUtils";

axios.defaults.baseURL = "http://127.0.0.1:4000/api/v1";

const UsersContext = createContext<UsersContextProps | undefined>(undefined);

const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  // Mover fetchAndDecryptUsers fuera del useEffect para que pueda ser utilizado en otras funciones
  const fetchAndDecryptUsers = async () => {
    try {
      const response = await axios.get("/usuarios");
      const usuariosDesencriptadosConId = await Promise.all(
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
                  console.error("Error decrypting users:", error),
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
      setUsers(usuariosDesencriptadosConId);
    } catch (error: AxiosError | any) {
      if (error.response) {
        console.error("Error fetching users:", error.response.data);
      } else {
        console.error("Error fetching users:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchAndDecryptUsers();
  }, []);

  const addUser = async (user: User) => {
    try {
      await handleEncryptJSON(
        JSON.stringify(user),

        async (encryptedData: string) => {
          const response = await axios.post(
            "/usuarios",
            JSON.parse(encryptedData),
          );

          setUsers((prevUsers) => [
            ...prevUsers,
            { ...user, id: response.data.id },
          ]);
        },
        (error: Error) => console.error("Error encrypting user:", error),
      );
    } catch (error: any) {
      console.error("Error adding user:", error.message);
    }
  };

  const updateUser = async (updatedUser: Partial<User>) => {
    console.log(updatedUser);
    const { id, ...resto } = updatedUser;
    try {
      await handleEncryptJSON(
        JSON.stringify(resto),
        async (encryptedData: string) => {
          await axios.patch(`/usuarios/${id}`, JSON.parse(encryptedData));
          await fetchAndDecryptUsers();
        },
        (error: Error) => console.error("Error encrypting user:", error),
      );
    } catch (error: any) {
      console.error("Error updating user:", error.message);
    }
  };

  const removeUser = async (ci: string) => {
    console.log(ci);
  };

  return (
    <UsersContext.Provider value={{ users, addUser, updateUser, removeUser }}>
      {children}
    </UsersContext.Provider>
  );
};

const useUsers = (): UsersContextProps => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};

export { UsersProvider, useUsers };
export type { User };
