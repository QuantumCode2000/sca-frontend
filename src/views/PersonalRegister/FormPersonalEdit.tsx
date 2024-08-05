import { useState } from "react";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Modal from "../../components/Modal/Modal";
import {
  departamentos,
  grados,
  especialidades,
} from "../../data/selectOptions";
import type { User } from "../../contexts/UsersContext/interfaces";

const roles = ["Administrador", "Encargado", "Personal"];
const estados = ["Activo", "Inactivo"];
const inSystemPermissions = ["Sí", "No"];

interface FormPersonalRegisterProps {
  formData: User;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: () => void;
}

const FormPersonalEdit: React.FC<FormPersonalRegisterProps> = ({
  formData,
  handleChange,
  handleSubmit,
}) => {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [localErrors, setLocalErrors] = useState<Partial<User>>({});
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateForm = (): Partial<User> => {
    const newErrors: Partial<User> = {};
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

    if (showPasswordFields) {
      if (!password) newErrors.password = "Nueva contraseña es requerida";
      if (!confirmPassword)
        newErrors.confirmPassword = "Confirmar contraseña es requerido";
      if (password !== confirmPassword)
        newErrors.passwordMismatch = "Las contraseñas no coinciden";
    }

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
    if (showPasswordFields) {
      handleChange({ target: { id: "password", value: password } });
    }
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
        <Select
          id="inSystemPermission"
          label="Permiso en Sistema"
          options={inSystemPermissions}
          value={formData.inSystemPermission}
          onChange={handleChange}
        />
        <Select
          id="rol"
          label="Rol"
          options={roles}
          value={formData.rol}
          onChange={handleChange}
        />
        <Select
          id="estado"
          label="Estado"
          options={estados}
          value={formData.estado}
          onChange={handleChange}
        />
        <div className="flex justify-end col-span-1 md:col-span-2">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
            onClick={() => setShowPasswordFields(!showPasswordFields)}
          >
            {showPasswordFields ? "Cancelar" : "Modificar Contraseña"}
          </button>
        </div>
        {showPasswordFields && (
          <>
            <Input
              id="password"
              label="Nueva Contraseña"
              placeholder="Nueva Contraseña"
              value={
                formData.password ||
                (formData.password === "" ? "" : formData.password)
              }
              onChange={handleChange}
              errorMessage={localErrors.password}
            />
            <Input
              id="confirmPassword"
              label="Confirmar Contraseña"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              errorMessage={localErrors.confirmPassword}
            />
            {localErrors.passwordMismatch && (
              <p className="text-red-500 col-span-1 md:col-span-2">
                {localErrors.passwordMismatch}
              </p>
            )}
          </>
        )}
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

export default FormPersonalEdit;
