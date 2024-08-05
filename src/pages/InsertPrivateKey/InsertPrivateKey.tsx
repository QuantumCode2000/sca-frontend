import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const InsertPrivateKey = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleVerifyKey = async () => {
    try {
      const response = await axios.post("http://localhost:8000/verify_key", {
        private_key: privateKey,
      });
      if (response.data.message === "Private key is valid") {
        setRedirect(true);
      }
    } catch (err) {
      setError("Invalid private key");
    }
  };

  if (redirect) {
    return <Navigate to="/historial-movimientos" />;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center">
        <textarea
          className="border rounded p-2 mb-4 w-full"
          placeholder="Ingrese la clave privada"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          rows="10"
          style={{
            WebkitTextSecurity: "disc",
            MozTextSecurity: "disc",
            textSecurity: "disc",
          }}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleVerifyKey}
        >
          Verificar clave
        </button>
      </div>
    </div>
  );
};

export default InsertPrivateKey;
