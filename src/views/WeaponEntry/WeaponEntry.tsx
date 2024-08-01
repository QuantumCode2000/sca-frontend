import { useState } from "react";
import WeaponInfo from "../../components/WeaponInfo/WeaponInfo";
import Button from "../../components/Button/Button";
import { useUsers } from "../../contexts/UsersContext/UsersContext";
import { useWeapons } from "../../contexts/WeaponsContext/WeaponsContext";
import { useMovements } from "../../contexts/MovementsContext/MovementsContext";
import { findWeaponInMovements } from "../../services/findWeaponInMovements";
const WeaponEntry = () => {
  const { weapons } = useWeapons();
  const { users } = useUsers();
  const { movements, updateMovement } = useMovements();
  const [weaponCode, setWeaponCode] = useState("");
  const [weaponDetails, setWeaponDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeaponDetails = () => {
    setLoading(true);
    const details = weapons.find((weapon) => weapon.codigo === weaponCode);
    setWeaponDetails(details || null);
    setLoading(false);
  };

  const handleUpdateMovement = () => {
    const updatedMovement = {
      ...findWeaponInMovements(weaponCode, movements).movement,
      fechaRegreso: `${new Date().getFullYear()}-${String(
        new Date().getMonth() + 1,
      ).padStart(2, "0")}-${String(new Date().getDate()).padStart(
        2,
        "0",
      )} ${String(new Date().getHours()).padStart(2, "0")}:${String(
        new Date().getMinutes(),
      ).padStart(2, "0")}`,
    };
    updateMovement(updatedMovement);
  };

  const findUser = (ci) => {
    return users.find((user) => user.ci === ci);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row h-[90%]">
        <div className="md:w-1/2 p-2">
          <WeaponInfo
            weaponCode={weaponCode}
            setWeaponCode={setWeaponCode}
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
                  {"Informacion de la salida del Arma"}
                </h3>
              </div>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {findWeaponInMovements(weaponCode, movements).message}
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              {findWeaponInMovements(weaponCode, movements).movement ? (
                <>
                  <RowInfo
                    title={"Fecha de Salida"}
                    value={
                      findWeaponInMovements(weaponCode, movements).movement
                        ?.fechaSalida
                    }
                  />

                  <RowInfo
                    title={"Fecha de Regreso"}
                    value={
                      findWeaponInMovements(weaponCode, movements).movement
                        ?.fechaRegreso
                    }
                  />
                  <RowInfo
                    title={"Solicitante"}
                    value={
                      findUser(
                        findWeaponInMovements(weaponCode, movements).movement
                          .solicitante,
                      )?.grado +
                      " " +
                      findUser(
                        findWeaponInMovements(weaponCode, movements).movement
                          .solicitante,
                      )?.especialidad +
                      " " +
                      findUser(
                        findWeaponInMovements(weaponCode, movements).movement
                          .solicitante,
                      )?.nombre +
                      " " +
                      findUser(
                        findWeaponInMovements(weaponCode, movements).movement
                          .solicitante,
                      )?.apellidoPaterno +
                      " " +
                      findUser(
                        findWeaponInMovements(weaponCode, movements).movement
                          .solicitante,
                      )?.apellidoMaterno
                    }
                  />
                  <RowInfo
                    title={"Motivo"}
                    value={
                      findWeaponInMovements(weaponCode, movements).movement
                        ?.motivo
                    }
                  />
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {findWeaponInMovements(weaponCode, movements).isPending === false ? (
        <div className="flex justify-end mt-4 ">
          <Button
            textStyle={
              "bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50"
            }
            text={"Registrar Entrada"}
          />
        </div>
      ) : (
        <div className="flex justify-end mt-4 ">
          <Button
            textStyle={""}
            text={"Registrar Entrada"}
            onClick={handleUpdateMovement}
          />
        </div>
      )}
    </>
  );
};

const RowInfo = ({ title, value }) => {
  return (
    <div className="sm:divide-y sm:divide-gray-200">
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
