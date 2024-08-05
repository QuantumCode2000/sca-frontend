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
  const [users, setUsers] = useState<User[]>([]);
  const [encryptedUsers, setEncryptedUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    const itemExists = storedUsers !== null ? true : false;
    if (itemExists) {
      setEncryptedUsers(JSON.parse(storedUsers) as User[]);
      handleDecryptObjects(
        storedUsers,
        (decryptedData) => setUsers(JSON.parse(decryptedData) as User[]),
        setError,
      );
    } else {
      handleEncryptObjects(
        JSON.stringify(importedUsers),
        (encryptedData) => {
          handleDecryptObjects(
            encryptedData,
            (decryptedData) => setUsers(JSON.parse(decryptedData) as User[]),
            setError,
          );
          localStorage.setItem("users", encryptedData);
          setEncryptedUsers(JSON.parse(encryptedData) as User[]);
        },
        setError,
      );
    }
  }, []);
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(encryptedUsers));
      handleDecryptObjects(
        localStorage.getItem("users"),
        (decryptedData) => setUsers(JSON.parse(decryptedData) as User[]),
        setError,
      );
    }
  }, [encryptedUsers]);

  const addUser = async (user: User) => {
    try {
      await handleEncryptJSON(
        JSON.stringify(user),
        (encryptedData) => {
          setEncryptedUsers((prevUsers) => {
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

  const updateUser = async (updatedUser: User) => {
    handleDecryptObjects(
      localStorage.getItem("users"),
      (decryptedData) => {
        const decryptedUsers = JSON.parse(decryptedData) as User[];
        const updatedUsers = decryptedUsers.map((user) => {
          if (user.ci === updatedUser.ci) {
            return updatedUser;
          }
          return user;
        });
        setUsers(updatedUsers);
        handleEncryptObjects(
          JSON.stringify(updatedUsers),
          (encryptedData) => {
            setEncryptedUsers(JSON.parse(encryptedData) as User[]);
          },
          setError,
        );
      },
      setError,
    );
  };

  return (
    <UsersContext.Provider value={{ users, addUser, updateUser }}>
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
