import { useState } from "react";
import {
  handleEncryptJSON,
  handleDecryptJSON,
  handleDecryptObjects,
  handleEncryptObjects,
} from "../../utils/encryptionUtils";

const Example = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [jsonInputEncrypt, setJsonInputEncrypt] = useState("");
  const [encryptedJSON, setEncryptedJSON] = useState("");
  const [decryptedJSON, setDecryptedJSON] = useState("");
  const [unencryptedArrayInput, setUnencryptedArrayInput] = useState("");
  const [encryptedArrayOutput, setEncryptedArrayOutput] = useState("");
  const [encryptedArrayInput, setEncryptedArrayInput] = useState("");
  const [decryptedArrayOutput, setDecryptedArrayOutput] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="p-4 max-w-md mx-auto">
      <div>
        <h1 className="text-2xl font-bold mb-4"> Encryption</h1>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <textarea
          className="border rounded p-2 mb-4 w-full h-32"
          placeholder='Enter JSON to encrypt (e.g., {"hello":"world"})'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() =>
            handleEncryptJSON(jsonInput, setEncryptedJSON, setError)
          }
        >
          Encrypt JSON
        </button>
        <textarea
          className="border rounded p-2 mb-4 w-full h-32"
          placeholder="Encrypted JSON"
          value={encryptedJSON}
          readOnly
        />
      </div>

      <h1 className="text-2xl">-----------------------------</h1>
      <div>
        <textarea
          className="border rounded p-2 mb-4 w-full h-32"
          placeholder='Enter JSON to encrypt (e.g., {"hello":"encryptedValue"})'
          value={jsonInputEncrypt}
          onChange={(e) => setJsonInputEncrypt(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          onClick={() =>
            handleDecryptJSON(jsonInputEncrypt, setDecryptedJSON, setError)
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
      </div>

      <div className="bg-red-900">
        <div>
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
          {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>

        <div>
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
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <textarea
            className="border rounded p-2 mb-4 w-full h-32"
            placeholder="Decrypted Array Output"
            value={decryptedArrayOutput}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default Example;
