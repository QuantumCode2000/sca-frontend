// import { useState } from "react";
// import WeaponInfo from "../../components/WeaponInfo/WeaponInfo";
// import Button from "../../components/Button/Button";
// import { useUsers } from "../../contexts/UsersContext/UsersContext";
// import { useWeapons } from "../../contexts/WeaponsContext/WeaponsContext";
// import { useMovements } from "../../contexts/MovementsContext/MovementsContext";
// import { findWeaponInMovements } from "../../services/findWeaponInMovements";

// const WeaponEntry = () => {
//   const { weapons, updateWeapon } = useWeapons();
//   const { users } = useUsers();
//   const { movements, updateMovement } = useMovements();
//   const [weaponCode, setWeaponCode] = useState("");
//   const [weaponDetails, setWeaponDetails] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [observations, setObservations] = useState("");
//   const [updateObservations, setUpdateObservations] = useState(false);

//   const fetchWeaponDetails = () => {
//     setLoading(true);
//     const details = weapons.find((weapon) => weapon.codigo === weaponCode);
//     setWeaponDetails(details || null);
//     setLoading(false);
//   };

//   const handleUpdateMovement = () => {
//     const updatedMovement = {
//       ...findWeaponInMovements(weaponCode, movements).movement,
//       fechaRegreso: `${new Date().getFullYear()}-${String(
//         new Date().getMonth() + 1,
//       ).padStart(2, "0")}-${String(new Date().getDate()).padStart(
//         2,
//         "0",
//       )} ${String(new Date().getHours()).padStart(2, "0")}:${String(
//         new Date().getMinutes(),
//       ).padStart(2, "0")}`,
//       observaciones: updateObservations ? observations : undefined,
//     };
//     updateMovement(updatedMovement);

//     if (updateObservations) {
//       const updatedWeapon = {
//         ...weaponDetails,
//         observations: observations,
//       };
//       updateWeapon(updatedWeapon);
//     }

//     setUpdateObservations(false);
//     setObservations("");
//   };

//   const findUser = (ci) => {
//     return users.find((user) => user.ci === ci);
//   };

//   return (
//     <>
//       <div className="flex flex-col md:flex-row h-[90%]">
//         <div className="md:w-1/2 p-2">
//           <WeaponInfo
//             weaponCode={weaponCode}
//             setWeaponCode={setWeaponCode}
//             fetchWeaponDetails={fetchWeaponDetails}
//             weaponDetails={weaponDetails}
//             setWeaponDetails={setWeaponDetails}
//             loading={loading}
//           />
//         </div>
//         <div className="md:w-1/2 p-2">
//           <div className="bg-white overflow-hidden shadow rounded-lg border mx-4 box">
//             <div className="px-4 py-5 sm:px-6">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-lg leading-6 font-medium text-gray-900">
//                   {"Información de la salida del Arma"}
//                 </h3>
//               </div>
//               <p className="mt-1 max-w-2xl text-sm text-gray-500">
//                 {findWeaponInMovements(weaponCode, movements).message}
//               </p>
//             </div>
//             <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
//               {findWeaponInMovements(weaponCode, movements).movement ? (
//                 <>
//                   <RowInfo
//                     title={"Fecha de Salida"}
//                     value={
//                       findWeaponInMovements(weaponCode, movements).movement
//                         ?.fechaSalida
//                     }
//                   />

//                   <RowInfo
//                     title={"Fecha de Regreso"}
//                     value={
//                       findWeaponInMovements(weaponCode, movements).movement
//                         ?.fechaRegreso
//                     }
//                   />
//                   <RowInfo
//                     title={"Solicitante"}
//                     value={
//                       findUser(
//                         findWeaponInMovements(weaponCode, movements).movement
//                           .solicitante,
//                       )?.grado +
//                       " " +
//                       findUser(
//                         findWeaponInMovements(weaponCode, movements).movement
//                           .solicitante,
//                       )?.especialidad +
//                       " " +
//                       findUser(
//                         findWeaponInMovements(weaponCode, movements).movement
//                           .solicitante,
//                       )?.nombre +
//                       " " +
//                       findUser(
//                         findWeaponInMovements(weaponCode, movements).movement
//                           .solicitante,
//                       )?.apellidoPaterno +
//                       " " +
//                       findUser(
//                         findWeaponInMovements(weaponCode, movements).movement
//                           .solicitante,
//                       )?.apellidoMaterno
//                     }
//                   />
//                   <RowInfo
//                     title={"Motivo"}
//                     value={
//                       findWeaponInMovements(weaponCode, movements).movement
//                         ?.motivo
//                     }
//                   />
//                 </>
//               ) : null}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-end mt-4">
//         {findWeaponInMovements(weaponCode, movements).isPending === false ? (
//           <Button
//             textStyle={
//               "bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50"
//             }
//             text={"Registrar Entrada"}
//           />
//         ) : (
//           <>
//             <button
//               className="bg-yellow-500 text-white px-4 py-2 rounded mb-4"
//               onClick={() => setUpdateObservations(!updateObservations)}
//             >
//               {updateObservations ? "Cancelar" : "Actualizar Observaciones"}
//             </button>
//             {updateObservations && (
//               <div
//                 className="
//               w-[70%] text-xs
//               "
//               >
//                 <textarea
//                   className="border rounded p-2 mb-4 w-[30%]"
//                   value={weaponDetails?.observations}
//                   readOnly
//                 />
//                 <textarea
//                   className="border rounded p-2 mb-4 w-[30%] "
//                   placeholder="Ingrese las nuevas observaciones"
//                   value={observations}
//                   onChange={(e) => setObservations(e.target.value)}
//                 />
//               </div>
//             )}
//             <Button text={"Registrar Entrada"} onClick={handleUpdateMovement} />
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// const RowInfo = ({ title, value }) => {
//   return (
//     <div className="sm:divide-y sm:divide-gray-200">
//       <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//         <dt className="text-sm font-medium text-gray-500">{title}</dt>
//         <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//           {value}
//         </dd>
//       </div>
//     </div>
//   );
// };

// export default WeaponEntry;
import { useEffect, useState } from "react";
import WeaponInfo from "../../components/WeaponInfo/WeaponInfo";
import Button from "../../components/Button/Button";
import { useUsers } from "../../contexts/UsersContext/UsersContext";
import { useWeapons } from "../../contexts/WeaponsContext/WeaponsContext";
import { useMovements } from "../../contexts/MovementsContext/MovementsContext";
import { findWeaponInMovements } from "../../services/findWeaponInMovements";
import io from "socket.io-client";

const socket = io("http://192.168.1.9:3000"); // Reemplaza con la IP correcta de tu servidor

const WeaponEntry = () => {
  const { weapons, updateWeapon } = useWeapons();
  const { users } = useUsers();
  const { movements, updateMovement } = useMovements();
  const [weaponCode, setWeaponCode] = useState("");
  const [weaponDetails, setWeaponDetails] = useState<Weapon | null>(null);
  const [loading, setLoading] = useState(false);
  const [observations, setObservations] = useState("");
  const [updateObservations, setUpdateObservations] = useState(false);

  useEffect(() => {
    socket.on("rfid", (code) => {
      setWeaponCode(code.trim());
      fetchWeaponDetails(code.trim());
    });

    return () => {
      socket.off("rfid");
    };
  }, []);

  const fetchWeaponDetails = (code) => {
    if (!code) return;
    setLoading(true);
    const details = weapons.find((weapon) => weapon.codigo === code.trim());
    setWeaponDetails(details || null);
    setLoading(false);
  };

  const handleUpdateMovement = () => {
    const currentMovement = findWeaponInMovements(
      weaponCode.trim(),
      movements,
    ).movement;
    if (!currentMovement) return;

    const updatedMovement = {
      ...currentMovement,
      fechaRegreso: `${new Date().getFullYear()}-${String(
        new Date().getMonth() + 1,
      ).padStart(2, "0")}-${String(new Date().getDate()).padStart(
        2,
        "0",
      )} ${String(new Date().getHours()).padStart(2, "0")}:${String(
        new Date().getMinutes(),
      ).padStart(2, "0")}`,
      observaciones: updateObservations ? observations.trim() : undefined,
    };
    updateMovement(updatedMovement);

    if (updateObservations && weaponDetails) {
      const updatedWeapon = {
        ...weaponDetails,
        observations: observations.trim(),
      };
      updateWeapon(updatedWeapon);
    }

    setUpdateObservations(false);
    setObservations("");
  };

  const findUser = (ci) => {
    return users.find((user) => user.ci === ci.trim());
  };

  return (
    <>
      <div className="flex flex-col md:flex-row h-[90%]">
        <div className="md:w-1/2 p-2">
          <WeaponInfo
            weaponCode={weaponCode}
            setWeaponCode={(code) => setWeaponCode(code.trim())}
            fetchWeaponDetails={fetchWeaponDetails}
            weaponDetails={weaponDetails}
            setWeaponDetails={setWeaponDetails}
            loading={loading}
          />
        </div>
        <div className="md:w-1/2 p-2">
          <div className="bg-white overflow-hidden shadow rounded-lg border mx-4 box">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {"Información de la salida del Arma"}
                </h3>
              </div>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {findWeaponInMovements(weaponCode.trim(), movements).message}
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              {findWeaponInMovements(weaponCode.trim(), movements).movement ? (
                <>
                  <RowInfo
                    title={"Fecha de Salida"}
                    value={
                      findWeaponInMovements(weaponCode.trim(), movements)
                        .movement?.fechaSalida
                    }
                  />
                  <RowInfo
                    title={"Fecha de Regreso"}
                    value={
                      findWeaponInMovements(weaponCode.trim(), movements)
                        .movement?.fechaRegreso
                    }
                  />
                  <RowInfo
                    title={"Solicitante"}
                    value={
                      findUser(
                        findWeaponInMovements(weaponCode.trim(), movements)
                          .movement.solicitante,
                      )?.grado +
                      " " +
                      findUser(
                        findWeaponInMovements(weaponCode.trim(), movements)
                          .movement.solicitante,
                      )?.especialidad +
                      " " +
                      findUser(
                        findWeaponInMovements(weaponCode.trim(), movements)
                          .movement.solicitante,
                      )?.nombre +
                      " " +
                      findUser(
                        findWeaponInMovements(weaponCode.trim(), movements)
                          .movement.solicitante,
                      )?.apellidoPaterno +
                      " " +
                      findUser(
                        findWeaponInMovements(weaponCode.trim(), movements)
                          .movement.solicitante,
                      )?.apellidoMaterno
                    }
                  />
                  <RowInfo
                    title={"Motivo"}
                    value={
                      findWeaponInMovements(weaponCode.trim(), movements)
                        .movement?.motivo
                    }
                  />
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        {findWeaponInMovements(weaponCode.trim(), movements).isPending ===
        false ? (
          <Button
            textStyle={
              "bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50"
            }
            text={"Registrar Entrada"}
          />
        ) : (
          <>
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded mb-4"
              onClick={() => setUpdateObservations(!updateObservations)}
            >
              {updateObservations ? "Cancelar" : "Actualizar Observaciones"}
            </button>
            {updateObservations && (
              <div className="w-[70%] text-xs">
                <textarea
                  className="border rounded p-2 mb-4 w-[30%]"
                  value={weaponDetails?.observations}
                  readOnly
                />
                <textarea
                  className="border rounded p-2 mb-4 w-[30%]"
                  placeholder="Ingrese las nuevas observaciones"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value.trim())}
                />
              </div>
            )}
            <Button text={"Registrar Entrada"} onClick={handleUpdateMovement} />
          </>
        )}
      </div>
    </>
  );
};

const RowInfo = ({ title, value }) => {
  return (
    <div className="sm:divide-y sm:divide-gray-200">
      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">{title}</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {value}
        </dd>
      </div>
    </div>
  );
};

export default WeaponEntry;
