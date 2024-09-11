import { useState } from "react";
import Table from "../../components/Table/Table";
import { headersWeapons } from "../../data/headers";
import { useWeapons } from "../../contexts/WeaponsContext/WeaponsContext";
import Button from "../../components/Button/Button";
import Content from "../../components/Content/Content";
import Modal from "../../components/Modal/Modal";
import FormWeaponRegister from "./FormWeaponRegister";
import FormWeaponEdit from "./FormWeaponEdit";
import ViewMore from "../../components/ViewMore/ViewMore";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
import { LuClipboardEdit, LuFileText } from "react-icons/lu";
import type { Weapon } from "../../contexts/WeaponsContext/interfaces";

const firstState: Weapon = {
  codigo: "",
  nroarma: "",
  estado: "",
  clasification: "",
  propietario: "",
  modelo: "",
  calibre: "",
  observations: "",
  industria: "",
  armamento: "",
  inInventory: "",
};

const WeaponRegister: React.FC = () => {
  const [isModalOpen, setOpenModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isViewMoreOpen, setViewMoreOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Weapon>(firstState);
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);
  const { weapons, addWeapon, updateWeapon } = useWeapons();
  const [formDataEdit, setFormDataEdit] = useState<Weapon>({});

  const closeModal = () => {
    setOpenModal(false);
    setIsEdit(false);
    setFormData(firstState);
  };

  const closeViewMoreModal = () => {
    setViewMoreOpen(false);
    setSelectedWeapon(null);
  };

  const openModal = () => {
    setOpenModal(true);
    setIsEdit(false);
    setFormData(firstState);
  };

  const handleViewMore = (codigo: string) => {
    const weapon = weapons.find((weapon) => weapon.codigo === codigo);
    if (weapon) {
      setSelectedWeapon(weapon);
      setViewMoreOpen(true);
    }
  };

  const handleEdit = (codigo: string) => {
    const weapon = weapons.find((weapon) => weapon.codigo === codigo);
    if (weapon) {
      setFormData(weapon);
      setIsEdit(true);
      setOpenModal(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleChangeEdit = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    setFormDataEdit((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("formDataEdit antes de enviar:", formDataEdit);
    if (isEdit) {
      updateWeapon({
        ...formDataEdit,
        id: formData.id,
      });
    } else {
      addWeapon({
        ...formData,
        inInventory: "Sí",
      });
    }
    closeModal();
  };

  const renderCell = (item: Weapon, key: keyof Weapon) => {
    switch (key) {
      case "estado":
        return (
          <span
            className={
              item[key] === "B/E"
                ? "bg-green-500 text-white px-2 py-1 rounded"
                : item[key] === "R/E"
                ? "bg-yellow-500 text-white px-2 py-1 rounded"
                : "bg-red-500 text-white px-2 py-1 rounded"
            }
          >
            {item[key]}
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
          header={{ ...headersWeapons.tabla, acciones: "Acciones" }}
          body={weapons}
          renderCell={(item: Weapon, key: keyof Weapon | "acciones") => (
            <div>
              {key !== "acciones" && renderCell(item, key as keyof Weapon)}
              {key === "acciones" && (
                <div className="flex gap-2">
                  <ButtonIcon
                    icon={<LuFileText />}
                    onClick={() => handleViewMore(item.codigo)}
                    textTooltip="Ver más"
                  />
                  <ButtonIcon
                    icon={<LuClipboardEdit />}
                    onClick={() => handleEdit(item.codigo)}
                    textTooltip="Editar"
                  />
                </div>
              )}
            </div>
          )}
        />
      </Content>

      <div className="flex justify-end mt-4">
        <Button text="Registrar Armamento" onClick={openModal} />
      </div>

      <Modal
        title={isEdit ? "Editar Armamento" : "Registrar Armamento"}
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {isEdit ? (
          <FormWeaponEdit
            formData={formData}
            handleChange={handleChangeEdit}
            handleSubmit={handleSubmit}
            setFormDataEdit={setFormDataEdit}
            formDataEdit={formDataEdit}
          />
        ) : (
          <FormWeaponRegister
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      </Modal>

      {selectedWeapon && (
        <Modal
          isOpen={isViewMoreOpen}
          onClose={closeViewMoreModal}
          title="Detalles del Arma"
        >
          <ViewMore titles={headersWeapons.verMas} data={selectedWeapon} />
        </Modal>
      )}
    </>
  );
};

export default WeaponRegister;
