import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MovementsProvider } from "./contexts/MovementsContext/MovementsContext.tsx";
import { WeaponsProvider } from "./contexts/WeaponsContext/WeaponsContext.tsx";
import { UsersProvider } from "./contexts/UsersContext/UsersContext.tsx";
import { ActasProvider } from "./contexts/ActasContext/ActasContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <UsersProvider>
    <WeaponsProvider>
      <MovementsProvider>
        <ActasProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ActasProvider>
      </MovementsProvider>
    </WeaponsProvider>
  </UsersProvider>,
);
