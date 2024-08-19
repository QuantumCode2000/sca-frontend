// // import { useState } from "react";
// // import { handleDecryptObjects } from "../../utils/encryptionUtils";
// // import Papa from "papaparse";

// // const ExtraerDatos = () => {
// //   const [usersDecrypted, setUsersDecrypted] = useState([]);
// //   const [weaponsDecrypted, setWeaponsDecrypted] = useState([]);
// //   const [movementsDecrypted, setMovementsDecrypted] = useState([]);
// //   const [error, setError] = useState("");

// //   const decryptData = () => {
// //     handleDecryptObjects(
// //       localStorage.getItem("users"),
// //       (decryptedData) => setUsersDecrypted(JSON.parse(decryptedData)),
// //       setError,
// //     );
// //     handleDecryptObjects(
// //       localStorage.getItem("weapons"),
// //       (decryptedData) => setWeaponsDecrypted(JSON.parse(decryptedData)),
// //       setError,
// //     );
// //     handleDecryptObjects(
// //       localStorage.getItem("movements"),
// //       (decryptedData) => setMovementsDecrypted(JSON.parse(decryptedData)),
// //       setError,
// //     );
// //   };

// //   const exportToCSV = () => {
// //     const mergedData = [
// //       ...usersDecrypted.map((user) => ({ type: "User", ...user })),
// //       ...weaponsDecrypted.map((weapon) => ({ type: "Weapon", ...weapon })),
// //       ...movementsDecrypted.map((movement) => ({
// //         type: "Movement",
// //         ...movement,
// //       })),
// //     ];

// //     const csv = Papa.unparse(mergedData);
// //     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
// //     const link = document.createElement("a");
// //     const url = URL.createObjectURL(blob);
// //     link.href = url;
// //     link.setAttribute("download", "decrypted_data.csv");
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //   };

// //   const formatDataForTextarea = (data) => {
// //     return data.map((item) => JSON.stringify(item, null, 2)).join("\n\n");
// //   };

// //   return (
// //     <div>
// //       <button
// //         onClick={decryptData}
// //         className="bg-blue-500 text-white px-4 py-2 rounded-md"
// //       >
// //         Desencriptar Datos
// //       </button>
// //       <button
// //         onClick={exportToCSV}
// //         className="bg-green-500 text-white px-4 py-2 rounded-md ml-2"
// //         disabled={
// //           !usersDecrypted.length &&
// //           !weaponsDecrypted.length &&
// //           !movementsDecrypted.length
// //         }
// //       >
// //         Exportar a CSV
// //       </button>

// //       {error && <p className="text-red-500 mt-4">Error: {error}</p>}

// //       <div className="mt-4">
// //         <h2 className="text-xl font-bold">Usuarios Desencriptados</h2>
// //         <textarea
// //           className="w-full h-32 p-2 border rounded"
// //           value={formatDataForTextarea(usersDecrypted)}
// //           readOnly
// //         />
// //       </div>

// //       <div className="mt-4">
// //         <h2 className="text-xl font-bold">Armas Desencriptadas</h2>
// //         <textarea
// //           className="w-full h-32 p-2 border rounded"
// //           value={formatDataForTextarea(weaponsDecrypted)}
// //           readOnly
// //         />
// //       </div>

// //       <div className="mt-4">
// //         <h2 className="text-xl font-bold">Movimientos Desencriptados</h2>
// //         <textarea
// //           className="w-full h-32 p-2 border rounded"
// //           value={formatDataForTextarea(movementsDecrypted)}
// //           readOnly
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default ExtraerDatos;

// import { useState } from "react";
// import { handleDecryptObjects } from "../../utils/encryptionUtils";
// import Papa from "papaparse";

// const ExtraerDatos = () => {
//   const [usersDecrypted, setUsersDecrypted] = useState([]);
//   const [weaponsDecrypted, setWeaponsDecrypted] = useState([]);
//   const [movementsDecrypted, setMovementsDecrypted] = useState([]);
//   const [error, setError] = useState("");

//   const decryptData = () => {
//     handleDecryptObjects(
//       localStorage.getItem("users"),
//       (decryptedData) => setUsersDecrypted(JSON.parse(decryptedData)),
//       setError,
//     );
//     handleDecryptObjects(
//       localStorage.getItem("weapons"),
//       (decryptedData) => setWeaponsDecrypted(JSON.parse(decryptedData)),
//       setError,
//     );
//     handleDecryptObjects(
//       localStorage.getItem("movements"),
//       (decryptedData) => setMovementsDecrypted(JSON.parse(decryptedData)),
//       setError,
//     );
//   };

//   const exportToCSV = () => {
//     const movementsData = movementsDecrypted.map((movement) => ({
//       id: movement.id || "",
//       fechaSalida: movement.fechaSalida || "",
//       fechaRegreso: movement.fechaRegreso || "",
//       codigo: movement.codigo || "",
//       solicitante: movement.solicitante || "",
//       motivo: movement.motivo || "",
//       actaSalida: movement.actaSalida || "",
//       actaRegreso: movement.actaRegreso || "",
//     }));

//     const weaponsData = weaponsDecrypted.map((weapon) => ({
//       codigo: weapon.codigo || "",
//       nroarma: weapon.nroarma || "",
//       estado: weapon.estado || "",
//       observations: weapon.observations || "",
//       propietario: weapon.propietario || "",
//       armamento: weapon.armamento || "",
//       modelo: weapon.modelo || "",
//       calibre: weapon.calibre || "",
//       industria: weapon.industria || "",
//       inInventory: weapon.inInventory || "",
//       clasification: weapon.clasification || "",
//       clasificacion: weapon.clasificacion || "",
//     }));

//     const usersData = usersDecrypted.map((user) => ({
//       ci: user.ci || "",
//       extension: user.extension || "",
//       cm: user.cm || "",
//       grado: user.grado || "",
//       especialidad: user.especialidad || "",
//       nombre: user.nombre || "",
//       apellidoPaterno: user.apellidoPaterno || "",
//       apellidoMaterno: user.apellidoMaterno || "",
//       correo: user.correo || "",
//       inSystemPermission: user.inSystemPermission || "",
//       rol: user.rol || "",
//       estado: user.estado || "",
//     }));

//     const mergedData = [
//       ...movementsData.map((item) => ({ type: "Movement", ...item })),
//       ...weaponsData.map((item) => ({ type: "Weapon", ...item })),
//       ...usersData.map((item) => ({ type: "User", ...item })),
//     ];

//     const csv = Papa.unparse(mergedData);
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     const url = URL.createObjectURL(blob);
//     link.href = url;
//     link.setAttribute("download", "decrypted_data.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div>
//       <button
//         onClick={decryptData}
//         className="bg-blue-500 text-white px-4 py-2 rounded-md"
//       >
//         Desencriptar Datos
//       </button>
//       <button
//         onClick={exportToCSV}
//         className="bg-green-500 text-white px-4 py-2 rounded-md ml-2"
//         disabled={
//           !usersDecrypted.length &&
//           !weaponsDecrypted.length &&
//           !movementsDecrypted.length
//         }
//       >
//         Exportar a CSV
//       </button>

//       {error && <p className="text-red-500 mt-4">Error: {error}</p>}

//       <div className="mt-4">
//         <h2 className="text-xl font-bold">Usuarios Desencriptados</h2>
//         <textarea
//           className="w-full h-32 p-2 border rounded"
//           value={JSON.stringify(usersDecrypted, null, 2)}
//           readOnly
//         />
//       </div>

//       <div className="mt-4">
//         <h2 className="text-xl font-bold">Armas Desencriptadas</h2>
//         <textarea
//           className="w-full h-32 p-2 border rounded"
//           value={JSON.stringify(weaponsDecrypted, null, 2)}
//           readOnly
//         />
//       </div>

//       <div className="mt-4">
//         <h2 className="text-xl font-bold">Movimientos Desencriptados</h2>
//         <textarea
//           className="w-full h-32 p-2 border rounded"
//           value={JSON.stringify(movementsDecrypted, null, 2)}
//           readOnly
//         />
//       </div>
//     </div>
//   );
// };

// export default ExtraerDatos;
import { useState } from "react";
import { handleDecryptObjects } from "../../utils/encryptionUtils";
import Papa from "papaparse";

const ExtraerDatos = () => {
  const [usersDecrypted, setUsersDecrypted] = useState([]);
  const [weaponsDecrypted, setWeaponsDecrypted] = useState([]);
  const [movementsDecrypted, setMovementsDecrypted] = useState([]);
  const [userCsv, setUserCsv] = useState("");
  const [weaponCsv, setWeaponCsv] = useState("");
  const [movementCsv, setMovementCsv] = useState("");

  const [error, setError] = useState("");

  const decryptData = () => {
    handleDecryptObjects(
      localStorage.getItem("users"),
      (decryptedData) => setUsersDecrypted(JSON.parse(decryptedData)),
      setError,
    );
    handleDecryptObjects(
      localStorage.getItem("weapons"),
      (decryptedData) => setWeaponsDecrypted(JSON.parse(decryptedData)),
      setError,
    );
    handleDecryptObjects(
      localStorage.getItem("movements"),
      (decryptedData) => setMovementsDecrypted(JSON.parse(decryptedData)),
      setError,
    );
  };
  function jsonToCsv(jsonData) {
    let csv = "";

    // Extract headers
    const headers = Object.keys(jsonData[0]);
    csv += headers.join(",") + "\n";

    // Extract values
    jsonData.forEach((obj) => {
      const values = headers.map((header) => obj[header]);
      csv += values.join(",") + "\n";
    });

    return csv;
  }

  const exportToCSV = () => {
    const usersCsv = jsonToCsv(usersDecrypted);
    const weaponsCsv = jsonToCsv(weaponsDecrypted);
    const movementsCsv = jsonToCsv(movementsDecrypted);

    const blobUsers = new Blob([usersCsv], { type: "text/csv;charset=utf-8;" });
    const linkUsers = document.createElement("a");
    const urlUsers = URL.createObjectURL(blobUsers);
    linkUsers.href = urlUsers;
    linkUsers.setAttribute("download", "usuarios.csv");
    document.body.appendChild(linkUsers);
    linkUsers.click();
    document.body.removeChild(linkUsers);

    const blobWeapons = new Blob([weaponsCsv], {
      type: "text/csv;charset=utf-8;",
    });
    const linkWeapons = document.createElement("a");
    const urlWeapons = URL.createObjectURL(blobWeapons);
    linkWeapons.href = urlWeapons;
    linkWeapons.setAttribute("download", "armamento.csv");
    document.body.appendChild(linkWeapons);
    linkWeapons.click();
    document.body.removeChild(linkWeapons);

    const blobMovements = new Blob([movementsCsv], {
      type: "text/csv;charset=utf-8;",
    });
    const linkMovements = document.createElement("a");
    const urlMovements = URL.createObjectURL(blobMovements);
    linkMovements.href = urlMovements;
    linkMovements.setAttribute("download", "historial-de-movimientos.csv");
    document.body.appendChild(linkMovements);
    linkMovements.click();
    document.body.removeChild(linkMovements);
  };

  return (
    <div>
      <button
        onClick={decryptData}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Desencriptar Datos
      </button>
      <button
        onClick={exportToCSV}
        className="bg-green-500 text-white px-4 py-2 rounded-md ml-2"
        disabled={
          !usersDecrypted.length &&
          !weaponsDecrypted.length &&
          !movementsDecrypted.length
        }
      >
        Exportar a CSV
      </button>

      {error && <p className="text-red-500 mt-4">Error: {error}</p>}

      <div className="mt-4">
        <h2 className="text-xl font-bold">Usuarios Desencriptados</h2>
        <textarea
          className="w-full h-32 p-2 border rounded"
          value={JSON.stringify(usersDecrypted, null, 2)}
          readOnly
        />
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold">Armas Desencriptadas</h2>
        <textarea
          className="w-full h-32 p-2 border rounded"
          value={JSON.stringify(weaponsDecrypted, null, 2)}
          readOnly
        />
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold">Movimientos Desencriptados</h2>
        <textarea
          className="w-full h-32 p-2 border rounded"
          value={JSON.stringify(movementsDecrypted, null, 2)}
          readOnly
        />
      </div>
    </div>
  );
};

export default ExtraerDatos;
