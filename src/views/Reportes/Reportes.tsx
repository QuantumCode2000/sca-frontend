import React, { useEffect, useState } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import moment from "moment";
import "chart.js/auto";
import { useWeapons } from "../../contexts/WeaponsContext/WeaponsContext";
import { useMovements } from "../../contexts/MovementsContext/MovementsContext";

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
            armas.filter((arma) => arma.inInventory === "Sí").length,
            armas.filter((arma) => arma.inInventory === "No").length,
          ],
          backgroundColor: ["#4BC0C0", "#FF6384"],
          borderColor: ["#4BC0C0", "#FF6384"],
          borderWidth: 1,
        },
      ],
    });

    setClasificacionData({
      labels: ["Orgánico", "Dotación Individual"],
      datasets: [
        {
          label: "Clasificación de Armas",
          data: [
            armas.filter((arma) => arma.clasification === "Orgánica").length,
            armas.filter((arma) => arma.clasification === "Dotación Individual")
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
