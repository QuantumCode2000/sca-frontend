import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MovementsProvider } from "./contexts/MovementsContext/MovementsContext.tsx";
import { WeaponsProvider } from "./contexts/WeaponsContext/WeaponsContext.tsx";
import { UsersProvider } from "./contexts/UsersContext/UsersContext.tsx";
import { ActasProvider } from "./contexts/ActasContext/ActasContext.tsx";
import { KeyProvider } from "./contexts/KeyContext/KeyContext.tsx";
import { AuthProvider } from "./contexts/AuthContext/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <KeyProvider>
      <AuthProvider>
        <UsersProvider>
          <WeaponsProvider>
            <MovementsProvider>
              <ActasProvider>
                <App />
              </ActasProvider>
            </MovementsProvider>
          </WeaponsProvider>
        </UsersProvider>
      </AuthProvider>
    </KeyProvider>
  </React.StrictMode>,
);
