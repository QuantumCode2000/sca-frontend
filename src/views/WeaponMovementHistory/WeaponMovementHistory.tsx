import React, { useState } from "react";
import Table from "../../components/Table/Table";
import { headerMovimientos } from "../../data/headers";
import { useMovements } from "../../contexts/MovementsContext/MovementsContext";
import Content from "../../components/Content/Content";
import Modal from "../../components/Modal/Modal";
import FormActaRegister from "./FormActaRegister";
import { Movement } from "../../contexts/MovementsContext/interfaces";
import Button from "../../components/Button/Button";

const WeaponMovementHistory = () => {
  const { movements, updateMovement } = useMovements();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedMovement, setSelectedMovement] = useState<Movement | null>(
    null,
  );
  const [actaType, setActaType] = useState<"Salida" | "Regreso">("Salida");
  const [formData, setFormData] = useState({
    movementId: "",
    actaType: "",
    details: "",
  });

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  const openModal = (movement, type) => {
    if (type === "Regreso" && movement.fechaRegreso === "Pendiente") {
      setModalMessage("Primero debes registrar la entrada del arma.");
    } else {
      setSelectedMovement(movement);
      setActaType(type);
      setFormData({
        movementId: movement.id,
        actaType: type,
        details: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleActaClick = (movement, type) => {
    openModal(movement, type);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (actaNumber) => {
    console.log("Form data submitted:", formData);

    if (selectedMovement) {
      const updatedMovement = {
        ...selectedMovement,
        [actaType === "Salida" ? "actaSalida" : "actaRegreso"]: actaNumber,
      };
      updateMovement(updatedMovement);
    }

    closeModal();
  };

  const renderCell = (item, key) => {
    switch (key) {
      case "actaSalida":
      case "actaRegreso":
        const actaType = key === "actaSalida" ? "Salida" : "Regreso";
        const isAssigned = item[key] !== "No Asignada";
        return (
          <>
            <Button
              onClick={() => handleActaClick(item, actaType)}
              text={isAssigned ? item[key] : "Generar Acta"}
              size="sm"
              disabled={isAssigned}
            />
          </>
        );
      default:
        return item[key];
    }
  };

  return (
    <>
      <Content>
        <Table
          header={headerMovimientos}
          body={movements}
          renderCell={(item, key) => <div>{renderCell(item, key)}</div>}
        />
      </Content>
      <Modal title="Registrar Acta" isOpen={isModalOpen} onClose={closeModal}>
        {modalMessage ? (
          <p>{modalMessage}</p>
        ) : (
          selectedMovement && (
            <FormActaRegister
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              onCancel={closeModal}
            />
          )
        )}
      </Modal>
    </>
  );
};

export default WeaponMovementHistory;
