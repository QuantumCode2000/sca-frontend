// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";

// interface Encargado {
//   id: number;
//   nombre: string;
//   cargo: string;
// }

// interface ActasContextProps {
//   encargados: Encargado[];
//   asignarUsuario: (encargadoId: number, nombre: string) => void;
// }

// const ActasContext = createContext<ActasContextProps | undefined>(undefined);

// const ActasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [encargados, setEncargados] = useState<Encargado[]>(() => {
//     const savedEncargados = localStorage.getItem("encargados");
//     return savedEncargados
//       ? JSON.parse(savedEncargados)
//       : [
//           { id: 1, nombre: "", cargo: "ENC. DE PANOL DEL ARMAMENTO DEL CGAB." },
//           { id: 2, nombre: "", cargo: 'JEFE DIV. "C" MATERIAL BELICO' },
//           { id: 3, nombre: "", cargo: "SUB-JEFE DE DPTO. IV-LOG" },
//           {
//             id: 4,
//             nombre: "",
//             cargo: "JEFE DEL DEPARTAMENTO IV-LOG DEL EMGAB",
//           },
//         ];
//   });

//   useEffect(() => {
//     localStorage.setItem("encargados", JSON.stringify(encargados));
//   }, [encargados]);

//   const asignarUsuario = (encargadoId: number, nombre: string) => {
//     const encargadoConNombre = encargados.map((encargado) => {
//       if (encargado.id === encargadoId) {
//         return { ...encargado, nombre: nombre.trim() };
//       }
//       return encargado;
//     });
//     setEncargados(encargadoConNombre);
//   };

//   return (
//     <ActasContext.Provider value={{ encargados, asignarUsuario }}>
//       {children}
//     </ActasContext.Provider>
//   );
// };

// const useActas = () => {
//   const context = useContext(ActasContext);
//   if (context === undefined) {
//     throw new Error("useActas must be used within an ActasProvider");
//   }
//   return context;
// };

// export { ActasProvider, useActas };
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Encargado {
  id: number;
  nombre: string;
  cargo: string;
}

interface ActasContextProps {
  encargados: Encargado[];
  asignarUsuario: (encargadoId: number, nombre: string) => void;
  eliminarUsuario: (encargadoId: number) => void;
}

const ActasContext = createContext<ActasContextProps | undefined>(undefined);

const ActasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [encargados, setEncargados] = useState<Encargado[]>(() => {
    const savedEncargados = localStorage.getItem("encargados");
    return savedEncargados
      ? JSON.parse(savedEncargados)
      : [
          { id: 1, nombre: "", cargo: "ENC. DE PANOL DEL ARMAMENTO DEL CGAB." },
          { id: 2, nombre: "", cargo: 'JEFE DIV. "C" MATERIAL BELICO' },
          { id: 3, nombre: "", cargo: "SUB-JEFE DE DPTO. IV-LOG" },
          {
            id: 4,
            nombre: "",
            cargo: "JEFE DEL DEPARTAMENTO IV-LOG DEL EMGAB",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("encargados", JSON.stringify(encargados));
  }, [encargados]);

  const asignarUsuario = (encargadoId: number, nombre: string) => {
    const updatedEncargados = encargados.map((encargado) => {
      if (encargado.id === encargadoId) {
        return { ...encargado, nombre: nombre.trim() };
      }
      return encargado;
    });
    setEncargados(updatedEncargados);
  };

  const eliminarUsuario = (encargadoId: number) => {
    const updatedEncargados = encargados.map((encargado) => {
      if (encargado.id === encargadoId) {
        return { ...encargado, nombre: "" }; // Eliminar nombre
      }
      return encargado;
    });
    setEncargados(updatedEncargados);
  };

  return (
    <ActasContext.Provider
      value={{ encargados, asignarUsuario, eliminarUsuario }}
    >
      {children}
    </ActasContext.Provider>
  );
};

const useActas = () => {
  const context = useContext(ActasContext);
  if (context === undefined) {
    throw new Error("useActas must be used within an ActasProvider");
  }
  return context;
};

export { ActasProvider, useActas };
