import { useState } from "react";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Modal from "../../components/Modal/Modal";
import { useUsers } from "../../contexts/UsersContext/UsersContext";

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

const FormWeaponEdit = ({
  formData,
  handleChange,
  handleSubmit,
  setFormDataEdit,
  formDataEdit,
}) => {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [localErrors, setLocalErrors] = useState({});
  const { users } = useUsers();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.codigo) newErrors.codigo = "Código es requerido";
    if (!formData.nroarma) newErrors.nroarma = "Número de Arma es requerido";
    if (!formData.modelo) newErrors.modelo = "Modelo es requerido";
    if (!formData.calibre) newErrors.calibre = "Calibre es requerido";
    if (!formData.industria) newErrors.industria = "Industria es requerida";
    return newErrors;
  };

  const handleConfirm = (e) => {
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
          error={localErrors.codigo}
        />
        <Input
          id="nroarma"
          label="Número de Arma"
          placeholder="Número de Arma"
          value={formData.nroarma}
          onChange={handleChange}
          error={localErrors.nroarma}
        />
        <Select
          id="clasificacion"
          label="Clasificación"
          options={clasificaciones}
          value={formData.clasificacion}
          onChange={handleChange}
        />
        {formData.clasificacion === "Orgánica" ? (
          <Input
            id="propietario"
            label="Propietario"
            placeholder="Propietario"
            value="Departamento VI"
            disabled
          />
        ) : (
          <Select
            id="propietario"
            label="Propietario"
            options={users.map((user) => `${user.grado} ${user.nombre}`)}
            value={formData.propietario}
            onChange={handleChange}
          />
        )}
        <Select
          id="armamento"
          label="Armamento"
          options={armamentos}
          value={formData.armamento}
          onChange={handleChange}
        />
        <Input
          id="modelo"
          label="Modelo"
          placeholder="Modelo"
          value={formData.modelo}
          onChange={handleChange}
          error={localErrors.modelo}
        />
        <Input
          id="calibre"
          label="Calibre"
          placeholder="Calibre"
          value={formData.calibre}
          onChange={handleChange}
          error={localErrors.calibre}
        />
        <Input
          id="industria"
          label="Industria"
          placeholder="Industria"
          value={formData.industria}
          onChange={handleChange}
          error={localErrors.industria}
        />
        <Select
          id="estado"
          label="Estado"
          options={estados}
          value={formData.estado}
          onChange={handleChange}
        />
        <Input
          id="observations"
          label="Observaciones"
          placeholder="Observaciones"
          value={formData.observations}
          onChange={handleChange}
        />
        <div className="flex justify-end mt-4 col-span-1 md:col-span-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Actualizar
          </button>
        </div>
      </form>

      {isConfirmModalOpen && (
        <Modal
          title="Confirmación"
          isOpen={isConfirmModalOpen}
          onClose={handleCloseModal}
        >
          <p>¿Está seguro de que desea actualizar esta información?</p>
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

export default FormWeaponEdit;
