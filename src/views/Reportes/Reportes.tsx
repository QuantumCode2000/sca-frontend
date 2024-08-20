import React, { useEffect, useState } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import moment from "moment";
import "chart.js/auto";
import { useWeapons } from "../../contexts/WeaponsContext/WeaponsContext";
import { useMovements } from "../../contexts/MovementsContext/MovementsContext";
// const armas = [
//   {
//     codigo: "310320147",
//     nroarma: "0000000123",
//     estado: "B/E",
//     observations: "Regular, estado operable",
//     propietario: "Departamento VI",
//     armamento: "Fusil Galil",
//     modelo: "AR",
//     calibre: "5.56 x 45 mm",
//     industria: "Israel",
//     inInventory: "Si",
//     clasification: "Organico",
//   },
//   {
//     codigo: "831685815",
//     nroarma: "0000000124",
//     estado: "R/E",
//     observations: "Regular, estado operable",
//     propietario: "Departamento VI",
//     armamento: "Fusil Galil",
//     modelo: "AR",
//     calibre: "5.56 x 45 mm",
//     industria: "Israel",
//     inInventory: "No",
//     clasification: "Dotacion Individual",
//   },
//   {
//     codigo: "710320199",
//     nroarma: "0000000156",
//     estado: "M/E",
//     observations: "En mantenimiento, no operable",
//     propietario: "Departamento VII",
//     armamento: "Fusil AK-47",
//     modelo: "AK-47",
//     calibre: "7.62 x 39 mm",
//     industria: "Rusia",
//     inInventory: "Si",
//     clasification: "Organico",
//   },
//   {
//     codigo: "221985612",
//     nroarma: "0000000177",
//     estado: "B/E",
//     observations: "Estado operativo",
//     propietario: "Departamento VIII",
//     armamento: "Pistola Beretta",
//     modelo: "M9",
//     calibre: "9 mm",
//     industria: "Italia",
//     inInventory: "Si",
//     clasification: "Dotacion Individual",
//   },
//   {
//     codigo: "451236789",
//     nroarma: "0000000201",
//     estado: "B/E",
//     observations: "Nuevo ingreso, estado operativo",
//     propietario: "Departamento IX",
//     armamento: "Carabina M4",
//     modelo: "M4",
//     calibre: "5.56 x 45 mm",
//     industria: "EE.UU.",
//     inInventory: "Si",
//     clasification: "Organico",
//   },
//   {
//     codigo: "789654123",
//     nroarma: "0000000222",
//     estado: "R/E",
//     observations: "En revisión",
//     propietario: "Departamento X",
//     armamento: "Pistola Glock",
//     modelo: "G19",
//     calibre: "9 mm",
//     industria: "Austria",
//     inInventory: "No",
//     clasification: "Dotacion Individual",
//   },
//   {
//     codigo: "147258369",
//     nroarma: "0000000255",
//     estado: "M/E",
//     observations: "En mantenimiento",
//     propietario: "Departamento XI",
//     armamento: "Fusil SCAR",
//     modelo: "SCAR-L",
//     calibre: "5.56 x 45 mm",
//     industria: "Bélgica",
//     inInventory: "Si",
//     clasification: "Organico",
//   },
//   {
//     codigo: "963852741",
//     nroarma: "0000000288",
//     estado: "B/E",
//     observations: "Operativo, asignado a patrullaje",
//     propietario: "Departamento XII",
//     armamento: "Pistola CZ",
//     modelo: "CZ 75",
//     calibre: "9 mm",
//     industria: "República Checa",
//     inInventory: "Si",
//     clasification: "Dotacion Individual",
//   },
//   {
//     codigo: "159357456",
//     nroarma: "0000000303",
//     estado: "R/E",
//     observations: "En reserva",
//     propietario: "Departamento XIII",
//     armamento: "Fusil HK416",
//     modelo: "HK416",
//     calibre: "5.56 x 45 mm",
//     industria: "Alemania",
//     inInventory: "No",
//     clasification: "Organico",
//   },
//   {
//     codigo: "753159852",
//     nroarma: "0000000320",
//     estado: "B/E",
//     observations: "Estado operativo, en inventario",
//     propietario: "Departamento XIV",
//     armamento: "Escopeta Remington",
//     modelo: "870",
//     calibre: "12 gauge",
//     industria: "EE.UU.",
//     inInventory: "Si",
//     clasification: "Dotacion Individual",
//   },
// ];

// const movimientos = [
//   {
//     id: "1",
//     fechaSalida: "2024-07-30 11:06",
//     fechaRegreso: "Pendiente",
//     codigo: "310320147",
//     solicitante: "12121212",
//     motivo: "Desfile",
//     actaSalida: "No Asignada",
//     actaRegreso: "No Asignada",
//   },
//   {
//     id: "2",
//     fechaSalida: "2024-07-15 09:30",
//     fechaRegreso: "2024-07-16 14:45",
//     codigo: "831685815",
//     solicitante: "13131313",
//     motivo: "Patrullaje",
//     actaSalida: "Asignada",
//     actaRegreso: "Asignada",
//   },
//   {
//     id: "3",
//     fechaSalida: "2024-08-01 10:00",
//     fechaRegreso: "2024-08-02 16:30",
//     codigo: "710320199",
//     solicitante: "14141414",
//     motivo: "Entrenamiento",
//     actaSalida: "Asignada",
//     actaRegreso: "Asignada",
//   },
//   {
//     id: "4",
//     fechaSalida: "2024-08-03 08:45",
//     fechaRegreso: "Pendiente",
//     codigo: "221985612",
//     solicitante: "15151515",
//     motivo: "Operación",
//     actaSalida: "No Asignada",
//     actaRegreso: "No Asignada",
//   },
//   {
//     id: "5",
//     fechaSalida: "2024-08-05 09:00",
//     fechaRegreso: "2024-08-05 18:00",
//     codigo: "451236789",
//     solicitante: "16161616",
//     motivo: "Inspección",
//     actaSalida: "Asignada",
//     actaRegreso: "Asignada",
//   },
//   {
//     id: "6",
//     fechaSalida: "2024-08-07 14:30",
//     fechaRegreso: "2024-09-09 10:00",
//     codigo: "789654123",
//     solicitante: "17171717",
//     motivo: "Revisión",
//     actaSalida: "Asignada",
//     actaRegreso: "Asignada",
//   },
//   {
//     id: "7",
//     fechaSalida: "2024-08-10 13:15",
//     fechaRegreso: "Pendiente",
//     codigo: "147258369",
//     solicitante: "18181818",
//     motivo: "Mantenimiento",
//     actaSalida: "No Asignada",
//     actaRegreso: "No Asignada",
//   },
//   {
//     id: "8",
//     fechaSalida: "2024-08-12 11:00",
//     fechaRegreso: "2024-08-12 15:30",
//     codigo: "963852741",
//     solicitante: "19191919",
//     motivo: "Patrullaje",
//     actaSalida: "Asignada",
//     actaRegreso: "Asignada",
//   },
//   {
//     id: "9",
//     fechaSalida: "2024-09-14 09:45",
//     fechaRegreso: "2024-09-14 17:00",
//     codigo: "159357456",
//     solicitante: "20202020",
//     motivo: "Reserva",
//     actaSalida: "Asignada",
//     actaRegreso: "Asignada",
//   },
//   {
//     id: "10",
//     fechaSalida: "2024-08-15 08:45",
//     fechaRegreso: "Pendiente",
//     codigo: "753159852",
//     solicitante: "21212121",
//     motivo: "Operación",
//     actaSalida: "No Asignada",
//     actaRegreso: "No Asignada",
//   },
// ];

const Reportes = () => {
  const { weapons } = useWeapons();
  const { movements } = useMovements();
  const [estadoData, setEstadoData] = useState(null);
  const [inventarioData, setInventarioData] = useState(null);
  const [clasificacionData, setClasificacionData] = useState(null);
  const [movimientosData, setMovimientosData] = useState(null);
  const armas = weapons;
  const movimientos = movements;
  useEffect(() => {
    // Datos para el gráfico de Pie (Estado de las Armas)
    setEstadoData({
      labels: ["B/E", "R/E", "M/E"],
      datasets: [
        {
          data: [
            armas.filter((arma) => arma.estado === "B/E").length,
            armas.filter((arma) => arma.estado === "R/E").length,
            armas.filter((arma) => arma.estado === "M/E").length,
          ],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    });

    // Datos para el gráfico de Barras (Inventario)
    setInventarioData({
      labels: ["En Inventario", "No en Inventario"],
      datasets: [
        {
          label: "Armas en Inventario",
          data: [
            armas.filter((arma) => arma.inInventory === "Si").length,
            armas.filter((arma) => arma.inInventory === "No").length,
          ],
          backgroundColor: ["#4BC0C0", "#FF6384"],
          borderColor: ["#4BC0C0", "#FF6384"],
          borderWidth: 1,
        },
      ],
    });

    // Datos para el gráfico de Barras (Clasificación)
    setClasificacionData({
      labels: ["Orgánico", "Dotación Individual"],
      datasets: [
        {
          label: "Clasificación de Armas",
          data: [
            armas.filter((arma) => arma.clasification === "Organico").length,
            armas.filter((arma) => arma.clasification === "Dotacion Individual")
              .length,
          ],
          backgroundColor: ["#FFCE56", "#36A2EB"],
          borderColor: ["#FFCE56", "#36A2EB"],
          borderWidth: 1,
        },
      ],
    });

    // Datos para el gráfico de Líneas (Movimientos por mes)
    const movimientosPorMes = movimientos.reduce((acc, movimiento) => {
      const mes = moment(movimiento.fechaSalida).format("YYYY-MM");
      if (!acc[mes]) acc[mes] = { salidas: 0, regresos: 0, pendientes: 0 };
      acc[mes].salidas += 1;
      if (movimiento.fechaRegreso !== "Pendiente") {
        acc[mes].regresos += 1;
      } else {
        acc[mes].pendientes += 1;
      }
      return acc;
    }, {});

    const meses = Object.keys(movimientosPorMes).sort();
    const dataSalidas = meses.map((mes) => movimientosPorMes[mes].salidas);
    const dataRegresos = meses.map((mes) => movimientosPorMes[mes].regresos);
    const dataPendientes = meses.map(
      (mes) => movimientosPorMes[mes].pendientes,
    );

    setMovimientosData({
      labels: meses,
      datasets: [
        {
          label: "Salidas",
          data: dataSalidas,
          fill: false,
          borderColor: "#4BC0C0",
        },
        {
          label: "Regresos",
          data: dataRegresos,
          fill: false,
          borderColor: "#36A2EB",
        },
        {
          label: "Pendientes",
          data: dataPendientes,
          fill: false,
          borderColor: "#FF6384",
        },
      ],
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Reportes de Armas</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {estadoData && (
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Estado de las Armas
            </h3>
            <Pie data={estadoData} />
          </div>
        )}

        {inventarioData && (
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Armas en Inventario
            </h3>
            <Bar data={inventarioData} />
          </div>
        )}

        {clasificacionData && (
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Clasificación de Armas
            </h3>
            <Bar data={clasificacionData} />
          </div>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        {movimientosData && (
          <>
            <h3 className="text-lg font-semibold mb-4 text-center">
              Movimientos de Armas por Mes
            </h3>
            <Line data={movimientosData} />
          </>
        )}
      </div>
    </div>
  );
};

export default Reportes;
