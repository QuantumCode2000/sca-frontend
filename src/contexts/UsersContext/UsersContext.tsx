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

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import axios from "axios";
// import type { User, UsersContextProps } from "./interfaces";
// import {
//   handleEncryptJSON,
//   handleDecryptObjects,
// } from "../../utils/encryptionUtils";

// // Configura la URL base de axios
// axios.defaults.baseURL = "http://127.0.0.1:5000";

// const UsersContext = createContext<UsersContextProps | undefined>(undefined);

// const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [error, setError] = useState<string>("");

//   console.log("usuarios desencriptados", users);

//   useEffect(() => {
//     // Cargar usuarios desde la API
//     axios
//       .get("/usuarios")
//       .then((response) => {
//         const usuariosSinId = response.data.map(({ id, ...resto }) => {
//           return { ...resto };
//         });

//         console.log("usuarios encriptados", usuariosSinId);
//         handleDecryptObjects(
//           JSON.stringify(usuariosSinId),
//           (decryptedData) => setUsers(JSON.parse(decryptedData) as User[]),
//           setError,
//         );
//       })
//       .catch((error) => {
//         setError("Error fetching users: " + error.message);
//       });
//   }, []);

//   const addUser = async (user: User) => {
//     try {
//       // Encriptar el usuario antes de enviarlo
//       await handleEncryptJSON(
//         JSON.stringify(user),
//         async (encryptedData) => {
//           const encryptedUser = JSON.parse(encryptedData);
//           const response = await axios.post("/usuarios", encryptedUser);
//           setUsers((prevUsers) => [
//             ...prevUsers,
//             { ...user, id: response.data.id },
//           ]);
//         },
//         setError,
//       );
//     } catch (error) {
//       console.error("Error encrypting user:", error);
//     }
//   };

//   const updateUser = async (updatedUser: User) => {
//     try {
//       // Encriptar el usuario antes de enviarlo
//       await handleEncryptJSON(
//         JSON.stringify(updatedUser),
//         async (encryptedData) => {
//           const encryptedUser = JSON.parse(encryptedData);
//           await axios.patch(`/usuario/${updatedUser.id}`, encryptedUser);
//           setUsers((prevUsers) =>
//             prevUsers.map((user) =>
//               user.id === updatedUser.id ? updatedUser : user,
//             ),
//           );
//         },
//         setError,
//       );
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   return (
//     <UsersContext.Provider value={{ users, addUser, updateUser }}>
//       {children}
//     </UsersContext.Provider>
//   );
// };

// const useUsers = (): UsersContextProps => {
//   const context = useContext(UsersContext);
//   if (!context) {
//     throw new Error("useUsers must be used within a UsersProvider");
//   }
//   return context;
// };

// export { UsersProvider, useUsers };
// export type { User };
