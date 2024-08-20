import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Unidades from "./views/Unidades/Unidades";
import Reportes from "./views/Reportes/Reportes";
import WeaponExit from "./views/WeaponExit/WeaponExit";
import WeaponEntry from "./views/WeaponEntry/WeaponEntry";
import WeaponMovementHistory from "./views/WeaponMovementHistory/WeaponMovementHistory";
import Layout from "./layout/Layout";
import Login from "./pages/Login/Login";
import WeaponRegister from "./views/WeaponRegister/WeaponRegister";
import PersonalRegister from "./views/PersonalRegister/PersonalRegister";
import Example from "./views/Example/Example";

import Actas from "./views/Actas/Actas";
import InsertPrivateKey from "./pages/InsertPrivateKey/InsertPrivateKey";
import ExtraerDatos from "./views/ExtraerDatos/ExtraerDatos";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "unidades",
        element: <Unidades />,
      },
      {
        path: "reportes",
        element: <Reportes />,
      },
      {
        path: "armas-salida",
        element: <WeaponExit />,
      },
      {
        path: "armas-entrada",
        element: <WeaponEntry />,
      },
      {
        path: "historial-movimientos",
        element: <WeaponMovementHistory />,
      },
      {
        path: "registro-armas",
        element: <WeaponRegister />,
      },
      {
        path: "registro-personal",
        element: <PersonalRegister />,
      },
      {
        path: "actas",
        element: <Actas />,
      },
      {
        path: "extraer-datos",
        element: <ExtraerDatos />,
      },
      {
        path: "example",
        element: <Example />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/",
    element: <InsertPrivateKey />,
    index: true,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
