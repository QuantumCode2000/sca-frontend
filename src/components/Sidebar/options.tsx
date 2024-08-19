import { FaBuildingFlag } from "react-icons/fa6";

const options = [
  {
    text: "Gestión de Personal",
    options: [
      {
        to: "/registro-personal",
        icon: <FaBuildingFlag />,
        text: "Registro Personal",
      },
    ],
  },
  {
    text: "Gestión de Armas",
    options: [
      {
        to: "/armas-salida",
        icon: <FaBuildingFlag />,
        text: "Armas Salida",
      },
      {
        to: "/armas-entrada",
        icon: <FaBuildingFlag />,
        text: "Armas Entrada",
      },
      {
        to: "/historial-movimientos",
        icon: <FaBuildingFlag />,
        text: "Historial Movimientos",
      },
      {
        to: "/registro-armas",
        icon: <FaBuildingFlag />,
        text: "Registro Armas",
      },
      // {
      //   to: "/actas",
      //   icon: <FaBuildingFlag />,
      //   text: "Actas",
      // },
      {
        to: "/extraer-datos",
        icon: <FaBuildingFlag />,
        text: "Extraer Datos",
      },
    ],
  },
];

export { options };
