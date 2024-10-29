import { useState, useCallback, ReactNode } from "react";
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
import { useUsers, User } from "../../contexts/UsersContext/UsersContext";
import ViewMore from "../../components/ViewMore/ViewMore";
import { headersWeapons } from "../../data/headers";
import {
  useWeapons,
  Weapon,
} from "../../contexts/WeaponsContext/WeaponsContext";
import type { Movement } from "../../contexts/MovementsContext/interfaces";
import { useActas } from "../../contexts/ActasContext/ActasContext";
type MovementKeys = keyof Movement;

interface FormData {
  movementId: string;
  actaType: string;
  entregueConforme: string;
  otroNombre: string;
}

const WeaponMovementHistory: React.FC = () => {
  const { movements, updateMovement } = useMovements();
  const { weapons } = useWeapons();
  const { users } = useUsers();
  const { encargados } = useActas();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [modalTitle, setModalTitle] = useState<string>("");

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setModalTitle("");
  };

  const openModal = (title: string, content: ReactNode) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  // (actaNumber: string) => {
  //   const updatedMovement = {
  //     ...movement,
  //     [type === "Salida" ? "actaSalida" : "actaRegreso"]: actaNumber,
  //   };
  //   updateMovement(updatedMovement);
  //   closeModal();
  // }

  const handleActaClick = (movement: Movement, tipo) => {
    openModal(
      "Registrar Acta",
      <FormActaRegister
        movementInformation={movement}
        onCancel={closeModal}
        onActaGenerated={(actaNumber: string) => {
          let updatedMovement;
          if (tipo === "Salida") {
            updatedMovement = {
              id: movement.id,
              actaSalida: actaNumber,
            };
          } else {
            updatedMovement = {
              id: movement.id,
              actaRegreso: actaNumber,
            };
          }
          updateMovement(updatedMovement);
          closeModal();
        }}
      />,
    );
  };

  const handleViewMotivo = (text: string) => {
    openModal("Detalles", <p>{text}</p>);
  };

  const handleViewMoreArmaInfo = (codigo: string) => {
    const weapon = weapons.find((weapon: Weapon) => weapon.codigo === codigo);
    if (weapon) {
      openModal(
        "Detalles del Arma",
        <ViewMore titles={headersWeapons.verMas} data={weapon} />,
      );
    }
  };

  const handleViewMoreSolicitanteInfo = (ci: string) => {
    const user = users.find((user: User) => user.ci === ci);
    if (user) {
      openModal(
        "Detalles del Solicitante",
        <ViewMore titles={headersUsers.verMas} data={user} />,
      );
    }
  };

  const renderCell = (item: Movement, key: MovementKeys) => {
    switch (key) {
      case "actaSalida":
        const isAssigned1 = item[key] !== "No Asignada";
        return (
          <Button
            onClick={() => handleActaClick(item, "Salida")}
            text={isAssigned1 ? item[key] : "Generar Acta"}
            size="sm"
            disabled={isAssigned1}
          />
        );
      case "actaRegreso":
        const isAssigned = item[key] !== "No Asignada";
        return (
          <Button
            onClick={() => handleActaClick(item, "Regreso")}
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
              onClick={() => handleViewMotivo(item[key])}
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
        const user = users.find((user: User) => user.ci === item[key]);
        return (
          <div className="flex flex-row">
            <div className="break-words pr-2">{summaryTextCI}</div>
            <div className="break-words pr-2">{`${user?.nombre} ${user?.apellidoPaterno} ${user?.apellidoMaterno}`}</div>
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
  };

  return (
    <>
      <Content>
        <Table
          header={{
            ...headerMovimientos,
            entregadoPor: "Entregado Por",
            detalles: "Detalles",
          }}
          body={movements}
          renderCell={(item, key) => (
            <div>
              {key !== "entregadoPor" &&
                key !== "detalles" &&
                renderCell(item, key as MovementKeys)}
              {key === "entregadoPor" && (
                <div className="flex gap-2">{`
                  ${encargados[0].cargo} ${encargados[0].nombre} 
                `}</div>
              )}
              {key === "detalles" && (
                <div className="flex gap-2">{`
                  ${item.observaciones}
                  
                  `}</div>
              )}
            </div>
          )}
        />
      </Content>
      <Modal title={modalTitle} isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
};

export default WeaponMovementHistory;
