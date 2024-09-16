// import { useState } from "react";
// import { useActas } from "../../contexts/ActasContext/ActasContext";
// import { useUsers } from "../../contexts/UsersContext/UsersContext";
// import Select from "../../components/Select/Select";

// const Actas = () => {
//   const { encargados, asignarUsuario } = useActas();
//   const { users } = useUsers();

//   const [selectedUser, setSelectedUser] = useState<{ [key: number]: string }>(
//     {},
//   );
//   const [confirmationMessage, setConfirmationMessage] = useState<{
//     [key: number]: boolean;
//   }>({});

//   const usuariosAsignados = Object.values(selectedUser);

//   const listaUsuariosDisponibles = (encargadoId: number) =>
//     users
//       .filter(
//         (user) =>
//           !usuariosAsignados.includes(
//             `${user.grado} ${user.especialidad} ${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`.trim(),
//           ) ||
//           selectedUser[encargadoId] ===
//             `${user.grado} ${user.especialidad} ${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`.trim(),
//       )
//       .map((user) =>
//         `${user.grado} ${user.especialidad} ${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`.trim(),
//       );

//   const handleSave = (encargadoId: number) => {
//     const selected = selectedUser[encargadoId];
//     if (selected) {
//       asignarUsuario(encargadoId, selected);
//       setConfirmationMessage({ ...confirmationMessage, [encargadoId]: true });

//       setTimeout(() => {
//         setConfirmationMessage({
//           ...confirmationMessage,
//           [encargadoId]: false,
//         });
//       }, 2000);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">Encargados</h2>
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//         {encargados.map((encargado) => (
//           <div key={encargado.id} className="bg-white p-4 rounded-md shadow-md">
//             <h3 className="text-lg font-semibold mb-2">
//               {encargado.cargo} : {encargado.nombre || "No asignado"}
//             </h3>
//             <Select
//               id={`user-select-${encargado.id}`}
//               label="Seleccionar usuario"
//               options={listaUsuariosDisponibles(encargado.id)}
//               value={selectedUser[encargado.id] || ""}
//               onChange={(e) =>
//                 setSelectedUser({
//                   ...selectedUser,
//                   [encargado.id]: e.target.value,
//                 })
//               }
//             />
//             <button
//               onClick={() => handleSave(encargado.id)}
//               className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
//             >
//               Guardar
//             </button>

//             {confirmationMessage[encargado.id] && (
//               <p className="mt-2 text-green-500">Guardado correctamente</p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Actas;
import { useState } from "react";
import { useActas } from "../../contexts/ActasContext/ActasContext";
import { useUsers } from "../../contexts/UsersContext/UsersContext";
import Select from "../../components/Select/Select";

const Actas = () => {
  const { encargados, asignarUsuario, eliminarUsuario } = useActas();
  const { users } = useUsers();

  const [selectedUser, setSelectedUser] = useState<{ [key: number]: string }>(
    {},
  );
  const [confirmationMessage, setConfirmationMessage] = useState<{
    [key: number]: boolean;
  }>({});

  const usuariosAsignados = Object.values(selectedUser);

  const listaUsuariosDisponibles = (encargadoId: number) =>
    users
      .filter(
        (user) =>
          !usuariosAsignados.includes(
            `${user.grado} ${user.especialidad} ${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`.trim(),
          ) ||
          selectedUser[encargadoId] ===
            `${user.grado} ${user.especialidad} ${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`.trim(),
      )
      .map((user) =>
        `${user.grado} ${user.especialidad} ${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`.trim(),
      );

  const handleSave = (encargadoId: number) => {
    const selected = selectedUser[encargadoId];
    if (selected) {
      asignarUsuario(encargadoId, selected);
      setConfirmationMessage({ ...confirmationMessage, [encargadoId]: true });

      setTimeout(() => {
        setConfirmationMessage({
          ...confirmationMessage,
          [encargadoId]: false,
        });
      }, 2000);
    }
  };

  const handleRemove = (encargadoId: number) => {
    eliminarUsuario(encargadoId);
    setSelectedUser({ ...selectedUser, [encargadoId]: "" });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Encargados</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {encargados.map((encargado) => (
          <div key={encargado.id} className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">
              {encargado.cargo} : {encargado.nombre || "No asignado"}
            </h3>

            {!encargado.nombre ? (
              <>
                <Select
                  id={`user-select-${encargado.id}`}
                  label="Seleccionar usuario"
                  options={listaUsuariosDisponibles(encargado.id)}
                  value={selectedUser[encargado.id] || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      [encargado.id]: e.target.value,
                    })
                  }
                />
                <button
                  onClick={() => handleSave(encargado.id)}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
                >
                  Guardar
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleRemove(encargado.id)}
                  className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700"
                >
                  Quitar Usuario
                </button>
                <Select
                  id={`user-update-${encargado.id}`}
                  label="Actualizar usuario"
                  options={listaUsuariosDisponibles(encargado.id)}
                  value={selectedUser[encargado.id] || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      [encargado.id]: e.target.value,
                    })
                  }
                />
                <button
                  onClick={() => handleSave(encargado.id)}
                  className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700"
                >
                  Actualizar
                </button>
              </>
            )}

            {confirmationMessage[encargado.id] && (
              <p className="mt-2 text-green-500">Guardado correctamente</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Actas;
