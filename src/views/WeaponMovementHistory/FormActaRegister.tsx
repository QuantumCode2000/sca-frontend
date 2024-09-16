import { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import { useUsers } from "../../contexts/UsersContext/UsersContext";
import { useActas } from "../../contexts/ActasContext/ActasContext";
import { useWeapons } from "../../contexts/WeaponsContext/WeaponsContext";
import { useMovements } from "../../contexts/MovementsContext/MovementsContext";
import { actaTypes } from "../../data/selectOptions";

const FormActaRegister = ({
  formData,
  handleChange,
  onCancel,
  handleSubmit,
}) => {
  const [localErrors, setLocalErrors] = useState({});
  const { users } = useUsers();
  const { encargados } = useActas();
  const { weapons } = useWeapons();
  const { movements } = useMovements();

  // State to track which encargados will be included in the PDF
  const [includedEncargados, setIncludedEncargados] = useState({});

  const findWeapon = (codigo) => {
    const tableHeaders = [
      "nroarma",
      "modelo",
      "armamento",
      "calibre",
      "industria",
      "observations",
    ];
    const weapon = weapons.find((w) => w.codigo === codigo);
    return tableHeaders.map((header) => (weapon ? weapon[header] : ""));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.movementId) errors.movementId = "Movimiento ID es requerido";
    if (!formData.actaType) errors.actaType = "Tipo de Acta es requerido";
    if (formData.entregueConforme === "Otro" && !formData.otroNombre) {
      errors.otroNombre = "Debe proporcionar un nombre si selecciona 'Otro'";
    }
    setLocalErrors(errors);
    return errors;
  };

  const handleGeneratePDF = () => {
    console.log("Generando PDF...");
    try {
      const errors = validateForm();
      if (Object.keys(errors).length > 0) {
        setLocalErrors(errors);
        console.log("Formulario tiene errores. No se generará el PDF.");
        return;
      }

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "letter",
      });
      const date = new Date();
      const days = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ];
      const formattedDay = days[date.getDay()];

      const formattedTime = `${date.getHours()}:${date.getMinutes()}`;
      const randomNum = `${Math.floor(Math.random() * 10000)}/${date
        .getFullYear()
        .toString()
        .slice(-2)}`;

      console.log("Datos del formulario:", formData);

      doc.setFontSize(10);
      doc.text("ARMADA BOLIVIANA", 30, 20);
      doc.text("DEPARTAMENTO IV LOGÍSTICA", 20, 25);
      doc.setFont("helvetica", "bold", "");
      const textB = "BOLIVIA";
      const x = 42;
      const y = 30;
      const textWidth = doc.getTextWidth(textB);
      doc.text(textB, x, y);
      const lineHeigth = y + 1;
      doc.setLineWidth(0.5);
      doc.line(x, lineHeigth, x + textWidth, lineHeigth);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(
        `DPTO. IV – LOG. DIV. “C” MAT. BEL. Nº ${randomNum}`,
        190,
        35,
        null,
        null,
        "right",
      );
      doc.setFont("helvetica", "normal");
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");

      doc.text("ACTA DE ENTREGA Y RECEPCION", 105, 45, null, null, "center");

      doc.setFont("helvetica", "normal");

      doc.setFontSize(12);
      const text = `En la ciudad de La Paz, a horas ${formattedTime} del día ${formattedDay}, en instalaciones del Comando General de la Armada Boliviana, Departamento IV - Logística del EMGAB., División “C” Material Bélico, y en presencia de los suscritos se procedió a la entrega y recepción del Armamento de Dotación Individual perteneciente al Sr. ${
        formData.entregueConforme || formData.otroNombre
      }, en calidad de custodia por ${
        formData.actaType
      } del mencionado con el siguiente detalle:`;
      doc.text(text, 20, 55, { maxWidth: 170, align: "justify" });

      const tableColumn = [
        "Nº DEL ARMA",
        "MODELO",
        "ARMAMENTO",
        "CALIBRE",
        "INDUSTRIA",
        "OBSERVACIONES",
      ];

      const movementCode = movements.find(
        (m) => m.id === formData.movementId,
      )?.codigo;
      const tableRows = [[...findWeapon(movementCode)]];

      autoTable(doc, {
        tableWidth: "auto",
        startY: 90,
        head: [tableColumn],
        body: tableRows,
        theme: "striped",
        styles: {
          fontSize: 10,
          overflow: "linebreak",
          cellPadding: 2,
          lineColor: [0, 0, 0],
          lineWidth: 0.2,
        },
        headStyles: {
          valign: "middle",
          halign: "center",
          fillColor: [205, 205, 205],

          textColor: [0, 0, 0],
        },
        tableLineColor: [0, 0, 0],
        tableLineWidth: 0.2,
        columnStyles: {
          0: { halign: "center" },
          1: { halign: "center" },
          2: { halign: "center" },
          3: { halign: "center" },
          4: { halign: "center" },
          5: { halign: "left" },
          6: { halign: "right" },
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240],
        },
        bodyStyles: {
          fillColor: [255, 255, 255],

          textColor: [0, 0, 0],
          fontSize: 10,
          minCellHeight: 15,
        },
      });

      const pW = doc.internal.pageSize.getWidth();
      const hW = pW / 2;
      const positions = [{ x: hW / 2 }, { x: (3 * hW) / 2 }];

      doc.setFontSize(12);
      const eC = doc.getTextWidth("ENTREGUE CONFORME:");
      const rC = doc.getTextWidth("RECIBÍ CONFORME:");
      doc.text(
        "ENTREGUE CONFORME:",
        positions[0].x - eC / 2,
        doc.autoTable.previous.finalY + 20,
      );
      doc.text(
        "RECIBÍ CONFORME:",
        positions[1].x - rC / 2,
        doc.autoTable.previous.finalY + 20,
      );
      doc.text(
        formData.entregueConforme || formData.otroNombre,
        positions[0].x -
          doc.getTextWidth(formData.entregueConforme || formData.otroNombre) /
            2,
        doc.autoTable.previous.finalY + 50,
      );
      doc.text(
        "C.I. ......................................",
        positions[0].x -
          doc.getTextWidth("C.I. ......................................") / 2,
        doc.autoTable.previous.finalY + 55,
      );
      doc.text(
        encargados[0].nombre || formData.otroNombre,
        positions[1].x -
          doc.getTextWidth(encargados[0].nombre || formData.otroNombre) / 2,
        doc.autoTable.previous.finalY + 50,
      );
      doc.text(
        encargados[0].cargo,
        positions[1].x - doc.getTextWidth(encargados[0].cargo) / 2,
        doc.autoTable.previous.finalY + 55,
      );

      doc.text(
        encargados[1].nombre || formData.otroNombre,
        positions[0].x -
          doc.getTextWidth(encargados[1].nombre || formData.otroNombre) / 2,
        doc.autoTable.previous.finalY + 90,
      );
      doc.text(
        encargados[1].cargo || formData.otroNombre,
        positions[0].x -
          doc.getTextWidth(encargados[1].cargo || formData.otroNombre) / 2,
        doc.autoTable.previous.finalY + 95,
      );

      doc.text(
        encargados[2].nombre || formData.otroNombre,
        positions[1].x -
          doc.getTextWidth(encargados[2].nombre || formData.otroNombre) / 2,
        doc.autoTable.previous.finalY + 90,
      );
      doc.text(
        encargados[2].cargo,
        positions[1].x - doc.getTextWidth(encargados[2].cargo) / 2,
        doc.autoTable.previous.finalY + 95,
      );

      doc.text(
        encargados[3].nombre || formData.otroNombre,
        (doc.internal.pageSize.getWidth() -
          doc.getTextWidth(encargados[3].nombre)) /
          2,
        doc.autoTable.previous.finalY + 130,
      );
      doc.text(
        encargados[3].cargo || formData.otroNombre,
        (doc.internal.pageSize.getWidth() -
          doc.getTextWidth(encargados[3].cargo)) /
          2,
        doc.autoTable.previous.finalY + 135,
      );

      doc.save(`Acta_${formData.movementId}.pdf`);
      console.log("PDF generado y guardado con éxito.");

      handleSubmit(randomNum);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  const handleCheckboxChange = (id) => {
    setIncludedEncargados((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <form className="space-y-4">
      <Select
        id="actaType"
        label="Tipo de Acta"
        value={formData.actaType}
        onChange={(e) =>
          handleChange({ target: { id: "actaType", value: e.target.value } })
        }
        options={actaTypes}
        error={localErrors.actaType}
      />
      <Input
        id="movementId"
        label="Movimiento ID"
        value={formData.movementId}
        onChange={handleChange}
        readOnly
        error={localErrors.movementId}
      />

      <div className="bg-gray-200 p-4 rounded-sm">
        <Select
          id="entregueConforme"
          label="Entregue Conforme"
          value={formData.entregueConforme}
          onChange={(e) =>
            handleChange({
              target: { id: "entregueConforme", value: e.target.value },
            })
          }
          options={[
            ...users.map(
              (user) => `${user.grado} ${user.nombre} ${user.apellidoPaterno}`,
            ),
            "Otro",
          ]}
        />
        {formData.entregueConforme === "Otro" && (
          <Input
            id="otroNombre"
            label="Nombre del receptor"
            value={formData.otroNombre}
            onChange={(e) =>
              handleChange({
                target: { id: "otroNombre", value: e.target.value },
              })
            }
            error={localErrors.otroNombre}
            placeholder="Nombre completo del receptor"
          />
        )}
      </div>

      <div>
        {encargados.map((encargado) => (
          <div
            key={encargado.id}
            className="flex items-center space-x-4 p-2 bg-gray-50 rounded-lg shadow-sm"
          >
            <input
              type="checkbox"
              id={encargado.id}
              name={encargado.id}
              checked={!!includedEncargados[encargado.id]}
              onChange={() => handleCheckboxChange(encargado.id)}
              className="form-checkbox h-5 w-5 text-blue-600 rounded"
            />
            <div className="flex flex-col">
              <label
                htmlFor={encargado.id}
                className="text-gray-800 font-medium"
              >
                {encargado.nombre}
              </label>
              <span className="text-sm text-gray-600">{encargado.cargo}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-2">
        <Button text="Cancelar" onClick={onCancel} />
        <Button text="Registrar Acta" onClick={handleGeneratePDF} />
      </div>
    </form>
  );
};

export default FormActaRegister;
