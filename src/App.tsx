import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Unidades from "./views/Unidades/Unidades";
import Reportes from "./views/Reportes/Reportes";
import WeaponExit from "./views/WeaponExit/WeaponExit";
import WeaponEntry from "./views/WeaponEntry/WeaponEntry";
import WeaponMovementHistory from "./views/WeaponMovementHistory/WeaponMovementHistory";
import Login from "./pages/Login/Login";
import WeaponRegister from "./views/WeaponRegister/WeaponRegister";
import PersonalRegister from "./views/PersonalRegister/PersonalRegister";
import Example from "./views/Example/Example";
import Actas from "./views/Actas/Actas";
import InsertPrivateKey from "./pages/InsertPrivateKey/InsertPrivateKey";
import ExtraerDatos from "./views/ExtraerDatos/ExtraerDatos";
import ReportesPersonal from "./views/ReportesPersonal/ReportesPersonal";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/insert-private-key",
    element: <InsertPrivateKey />,
  },
  {
    path: "example",
    element: <Example />,
  },
  {
    path: "/login",
    element: <PublicRoute />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <Unidades />,
      },
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
        path: "reportes-personal",
        element: <ReportesPersonal />,
      },
    ],
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
