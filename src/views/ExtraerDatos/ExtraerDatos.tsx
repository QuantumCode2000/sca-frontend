import { useState } from "react";
import { handleDecryptObjects } from "../../utils/encryptionUtils";
import { useMovements } from "../../contexts/MovementsContext/MovementsContext";
import { useWeapons } from "../../contexts/WeaponsContext/WeaponsContext";
import { useUsers } from "../../contexts/UsersContext/UsersContext";
const ExtraerDatos = () => {
  const { movements } = useMovements();
  const { weapons } = useWeapons();
  const { users } = useUsers();
  const [usersDecrypted, setUsersDecrypted] = useState(users);
  const [weaponsDecrypted, setWeaponsDecrypted] = useState(weapons);
  const [movementsDecrypted, setMovementsDecrypted] = useState(movements);
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
    if (!jsonData || jsonData.length === 0) {
      return ""; // Devuelve una cadena vacía si no hay datos
    }

    let csv = "";

    // Extract headers
    const headers = Object.keys(jsonData[0]);
    csv += headers.join(",") + "\n";

    // Extract values
    jsonData.forEach((obj) => {
      const values = headers.map((header) => obj[header] || ""); // Maneja valores faltantes
      csv += values.join(",") + "\n";
    });

    return csv;
  }

  const exportToCSV = () => {
    if (!usersDecrypted || !weaponsDecrypted || !movementsDecrypted) {
      setError("Datos no disponibles para exportar.");
      return;
    }

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
