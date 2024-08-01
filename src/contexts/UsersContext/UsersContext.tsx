import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { users as importedUsers } from "../../data/data";
import type { User, UsersContextProps } from "./interfaces";

const UsersContext = createContext<UsersContextProps | undefined>(undefined);

const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : importedUsers;
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (user: User) => {
    setUsers((prevUsers) => {
      if (prevUsers.some((u) => u.ci === user.ci)) {
        throw new Error("User with the same CI already exists");
      }
      return [...prevUsers, user];
    });
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
