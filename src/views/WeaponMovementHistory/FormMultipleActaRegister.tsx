import { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Select from "react-select";
import { useMovements } from "../../contexts/MovementsContext/MovementsContext";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const FormMultipleActaRegister = ({
  formData,
  handleChange,
  handleSubmit,
  onCancel,
}) => {
  const [localErrors, setLocalErrors] = useState({});
  const { movements } = useMovements();

  const transformMovementsForSelect = () => {
    return movements.map((movement) => ({
      value: movement.id,
      label: movement.id,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.movementId) errors.movementId = "Movimiento ID es requerido";
    if (!formData.actaType) errors.actaType = "Tipo de Acta es requerido";
    if (!formData.details) errors.details = "Detalles son requeridos";
    return errors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      handleSubmit();
    } else {
      setLocalErrors(errors);
    }
  };

  const [selectedOptions, setSelectedOptions] = useState(null);

  const handleChangeMulti = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    // Aquí puedes hacer algo con los países seleccionados, por ejemplo, enviarlos a un servidor
    console.log("mulitvalores", selectedOptions);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <Select
        options={transformMovementsForSelect()}
        isMulti
        value={selectedOptions}
        onChange={handleChangeMulti}
      />

      <Input
        id="actaType"
        label="Tipo de Acta"
        value={formData.actaType}
        onChange={handleChange}
        error={localErrors.actaType}
        readOnly
      />
      <Input
        id="details"
        label="Detalles"
        value={formData.details}
        onChange={handleChange}
        error={localErrors.details}
        placeholder="Detalles adicionales sobre el acta..."
      />
      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          text="Cancelar"
          textStyle="bg-gray-300 text-black px-4 py-2 rounded-md"
          onClick={onCancel}
        />
        <Button
          type="submit"
          text="Registrar Acta"
          textStyle="bg-blue-500 text-white px-4 py-2 rounded-md"
        />
      </div>
    </form>
  );
};

export default FormMultipleActaRegister;
