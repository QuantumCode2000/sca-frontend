
import axios from "axios";

const ENCRYPTION_API_URL = "http://127.0.0.1:8000";


export const handleEncryptJSON = async (jsonInput, callback, setError) => {
  console.log(jsonInput);
  if (jsonInput) {
    try {
      setError("");
      const response = await axios.post(`${ENCRYPTION_API_URL}/encrypt`, {
        data: JSON.parse(jsonInput),
      });
      callback(JSON.stringify(response.data.data, null, 2));
    } catch (error) {
      setError(`Error encrypting JSON: ${error.response?.data?.detail || error.message}`);
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
      setError(`Error decrypting JSON: ${error.response?.data?.detail || error.message}`);
    }
  }
};


export const handleDecryptObjects = async (encryptedObjects, callback, setError) => {
  if (encryptedObjects) {
    try {
      setError("");
      const response = await axios.post(`${ENCRYPTION_API_URL}/decrypt_objects`, {
        objects: JSON.parse(encryptedObjects),
      });
      callback(JSON.stringify(response.data.data, null, 2));
    } catch (error) {
      setError(`Error decrypting objects: ${error.response?.data?.detail || error.message}`);
    }
  }
};
export const handleEncryptObjects = async (objects, callback, setError) => {

  if (objects) {
    try {
      setError("");
      const response = await axios.post(`${ENCRYPTION_API_URL}/encrypt_objects`, {
        objects: JSON.parse(objects),
      });
      callback(JSON.stringify(response.data.data, null, 2));
    } catch (error) {
      setError(`Error encrypting objects: ${error.response?.data?.detail || error.message}`);
    }
  }
};