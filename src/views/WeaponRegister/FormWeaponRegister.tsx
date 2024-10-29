import { useState } from "react";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Modal from "../../components/Modal/Modal";
import { useUsers } from "../../contexts/UsersContext/UsersContext";
import { useWeapons } from "../../contexts/WeaponsContext/WeaponsContext";
import type { Weapon } from "../../contexts/WeaponsContext/interfaces";

const clasificaciones = ["Orgánica", "Dotación Individual"];
const estados = ["B/E", "R/E", "M/E"];
const armamentos = [
  "Fusil Galil",
  "Fusil AK-47",
  "Fusil HK G3",
  "Fusil Dragunov",
  "Ametralladora",
  "Pistola",
  "Escopeta",
  "Lanza Cohetes",
  "Mortero",
  "Revolver",
];

interface FormWeaponRegisterProps {
  formData: Weapon;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: () => void;
}

const FormWeaponRegister: React.FC<FormWeaponRegisterProps> = ({
  formData,
  handleChange,
  handleSubmit,
}) => {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [localErrors, setLocalErrors] = useState<Partial<Weapon>>({});
  const { users } = useUsers();
  const { weapons } = useWeapons();
  console.log(formData);
  console.log(localErrors);

  const validateForm = () => {
    const newErrors: Partial<Weapon> = {};

    if (!formData.codigo) newErrors.codigo = "Código es requerido";
    if (!formData.nroarma) newErrors.nroarma = "Número de Arma es requerido";
    if (!formData.modelo) newErrors.modelo = "Modelo es requerido";
    if (!formData.calibre) newErrors.calibre = "Calibre es requerido";
    if (!formData.industria) newErrors.industria = "Industria es requerida";
    if (!formData.clasification)
      newErrors.clasification = "Clasificación es requerida";
    if (!formData.propietario)
      newErrors.propietario = "Propietario es requerido";
    if (!formData.armamento) newErrors.armamento = "Armamento es requerido";
    if (!formData.estado) newErrors.estado = "Estado es requerido";
    if (!formData.observations)
      newErrors.observations = "Observaciones son requeridas";

    if (weapons.some((weapon) => weapon.codigo === formData.codigo)) {
      newErrors.codigo = "Este código ya existe";
    }

    if (weapons.some((weapon) => weapon.nroarma === formData.nroarma)) {
      newErrors.nroarma = "Este número de arma ya existe";
    }

    setLocalErrors(newErrors);

    return newErrors;
  };

  const handleConfirm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setConfirmModalOpen(true);
    } else {
      setLocalErrors(errors);
    }
  };

  const handleConfirmSubmit = () => {
    setConfirmModalOpen(false);
    handleSubmit();
  };

  const handleCloseModal = () => {
    setConfirmModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <form
        onSubmit={handleConfirm}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Input
          id="codigo"
          label="Código"
          placeholder="Código del Arma"
          value={formData.codigo}
          onChange={handleChange}
          errorMessage={localErrors.codigo}
        />
        <Input
          id="nroarma"
          label="Número de Arma"
          placeholder="Número de Arma"
          value={formData.nroarma}
          onChange={handleChange}
          errorMessage={localErrors.nroarma}
        />
        <Select
          id="clasification"
          label="Clasificación"
          options={clasificaciones}
          value={formData.clasification}
          onChange={handleChange}
          errorMessage={localErrors.clasification}
        />
        {formData.clasification === "Orgánica" ? (
          <Select
            id="propietario"
            label="Propietario"
            options={["epartamento IV “Logística” – CGAB"]}
            value={formData.propietario}
            onChange={handleChange}
            errorMessage={localErrors.propietario}
          />
        ) : (
          <div>
            <Select
              id="propietario"
              label="Propietario"
              options={users.map((user) => `${user.ci}`)}
              value={formData.propietario}
              onChange={handleChange}
              errorMessage={localErrors.propietario}
            />
            <label htmlFor="propietario" className="text-xs">
              Usuario:{" "}
              {`${
                users.find((user) => user.ci === formData.propietario)?.grado
              } ${
                users.find((user) => user.ci === formData.propietario)
                  ?.especialidad
              } ${
                users.find((user) => user.ci === formData.propietario)?.nombre
              } ${
                users.find((user) => user.ci === formData.propietario)
                  ?.apellidoPaterno
              } ${
                users.find((user) => user.ci === formData.propietario)
                  ?.apellidoMaterno
              }`}
            </label>
          </div>
        )}
        <Select
          id="armamento"
          label="Armamento"
          options={armamentos}
          value={formData.armamento}
          onChange={handleChange}
          errorMessage={localErrors.armamento}
        />
        <Input
          id="modelo"
          label="Modelo"
          placeholder="Modelo"
          value={formData.modelo}
          onChange={handleChange}
          errorMessage={localErrors.modelo}
        />
        <Input
          id="calibre"
          label="Calibre"
          placeholder="Calibre"
          value={formData.calibre}
          onChange={handleChange}
          errorMessage={localErrors.calibre}
        />
        <Input
          id="industria"
          label="Industria"
          placeholder="Industria"
          value={formData.industria}
          onChange={handleChange}
          errorMessage={localErrors.industria}
        />
        <Select
          id="estado"
          label="Estado"
          options={estados}
          value={formData.estado}
          onChange={handleChange}
          errorMessage={localErrors.estado}
        />
        <div>
          <label htmlFor="observations" className="text-sm ">
            Observaciones
          </label>
          <textarea
            maxLength={150}
            id="observations"
            value={formData.observations}
            onChange={handleChange}
            placeholder="Observaciones"
            className="w-full text-sm px-3 py-2 mb-4 border border-gray-300 rounded h-[80px]"
          ></textarea>
          <div className="text-right text-sm text-gray-500">
            {formData.observations.length}/{150} caracteres
          </div>
          {localErrors.observations && (
            <p className="text-red-500 text-xs mt-1">
              {localErrors.observations}
            </p>
          )}
        </div>
        <div className="flex justify-end mt-4 col-span-1 md:col-span-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Registrar
          </button>
        </div>
      </form>

      {isConfirmModalOpen && (
        <Modal
          title="Confirmación"
          isOpen={isConfirmModalOpen}
          onClose={handleCloseModal}
        >
          <p>¿Está seguro de que desea registrar esta información?</p>
          <div className="flex justify-end mt-4">
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
              onClick={handleCloseModal}
            >
              Cancelar
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleConfirmSubmit}
            >
              Confirmar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FormWeaponRegister;
