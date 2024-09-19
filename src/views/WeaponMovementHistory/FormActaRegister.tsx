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
  movementInformation,
  onCancel,
  onActaGenerated,
}) => {
  const [localErrors, setLocalErrors] = useState({});
  const { users } = useUsers();
  const { encargados } = useActas();
  const { weapons } = useWeapons();
  const { movements } = useMovements();
  const [tipoActa, setTipoActa] = useState("");
  const [entregueConforme, setEntregueConforme] = useState("");
  const [recibiConforme, setRecibiConforme] = useState("");
  const [otroEntregeConforme, setOtroEntregueConforme] = useState("");
  const [otroRecibiConforme, setOtroRecibiConforme] = useState("");
  const [encargado1, setEncargado1] = useState(
    encargados.find((e) => e.id === 1),
  );
  const [encargado2, setEncargado2] = useState(
    encargados.find((e) => e.id === 2),
  );
  const [encargado3, setEncargado3] = useState(
    encargados.find((e) => e.id === 3),
  );
  const [encargado4, setEncargado4] = useState(
    encargados.find((e) => e.id === 4),
  );
  const [encargado1Included, setEncargado1Included] = useState(false);
  const [encargado2Included, setEncargado2Included] = useState(false);
  const [encargado3Included, setEncargado3Included] = useState(false);
  const [encargado4Included, setEncargado4Included] = useState(false);
  console.log("encargado1Included", encargado1Included);
  console.log("encargado2Included", encargado2Included);
  console.log("encargado3Included", encargado3Included);
  console.log("encargado4Included", encargado4Included);
  console.log("encargado1", encargado1);
  console.log("encargado2", encargado2);
  console.log("encargado3", encargado3);
  console.log("encargado4", encargado4);
  console.log("Entregue Conforme", entregueConforme);
  console.log("Recibi Conforme", recibiConforme);
  console.log("Otro Entregue Conforme", otroEntregeConforme);
  console.log("Otro Recibi Conforme", otroRecibiConforme);

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
        entregueConforme === encargado1?.nombre
          ? recibiConforme === "Otro"
            ? otroRecibiConforme
            : recibiConforme
          : entregueConforme === "Otro"
          ? otroEntregeConforme
          : entregueConforme
      }, en calidad de custodia por ${tipoActa} del mencionado con el siguiente detalle:`;
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
        (m) => m.id === movementInformation.id,
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

      if (encargado1?.nombre === entregueConforme) {
        doc.text(
          "ENTREGUE CONFORME:",
          positions[1].x - eC / 2,
          doc.autoTable.previous.finalY + 20,
        );
        doc.text(
          encargado1.nombre,
          positions[1].x - doc.getTextWidth(encargado1.nombre) / 2,
          doc.autoTable.previous.finalY + 50,
        );
        doc.text(
          encargado1.cargo,
          positions[1].x - doc.getTextWidth(encargado1.cargo) / 2,
          doc.autoTable.previous.finalY + 55,
        );
        doc.text(
          "RECIBÍ CONFORME:",
          positions[0].x - rC / 2,
          doc.autoTable.previous.finalY + 20,
        );
        doc.text(
          recibiConforme || otroRecibiConforme,
          positions[0].x -
            doc.getTextWidth(recibiConforme || otroRecibiConforme) / 2,
          doc.autoTable.previous.finalY + 50,
        );
        doc.text(
          "C.I. ......................................",
          positions[0].x -
            doc.getTextWidth("C.I. ......................................") / 2,
          doc.autoTable.previous.finalY + 55,
        );
      }

      if (encargado1?.nombre === recibiConforme) {
        doc.text(
          "RECIBÍ CONFORME:",
          positions[0].x - rC / 2,
          doc.autoTable.previous.finalY + 20,
        );
        doc.text(
          encargado1.nombre,
          positions[0].x - doc.getTextWidth(encargado1.nombre) / 2,
          doc.autoTable.previous.finalY + 50,
        );
        doc.text(
          encargado1.cargo,
          positions[0].x - doc.getTextWidth(encargado1.cargo) / 2,
          doc.autoTable.previous.finalY + 55,
        );
        doc.text(
          "ENTREGUE CONFORME:",
          positions[1].x - eC / 2,
          doc.autoTable.previous.finalY + 20,
        );
        doc.text(
          entregueConforme || otroEntregeConforme,
          positions[1].x -
            doc.getTextWidth(entregueConforme || otroEntregeConforme) / 2,
          doc.autoTable.previous.finalY + 50,
        );
        doc.text(
          "C.I. ......................................",
          positions[1].x -
            doc.getTextWidth("C.I. ......................................") / 2,
          doc.autoTable.previous.finalY + 55,
        );
      }

      if (encargado2Included === true) {
        doc.text(
          encargado2.nombre,
          positions[0].x - doc.getTextWidth(encargado2.nombre) / 2,
          doc.autoTable.previous.finalY + 90,
        );
        doc.text(
          encargado2.cargo,
          positions[0].x - doc.getTextWidth(encargado2.cargo) / 2,
          doc.autoTable.previous.finalY + 95,
        );
      }

      if (encargado3Included === true) {
        doc.text(
          encargado3.nombre,
          positions[1].x - doc.getTextWidth(encargado3.nombre) / 2,
          doc.autoTable.previous.finalY + 90,
        );
        doc.text(
          encargado3.cargo,
          positions[1].x - doc.getTextWidth(encargado3.cargo) / 2,
          doc.autoTable.previous.finalY + 95,
        );
      }

      if (encargado4Included === true) {
        doc.text(
          encargado4.nombre,
          (doc.internal.pageSize.getWidth() -
            doc.getTextWidth(encargado4.nombre)) /
            2,
          doc.autoTable.previous.finalY + 130,
        );
        doc.text(
          encargado4.cargo,
          (doc.internal.pageSize.getWidth() -
            doc.getTextWidth(encargado4.cargo)) /
            2,
          doc.autoTable.previous.finalY + 135,
        );
      }

      doc.save(`Acta_${movementInformation.id}.pdf`);
      console.log("PDF generado y guardado con éxito.");

      onActaGenerated(randomNum);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  return (
    <form className="space-y-4">
      <Select
        id="actaType"
        label="Tipo de Acta"
        value={tipoActa}
        onChange={(e) => setTipoActa(e.target.value)}
        options={actaTypes}
      />
      <Input
        id="movementId"
        label="Movimiento ID"
        value={movementInformation.id}
        onChange={"/"}
        readOnly
      />

      <div className="bg-gray-200 p-4 rounded-sm">
        <Select
          id="entregueConforme"
          label="Entregue Conforme"
          value={entregueConforme}
          onChange={(e) => setEntregueConforme(e.target.value)}
          options={[
            "Otro",
            ...users.map(
              (user) =>
                `${user.grado} ${user.especialidad} ${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`,
            ),
          ]}
        />
        {entregueConforme === "Otro" && (
          <Input
            id="otroNombre"
            label="Nombre del receptor"
            value={otroEntregeConforme}
            onChange={(e) => setOtroEntregueConforme(e.target.value)}
            placeholder="Nombre completo del receptor"
          />
        )}
      </div>

      <div className="bg-gray-200 p-4 rounded-sm">
        <Select
          id="recibiConforme"
          label="Recibi Conforme"
          value={recibiConforme}
          onChange={(e) => setRecibiConforme(e.target.value)}
          options={[
            "Otro",
            ...users.map(
              (user) =>
                `${user.grado} ${user.especialidad} ${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`,
            ),
          ]}
        />
        {recibiConforme === "Otro" && (
          <Input
            id="otroNombre"
            label="Nombre del receptor"
            value={otroRecibiConforme}
            onChange={(e) => setOtroRecibiConforme(e.target.value)}
            placeholder="Nombre completo del receptor"
          />
        )}
      </div>

      <div>
        <div
          key={encargado1?.id}
          className="flex items-center space-x-4 p-2 bg-gray-50 rounded-lg shadow-sm"
        >
          <input
            type="checkbox"
            id={encargado1?.id}
            name={encargado1?.id}
            onChange={() => setEncargado1Included(!encargado1Included)}
            className="form-checkbox h-5 w-5 text-blue-600 rounded"
          />
          <div className="flex flex-col">
            <label
              htmlFor={encargado1?.id}
              className="text-gray-800 font-medium"
            >
              {encargado1?.nombre}
            </label>
            <span className="text-sm text-gray-600">{encargado1?.cargo}</span>
          </div>
        </div>
      </div>

      <div>
        <div
          key={encargado2?.id}
          className="flex items-center space-x-4 p-2 bg-gray-50 rounded-lg shadow-sm"
        >
          <input
            type="checkbox"
            id={encargado2?.id}
            name={encargado2?.id}
            onChange={() => setEncargado2Included(!encargado2Included)}
            className="form-checkbox h-5 w-5 text-blue-600 rounded"
          />
          <div className="flex flex-col">
            <label
              htmlFor={encargado2?.id}
              className="text-gray-800 font-medium"
            >
              {encargado2?.nombre}
            </label>
            <span className="text-sm text-gray-600">{encargado2?.cargo}</span>
          </div>
        </div>
      </div>
      <div>
        <div
          key={encargado3?.id}
          className="flex items-center space-x-4 p-2 bg-gray-50 rounded-lg shadow-sm"
        >
          <input
            type="checkbox"
            id={encargado3?.id}
            name={encargado3?.id}
            onChange={() => setEncargado3Included(!encargado3Included)}
            className="form-checkbox h-5 w-5 text-blue-600 rounded"
          />
          <div className="flex flex-col">
            <label
              htmlFor={encargado3?.id}
              className="text-gray-800 font-medium"
            >
              {encargado3?.nombre}
            </label>
            <span className="text-sm text-gray-600">{encargado3?.cargo}</span>
          </div>
        </div>
      </div>

      <div>
        <div
          key={encargado4?.id}
          className="flex items-center space-x-4 p-2 bg-gray-50 rounded-lg shadow-sm"
        >
          <input
            type="checkbox"
            id={encargado4?.id}
            name={encargado4?.id}
            onChange={() => setEncargado4Included(!encargado4Included)}
            className="form-checkbox h-5 w-5 text-blue-600 rounded"
          />
          <div className="flex flex-col">
            <label
              htmlFor={encargado4?.id}
              className="text-gray-800 font-medium"
            >
              {encargado4?.nombre}
            </label>
            <span className="text-sm text-gray-600">{encargado4?.cargo}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button text="Cancelar" onClick={onCancel} />
        <Button text="Registrar Acta" onClick={handleGeneratePDF} />
      </div>
    </form>
  );
};

export default FormActaRegister;
