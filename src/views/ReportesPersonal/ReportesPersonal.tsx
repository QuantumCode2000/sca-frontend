import  { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { useUsers } from "../../contexts/UsersContext/UsersContext";

const ReportesPersonal = () => {
  const [estadoData, setEstadoData] = useState(null);
  const [permisoData, setPermisoData] = useState(null);
  const [rolData, setRolData] = useState(null);
  const [cantidadUsuariosData, setCantidadUsuariosData] = useState(null);
  const { users } = useUsers();
  useEffect(() => {
    setEstadoData({
      labels: ["Activo", "Inactivo"],
      datasets: [
        {
          data: [
            users.filter((user) => user.estado === "Activo").length,
            users.filter((user) => user.estado === "Inactivo").length,
          ],
          backgroundColor: ["#36A2EB", "#FF6384"],
          hoverBackgroundColor: ["#36A2EB", "#FF6384"],
        },
      ],
    });

    setPermisoData({
      labels: ["Con Permiso", "Sin Permiso"],
      datasets: [
        {
          data: [
            users.filter((user) => user.inSystemPermission === "Sí").length,
            users.filter((user) => user.inSystemPermission === "No").length,
          ],
          backgroundColor: ["#FFCE56", "#FF6384"],
          hoverBackgroundColor: ["#FFCE56", "#FF6384"],
        },
      ],
    });

    setRolData({
      labels: ["Administrador", "Encargado", "Personal"],
      datasets: [
        {
          data: [
            users.filter((user) => user.rol === "Administrador").length,
            users.filter((user) => user.rol === "Encargado").length,
            users.filter((user) => user.rol === "Personal").length,
          ],
          backgroundColor: ["#4BC0C0", "#FFCE56", "#FF6384"],
          hoverBackgroundColor: ["#4BC0C0", "#FFCE56", "#FF6384"],
        },
      ],
    });

    setCantidadUsuariosData({
      labels: ["Total de Usuarios"],
      datasets: [
        {
          data: [users.length],
          backgroundColor: ["#36A2EB"],
          hoverBackgroundColor: ["#36A2EB"],
        },
      ],
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Reportes de Personal
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {estadoData && (
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Usuarios Activos vs Inactivos
            </h3>
            <Pie data={estadoData} />
          </div>
        )}

        {permisoData && (
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Permisos en el Sistema
            </h3>
            <Pie data={permisoData} />
          </div>
        )}

        {rolData && (
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Usuarios por Rol
            </h3>
            <Pie data={rolData} />
          </div>
        )}

        {cantidadUsuariosData && (
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Cantidad Total de Usuarios
            </h3>
            <Pie data={cantidadUsuariosData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportesPersonal;
