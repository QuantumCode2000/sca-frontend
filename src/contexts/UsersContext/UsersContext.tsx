import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { users as importedUsers } from "../../data/data";
import type { User, UsersContextProps } from "./interfaces";
import {
  handleEncryptJSON,
  handleDecryptObjects,
  handleEncryptObjects,
} from "../../utils/encryptionUtils";

const UsersContext = createContext<UsersContextProps | undefined>(undefined);

const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Este es el user que pasare a los demas componentes
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Verificar si existe el item 'users' en el localStorage
    const storedUsers = localStorage.getItem("users");
    const itemExists = storedUsers !== null ? true : false;
    if (itemExists) {
      // Si existe, desencriptar y establecer en el estado 'users'
      console.log("hay users en el local storage");
      console.log(storedUsers);
      handleDecryptObjects(
        storedUsers,
        (decryptedData) => setUsers(JSON.parse(decryptedData) as User[]),
        setError,
      );
    } else {
      console.log("no hay users en el local storage");
      // Si no existe, encriptar 'importedUsers' y guardarlos en el localStorage
      handleEncryptObjects(
        JSON.stringify(importedUsers),
        (encryptedData) => {
          handleDecryptObjects(
            encryptedData,
            (decryptedData) => setUsers(JSON.parse(decryptedData) as User[]),
            setError,
          );
          localStorage.setItem("users", encryptedData);
        },
        setError,
      );
    }
  }, []);
  useEffect(() => {
    if (users.length > 0) {
      // Encriptar 'users' y guardar en el localStorage
      handleEncryptObjects(
        users,
        (encryptedData) => {
          localStorage.setItem("users", JSON.stringify(encryptedData));
        },
        setError,
      );
    }
  }, [users]);

  const addUser = async (user) => {
    console.log("Adding user from Context", user);
    try {
      await handleEncryptJSON(
        JSON.stringify(user),
        (encryptedData) => {
          setUsers((prevUsers) => {
            if (prevUsers.some((u) => u.ci === user.ci)) {
              throw new Error("User with the same CI already exists");
            }
            const encryptedUser = JSON.parse(encryptedData);
            return [...prevUsers, encryptedUser];
          });
        },
        setError,
      );
    } catch (error) {
      console.error("Error encrypting user:", error);
    }
  };

  const removeUser = (ci: string) => {
    setUsers((prevUsers) => {
      const userExists = prevUsers.some((user) => user.ci === ci);
      if (!userExists) {
        throw new Error("User not found");
      }
      return prevUsers.filter((user) => user.ci !== ci);
    });
  };

  const updateUser = (updatedUser: User) => {
    setUsers((prevUsers) => {
      const userExists = prevUsers.some((user) => user.ci === updatedUser.ci);
      if (!userExists) {
        throw new Error("User not found");
      }
      return prevUsers.map((user) =>
        user.ci === updatedUser.ci ? updatedUser : user,
      );
    });
  };

  return (
    <UsersContext.Provider value={{ users, addUser, removeUser, updateUser }}>
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
