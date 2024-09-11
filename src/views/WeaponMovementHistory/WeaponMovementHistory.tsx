import { useState, useCallback } from "react";
import Table from "../../components/Table/Table";
import { headerMovimientos } from "../../data/headers";
import { useMovements } from "../../contexts/MovementsContext/MovementsContext";
import Content from "../../components/Content/Content";
import Modal from "../../components/Modal/Modal";
import FormActaRegister from "./FormActaRegister";
import Button from "../../components/Button/Button";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
import { TbLayoutBottombarExpand } from "react-icons/tb";
import { headersUsers } from "../../data/headers";
import { useUsers } from "../../contexts/UsersContext/UsersContext";
import ViewMore from "../../components/ViewMore/ViewMore";
import { headersWeapons } from "../../data/headers";
import { useWeapons } from "../../contexts/WeaponsContext/WeaponsContext";

const WeaponMovementHistory = () => {
  const { movements, updateMovement } = useMovements();
  const { weapons } = useWeapons();
  const { users } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [modalTitle, setModalTitle] = useState("");

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalContent(null);
    setModalTitle("");
  }, []);

  const openModal = useCallback((title: string, content: React.ReactNode) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  }, []);

  const handleActaClick = useCallback(
    (movement, type) => {
      if (type === "Regreso" && movement.fechaRegreso === "Pendiente") {
        openModal("Error", <p>Primero debes registrar la entrada del arma.</p>);
      } else {
        const formData = {
          movementId: movement.id,
          actaType: type,
          details: "",
        };
        openModal(
          "Registrar Acta",
          <FormActaRegister
            formData={formData}
            handleChange={(e) => {
              const { id, value } = e.target;
              setFormData((prevData) => ({ ...prevData, [id]: value }));
            }}
            handleSubmit={(actaNumber) => {
              const updatedMovement = {
                ...movement,
                [type === "Salida" ? "actaSalida" : "actaRegreso"]: actaNumber,
              };
              updateMovement(updatedMovement);
              closeModal();
            }}
            onCancel={closeModal}
          />,
        );
      }
    },
    [openModal, updateMovement, closeModal],
  );

  const handleViewText = useCallback(
    (text) => {
      openModal("Detalles", <p>{text}</p>);
    },
    [openModal],
  );

  const handleViewMoreArmaInfo = useCallback(
    (codigo: string) => {
      const weapon = weapons.find((weapon) => weapon.codigo === codigo);
      if (weapon) {
        openModal(
          "Detalles del Arma",
          <ViewMore titles={headersWeapons.verMas} data={weapon} />,
        );
      }
    },
    [weapons, openModal],
  );

  const handleViewMoreSolicitanteInfo = useCallback(
    (ci: string) => {
      const user = users.find((user) => user.ci === ci);
      if (user) {
        openModal(
          "Detalles del Solicitante",
          <ViewMore titles={headersUsers.verMas} data={user} />,
        );
      }
    },
    [users, openModal],
  );

  const renderCell = useCallback(
    (item, key) => {
      switch (key) {
        case "actaSalida":
        case "actaRegreso":
          const actaType = key === "actaSalida" ? "Salida" : "Regreso";
          const isAssigned = item[key] !== "No Asignada";
          return (
            <Button
              onClick={() => handleActaClick(item, actaType)}
              text={isAssigned ? item[key] : "Generar Acta"}
              size="sm"
              disabled={isAssigned}
            />
          );

        case "motivo":
          const summaryText =
            item[key].length > 30 ? `${item[key].slice(0, 20)}...` : item[key];
          return (
            <div className="flex flex-row">
              <div className="break-words pr-2">{summaryText}</div>
              <ButtonIcon
                icon={<TbLayoutBottombarExpand />}
                onClick={() => handleViewText(item[key])}
                textTooltip={"Ver más"}
              />
            </div>
          );

        case "codigo":
          const summaryTextCode =
            item[key].length > 10 ? `${item[key].slice(0, 10)}...` : item[key];
          return (
            <div className="flex flex-row">
              <div className="break-words pr-2">{summaryTextCode}</div>
              <ButtonIcon
                icon={<TbLayoutBottombarExpand />}
                onClick={() => handleViewMoreArmaInfo(item[key])}
                textTooltip={"Ver más"}
              />
            </div>
          );
        case "solicitante":
          const summaryTextCI =
            item[key].length > 10 ? `${item[key].slice(0, 10)}...` : item[key];
          return (
            <div className="flex flex-row">
              <div className="break-words pr-2">{summaryTextCI}</div>
              <ButtonIcon
                icon={<TbLayoutBottombarExpand />}
                onClick={() => handleViewMoreSolicitanteInfo(item[key])}
                textTooltip={"Ver más"}
              />
            </div>
          );

        case "fechaSalida":
        case "fechaRegreso":
          return (
            <span
              className={
                item[key] === "Pendiente"
                  ? "bg-yellow-500 text-white px-2 py-1 rounded flex-nowrap"
                  : "flex-nowrap"
              }
            >
              {item[key] === "Pendiente"
                ? item[key].length > 4
                  ? `${item[key].slice(0, 4)}...`
                  : item[key]
                : item[key]}
            </span>
          );

        default:
          return item[key];
      }
    },
    [handleActaClick, handleViewText, handleViewMoreArmaInfo],
  );

  return (
    <>
      <Content>
        <Table
          header={headerMovimientos}
          body={movements}
          renderCell={(item, key) => <div>{renderCell(item, key)}</div>}
        />
      </Content>
      <Modal title={modalTitle} isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
};

export default WeaponMovementHistory;
