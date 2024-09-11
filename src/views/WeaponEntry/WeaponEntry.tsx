import { useEffect, useState, useCallback } from "react";
import WeaponInfo from "../../components/WeaponInfo/WeaponInfo";
import Button from "../../components/Button/Button";
import { useUsers } from "../../contexts/UsersContext/UsersContext";
import { useWeapons } from "../../contexts/WeaponsContext/WeaponsContext";
import { useMovements } from "../../contexts/MovementsContext/MovementsContext";
import { findWeaponInMovements } from "../../services/findWeaponInMovements";
import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import io from "socket.io-client";
import FormWeaponRegister from "../WeaponRegister/FormWeaponRegister";
import type { Weapon } from "../../contexts/WeaponsContext/interfaces";

const socket = io(import.meta.env.VITE_ROUTE_SOCKETIO);

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

const WeaponEntry = () => {
  const { weapons, updateWeapon } = useWeapons();
  const { users } = useUsers();
  const { movements, updateMovement } = useMovements();
  const [weaponCode, setWeaponCode] = useState("");
  const [weaponDetails, setWeaponDetails] = useState<Weapon | null>(null);
  const [loading, setLoading] = useState(false);
  const [observations, setObservations] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Weapon>(firstState);

  useEffect(() => {
    socket.on("rfid", (code) => {
      setWeaponCode(code.trim());
      fetchWeaponDetails(code.trim());
    });

    return () => {
      socket.off("rfid");
    };
  }, []);

  const fetchWeaponDetails = (code) => {
    if (!code) return;
    setLoading(true);
    const details = weapons.find((weapon) => weapon.codigo === code.trim());
    setWeaponDetails(details || null);
    setLoading(false);
  };

  const handleUpdateMovement = useCallback(() => {
    const currentMovement = findWeaponInMovements(
      weaponCode.trim(),
      movements,
    ).movement;
    if (!currentMovement) return;

    const updatedMovement = {
      ...currentMovement,
      fechaRegreso: `${new Date().getFullYear()}-${String(
        new Date().getMonth() + 1,
      ).padStart(2, "0")}-${String(new Date().getDate()).padStart(
        2,
        "0",
      )} ${String(new Date().getHours()).padStart(2, "0")}:${String(
        new Date().getMinutes(),
      ).padStart(2, "0")}`,
      observaciones: observations.trim() || weaponDetails?.observations,
    };
    updateMovement(updatedMovement);

    if (observations.trim() && weaponDetails) {
      const updatedWeapon = {
        ...weaponDetails,
        observations: observations.trim(),
      };
      updateWeapon(updatedWeapon);
    }

    setObservations("");
    setIsModalOpen(false);
    setSuccessMessage("Registro de entrada exitoso");

    setTimeout(() => {
      navigate("/historial-movimientos");
    }, 1500);
  }, [
    weaponCode,
    movements,
    observations,
    updateMovement,
    updateWeapon,
    weaponDetails,
    navigate,
  ]);

  const findUser = (ci) => {
    return users.find((user) => user.ci === ci.trim());
  };

  const openModal = useCallback(() => {
    setObservations(weaponDetails?.observations || "");
    setIsModalOpen(true);
  }, [weaponDetails]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setObservations("");
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row h-[90%]">
        <div className="md:w-1/2 p-2">
          <WeaponInfo
            weaponCode={weaponCode}
            setWeaponCode={(code) => setWeaponCode(code.trim())}
            fetchWeaponDetails={fetchWeaponDetails}
            weaponDetails={weaponDetails}
            setWeaponDetails={setWeaponDetails}
            loading={loading}
          />
        </div>
        <div className="md:w-1/2 p-2">
          <div className="bg-white overflow-hidden shadow rounded-lg border mx-4 box">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {"Información de la salida del Arma"}
                </h3>
              </div>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {findWeaponInMovements(weaponCode.trim(), movements).message}
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              {findWeaponInMovements(weaponCode.trim(), movements).movement ? (
                <>
                  <RowInfo
                    title={"Fecha de Salida"}
                    value={
                      findWeaponInMovements(weaponCode.trim(), movements)
                        .movement?.fechaSalida
                    }
                  />
                  <RowInfo
                    title={"Fecha de Regreso"}
                    value={
                      findWeaponInMovements(weaponCode.trim(), movements)
                        .movement?.fechaRegreso
                    }
                  />
                  <RowInfo
                    title={"Solicitante"}
                    value={
                      findUser(
                        findWeaponInMovements(weaponCode.trim(), movements)
                          .movement.solicitante,
                      )?.grado +
                      " " +
                      findUser(
                        findWeaponInMovements(weaponCode.trim(), movements)
                          .movement.solicitante,
                      )?.especialidad +
                      " " +
                      findUser(
                        findWeaponInMovements(weaponCode.trim(), movements)
                          .movement.solicitante,
                      )?.nombre +
                      " " +
                      findUser(
                        findWeaponInMovements(weaponCode.trim(), movements)
                          .movement.solicitante,
                      )?.apellidoPaterno +
                      " " +
                      findUser(
                        findWeaponInMovements(weaponCode.trim(), movements)
                          .movement.solicitante,
                      )?.apellidoMaterno
                    }
                  />
                  <RowInfo
                    title={"Motivo"}
                    value={
                      findWeaponInMovements(weaponCode.trim(), movements)
                        .movement?.motivo
                    }
                  />
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        {findWeaponInMovements(weaponCode.trim(), movements).isPending ===
        false ? (
          <div className="flex justify-end mt-4 h-[80%] w-full p-4 rounded-md text-white">
            <Button
              text={"Registrar Arma y Entrada"}
              className="bg-green-500 mr-5"
              onClick={handleUpdateMovement}
            />
            <Button text={"Registrar Entrada"} onClick={handleUpdateMovement} />
          </div>
        ) : (
          <div className="flex justify-end mt-4 h-[80%] w-full p-4 rounded-md text-white">
            <Button
              text={"Actualizar Observaciones"}
              onClick={openModal}
              className="bg-yellow-500 mr-5"
            />
            <Button
              text={"Registrar Arma y Entrada"}
              className="bg-green-500 mr-5"
              onClick={handleUpdateMovement}
            />
            <Button text={"Registrar Entrada"} onClick={handleUpdateMovement} />
          </div>
        )}
      </div>
      <Modal
        title="Actualizar Observaciones"
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <div className="flex flex-col space-y-4">
          <textarea
            className="border rounded p-2 mb-4 w-full"
            placeholder="Ingrese las nuevas observaciones"
            value={observations}
            onChange={(e) => setObservations(e.target.value.trim())}
          />
          <Button
            text={"Guardar Observaciones"}
            onClick={handleUpdateMovement}
          />
        </div>
      </Modal>
      {successMessage && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2">
          {successMessage}
        </div>
      )}
      z
    </>
  );
};

const RowInfo = ({ title, value }) => {
  return (
    <div className="sm:divide -y sm:divide-gray-200">
      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">{title}</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {value}
        </dd>
      </div>
    </div>
  );
};

export default WeaponEntry;
