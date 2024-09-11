import { useState } from "react";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Modal from "../../components/Modal/Modal";
import {
  departamentos,
  grados,
  especialidades,
} from "../../data/selectOptions";
import { useUsers } from "../../contexts/UsersContext/UsersContext";
import type { User } from "../../contexts/UsersContext/interfaces";

interface FormPersonalRegisterProps {
  formData: User;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: () => void;
}

const FormPersonalRegister: React.FC<FormPersonalRegisterProps> = ({
  formData,
  handleChange,
  handleSubmit,
}) => {
  const { users } = useUsers();
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [localErrors, setLocalErrors] = useState<Partial<User>>({});

  const validateForm = (): Partial<User> => {
    const newErrors: Partial<User> = {};

    // Validaciones estándar
    if (!formData.ci) newErrors.ci = "CI es requerido";
    if (!formData.extension) newErrors.extension = "Extensión es requerida";
    if (!formData.cm) newErrors.cm = "Carnet Militar es requerido";
    if (!formData.correo) newErrors.correo = "Correo Electrónico es requerido";
    if (!formData.grado) newErrors.grado = "Grado es requerido";
    if (!formData.especialidad)
      newErrors.especialidad = "Especialidad es requerida";
    if (!formData.nombre) newErrors.nombre = "Nombre es requerido";
    if (!formData.apellidoPaterno)
      newErrors.apellidoPaterno = "Apellido Paterno es requerido";
    if (!formData.apellidoMaterno)
      newErrors.apellidoMaterno = "Apellido Materno es requerido";

    // Verificación de duplicados
    if (users.some((user) => user.ci === formData.ci)) {
      newErrors.ci = "Este CI ya está registrado";
    }

    if (users.some((user) => user.cm === formData.cm)) {
      newErrors.cm = "Este Carnet Militar ya está registrado";
    }

    return newErrors;
  };

  const handleConfirm = (e: React.FormEvent) => {
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
          id="ci"
          label="CI"
          placeholder="Cédula de Identidad"
          value={formData.ci}
          onChange={handleChange}
          errorMessage={localErrors.ci}
        />
        <Select
          id="extension"
          label="Extensión"
          options={departamentos}
          value={formData.extension}
          onChange={handleChange}
          errorMessage={localErrors.extension}
        />
        <Input
          id="cm"
          label="Carnet Militar"
          placeholder="Carnet Militar"
          value={formData.cm}
          onChange={handleChange}
          errorMessage={localErrors.cm}
        />
        <Input
          id="correo"
          label="Correo Electrónico"
          placeholder="Correo Electrónico"
          value={formData.correo}
          onChange={handleChange}
          errorMessage={localErrors.correo}
        />
        <Select
          id="grado"
          label="Grado"
          options={grados}
          value={formData.grado}
          onChange={handleChange}
          errorMessage={localErrors.grado}
        />
        <Select
          id="especialidad"
          label="Especialidad"
          options={especialidades}
          value={formData.especialidad}
          onChange={handleChange}
          errorMessage={localErrors.especialidad}
        />

        <Input
          id="nombre"
          label="Nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          errorMessage={localErrors.nombre}
        />
        <Input
          id="apellidoPaterno"
          label="Apellido Paterno"
          placeholder="Apellido Paterno"
          value={formData.apellidoPaterno}
          onChange={handleChange}
          errorMessage={localErrors.apellidoPaterno}
        />
        <Input
          id="apellidoMaterno"
          label="Apellido Materno"
          placeholder="Apellido Materno"
          value={formData.apellidoMaterno}
          onChange={handleChange}
          errorMessage={localErrors.apellidoMaterno}
        />
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

export default FormPersonalRegister;
