import { useState } from "react";
import {
  handleEncryptJSON,
  handleDecryptJSON,
  handleDecryptObjects,
  handleEncryptObjects,
} from "../../utils/encryptionUtils";

const Example = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [encryptedJSON, setEncryptedJSON] = useState("");
  const [decryptedJSON, setDecryptedJSON] = useState("");
  const [encryptedArrayInput, setEncryptedArrayInput] = useState("");
  const [decryptedArrayOutput, setDecryptedArrayOutput] = useState("");
  const [unencryptedArrayInput, setUnencryptedArrayInput] = useState("");
  const [encryptedArrayOutput, setEncryptedArrayOutput] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">RSA Encryption</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <textarea
        className="border rounded p-2 mb-4 w-full h-32"
        placeholder='Enter JSON to encrypt (e.g., {\"hello\":\"world\"})'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => handleEncryptJSON(jsonInput, setEncryptedJSON, setError)}
      >
        Encrypt JSON
      </button>
      <textarea
        className="border rounded p-2 mb-4 w-full h-32"
        placeholder="Encrypted JSON"
        value={encryptedJSON}
        readOnly
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={() =>
          handleDecryptJSON(encryptedJSON, setDecryptedJSON, setError)
        }
      >
        Decrypt JSON
      </button>
      <textarea
        className="border rounded p-2 mb-4 w-full h-32"
        placeholder="Decrypted JSON"
        value={decryptedJSON}
        readOnly
      />

      <h2 className="text-xl font-bold mb-4">
        Decrypt Array of Encrypted Objects
      </h2>
      <textarea
        className="border rounded p-2 mb-4 w-full h-32"
        placeholder='Enter array of encrypted objects (e.g., [{"key":"encryptedValue"}, ...])'
        value={encryptedArrayInput}
        onChange={(e) => setEncryptedArrayInput(e.target.value)}
      />
      <button
        className="bg-purple-500 text-white px-4 py-2 rounded mb-4"
        onClick={() =>
          handleDecryptObjects(
            encryptedArrayInput,
            setDecryptedArrayOutput,
            setError,
          )
        }
      >
        Decrypt Array
      </button>
      <textarea
        className="border rounded p-2 mb-4 w-full h-32"
        placeholder="Decrypted Array Output"
        value={decryptedArrayOutput}
        readOnly
      />

      <h2 className="text-xl font-bold mb-4">Encrypt Array of Objects</h2>
      <textarea
        className="border rounded p-2 mb-4 w-full h-32"
        placeholder='Enter array of objects to encrypt (e.g., [{"key":"value"}, ...])'
        value={unencryptedArrayInput}
        onChange={(e) => setUnencryptedArrayInput(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() =>
          handleEncryptObjects(
            unencryptedArrayInput,
            setEncryptedArrayOutput,
            setError,
          )
        }
      >
        Encrypt Array
      </button>
      <textarea
        className="border rounded p-2 mb-4 w-full h-32"
        placeholder="Encrypted Array Output"
        value={encryptedArrayOutput}
        readOnly
      />
    </div>
  );
};

export default Example;
// import React, { useState } from "react";
// import { handleEncryptObjects } from "../../utils/encryptionUtils"; // Ajusta la ruta según sea necesario

// const ExampleComponent = () => {
//   const [objects, setObjects] = useState([
//     {
//       ci: "12121212",
//       extension: "LP",
//       cm: "1234342",
//       grado: "Cnl.",
//       especialidad: "DIM",
//       nombre: "Juan Ivan",
//       apellidoPaterno: "Arias",
//       apellidoMaterno: "Choque",
//       correo: "jarias@gmail.com",
//       inSystemPermission: "Sí",
//       rol: "Administrador",
//       estado: "Activo",
//     },
//     {
//       ci: "23232323",
//       extension: "SC",
//       cm: "567890",
//       grado: "Cpt.",
//       especialidad: "INF",
//       nombre: "Maria",
//       apellidoPaterno: "Perez",
//       apellidoMaterno: "Lopez",
//       correo: "mperez@gmail.com",
//       inSystemPermission: "No",
//       rol: "Usuario",
//       estado: "Activo",
//     },
//   ]);
//   const [encryptedObjects, setEncryptedObjects] = useState("");
//   const [error, setError] = useState("");

//   const encryptObjects = () => {
//     handleEncryptObjects(
//       JSON.stringify(objects),
//       (encryptedData) => {
//         setEncryptedObjects(encryptedData);
//         // Puedes hacer algo con los datos encriptados aquí, como guardarlos en localStorage
//         localStorage.setItem("encryptedObjects", encryptedData);
//       },
//       setError,
//     );
//   };

//   return (
//     <div>
//       <h1>Encrypt Objects Example</h1>
//       {error && <p className="error">{error}</p>}
//       <button onClick={encryptObjects}>Encrypt Objects</button>
//       {encryptedObjects && (
//         <textarea readOnly value={encryptedObjects} rows={10} cols={50} />
//       )}
//     </div>
//   );
// };

// export default ExampleComponent;
