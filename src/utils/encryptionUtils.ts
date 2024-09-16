import axios from "axios";

const ENCRYPTION_API_URL = "http://127.0.0.1:8000";

export const handleEncryptJSON = async (jsonInput, callback, setError) => {
  if (jsonInput) {
    try {
      console.log("Enviando JSON para encriptar:", jsonInput); // Debugging
      setError("");
      const response = await axios.post(`${ENCRYPTION_API_URL}/encrypt`, {
        data: JSON.parse(jsonInput),
      });
      console.log("Respuesta de encriptación:", response.data); // Debugging
      callback(JSON.stringify(response.data.data, null, 2));
    } catch (error) {
      setError(
        `Error encrypting JSON: ${
          error.response?.data?.detail || error.message
        }`,
      );
    }
  }
};

export const handleDecryptJSON = async (encryptedJSON, callback, setError) => {
  if (encryptedJSON) {
    try {
      setError("");
      const response = await axios.post(`${ENCRYPTION_API_URL}/decrypt`, {
        data: JSON.parse(encryptedJSON),
      });
      callback(JSON.stringify(response.data.data, null, 2));
    } catch (error) {
      setError(
        `Error decrypting JSON: ${
          error.response?.data?.detail || error.message
        }`,
      );
    }
  }
};

export const handleDecryptObjects = async (objects, callback, setError) => {
  if (objects) {
    try {
      setError(""); // Limpiar errores previos

      // Intenta parsear la entrada a un arreglo de objetos
      let parsedObjects;
      try {
        parsedObjects = JSON.parse(objects);
        if (!Array.isArray(parsedObjects)) {
          throw new Error("Input must be an array of objects");
        }
      } catch (parseError) {
        throw new Error("Invalid JSON format");
      }

      // Realiza la solicitud POST
      const response = await axios.post(
        `${ENCRYPTION_API_URL}/decrypt_objects`,
        parsedObjects, // Enviar directamente el arreglo de objetos
      );

      // Llama al callback con los datos en formato JSON
      console.log("dataDesencriptada desde utils", response.data.data);
      callback(JSON.stringify(response.data.data, null, 2));
    } catch (error) {
      // Establece el mensaje de error adecuado
      setError(
        `Error decrypting objects: ${
          error.response?.data?.detail || error.message
        }`,
      );
    }
  } else {
    setError("No objects provided to decrypt");
  }
};

export const handleEncryptObjects = async (objects, callback, setError) => {
  if (objects) {
    try {
      setError(""); // Limpiar errores previos
      // Intenta parsear la entrada a un arreglo de objetos
      let parsedObjects;
      try {
        parsedObjects = JSON.parse(objects);
        if (!Array.isArray(parsedObjects)) {
          throw new Error("Input must be an array of objects");
        }
      } catch (parseError) {
        throw new Error("Invalid JSON format");
      }

      // Realiza la solicitud POST
      const response = await axios.post(
        `${ENCRYPTION_API_URL}/encrypt_objects`,
        parsedObjects, // Enviar directamente el arreglo de objetos
      );

      // Llama al callback con los datos en formato JSON
      callback(JSON.stringify(response.data.data, null, 2));
    } catch (error) {
      // Establece el mensaje de error adecuado
      setError(
        `Error encrypting objects: ${
          error.response?.data?.detail || error.message
        }`,
      );
    }
  } else {
    setError("No objects provided to encrypt");
  }
};

export const handleDecryptReturnJSON = async (encryptedJSON, setError) => {
  if (encryptedJSON) {
    try {
      setError("");
      const response = await axios.post(`${ENCRYPTION_API_URL}/decrypt`, {
        data: JSON.parse(encryptedJSON),
      });

      // console.log("dataDesencriptada desde utils", response.data.data);

      return JSON.stringify(response.data.data, null, 2);
    } catch (error) {
      setError(
        `Error decrypting JSON: ${
          error.response?.data?.detail || error.message
        }`,
      );
    }
  }
};
