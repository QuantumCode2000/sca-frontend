// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import WeaponInfo from "../../components/WeaponInfo/WeaponInfo";
// import ApplicantInfo from "../../components/ApplicantInfo/ApplicantInfo";
// import Button from "../../components/Button/Button";
// import Modal from "../../components/Modal/Modal";
// import { useMovements } from "../../contexts/MovementsContext/MovementsContext";
// import { findWeaponInMovements } from "../../services/findWeaponInMovements";
// import { Weapon } from "../../contexts/WeaponsContext/interfaces";
// import { User } from "../../contexts/UsersContext/interfaces";
// import { useUsers } from "../../contexts/UsersContext/UsersContext";
// import { useWeapons } from "../../contexts/WeaponsContext/WeaponsContext";
// import type { Movement } from "../../contexts/MovementsContext/interfaces";
// import io from "socket.io-client";
// const socket = io(import.meta.env.VITE_ROUTE_SOCKETIO);

// const WeaponExit = () => {
//   const navigate = useNavigate();
//   const { weapons } = useWeapons();
//   const { users } = useUsers();
//   const { movements, addMovement } = useMovements();
//   const [weaponCode, setWeaponCode] = useState("");
//   const [weaponDetails, setWeaponDetails] = useState<Weapon | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [applicantCI, setApplicantCI] = useState("");
//   const [applicantInformation, setApplicantInformation] = useState<User | null>(
//     null,
//   );
//   const [applicantLoading, setApplicantLoading] = useState(false);
//   const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
//   const [motivo, setMotivo] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   useEffect(() => {
//     socket.on("rfid", (code) => {
//       setWeaponCode(code.trim());
//       fetchWeaponDetails(code.trim());
//     });

//     return () => {
//       socket.off("rfid");
//     };
//   }, []);

//   const fetchWeaponDetails = (code: string) => {
//     if (!code) return;
//     setLoading(true);
//     let details = weapons.find((weapon) => weapon.codigo === code.trim());
//     if (!details) {
//       details = weapons.find((weapon) => weapon.nroarma === code.trim());
//       setWeaponDetails(details || null);
//     }
//     {
//       setWeaponDetails(details || null);
//     }

//     setLoading(false);
//   };

//   const fetchApplicantInformation = () => {
//     if (!applicantCI) return;
//     setApplicantLoading(true);
//     const details = users.find(
//       (applicant) => applicant.ci === applicantCI.trim(),
//     );
//     setApplicantInformation(details || null);
//     setApplicantLoading(false);
//   };

//   const handleAddMovement = () => {
//     if (weaponDetails && applicantInformation) {
//       setConfirmModalOpen(true);
//     } else {
//       alert("Debe ingresar un arma y un solicitante válidos.");
//     }
//   };

//   const confirmAddMovement = () => {
//     const newMovement = {
//       fechaSalida: `${new Date().getFullYear()}-${String(
//         new Date().getMonth() + 1,
//       ).padStart(2, "0")}-${String(new Date().getDate()).padStart(
//         2,
//         "0",
//       )} ${String(new Date().getHours()).padStart(2, "0")}:${String(
//         new Date().getMinutes(),
//       ).padStart(2, "0")}`,
//       fechaRegreso: "Pendiente",
//       codigo: weaponCode.trim(),
//       solicitante: applicantCI.trim(),
//       motivo: motivo.trim(),
//       actaSalida: "No Asignada",
//       actaRegreso: "No Asignada",
//     };
//     addMovement(newMovement as Movement);
//     setConfirmModalOpen(false);
//     setSuccessMessage("Registro de salida exitoso");
//     setTimeout(() => {
//       navigate("/historial-movimientos");
//     }, 1500);
//   };

//   return (
//     <>
//       <div className="flex flex-col md:flex-row h-[90%]">
//         <div className="md:w-1/2 p-2">
//           <WeaponInfo
//             weaponCode={weaponCode}
//             setWeaponCode={(code: string) => setWeaponCode(code.trim())}
//             fetchWeaponDetails={fetchWeaponDetails}
//             weaponDetails={weaponDetails}
//             setWeaponDetails={setWeaponDetails}
//             loading={loading}
//           />
//           {weaponCode.length >= 7 ? (
//             <div
//               className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
//               role="alert"
//             >
//               <span className="font-medium">!</span>
//               {findWeaponInMovements(weaponCode.trim(), movements).message}
//             </div>
//           ) : null}
//         </div>
//         <div className="md:w-1/2 p-2">
//           <ApplicantInfo
//             applicantCI={applicantCI}
//             setApplicantCI={(ci: string) => setApplicantCI(ci.trim())}
//             fetchApplicantInformation={fetchApplicantInformation}
//             applicantInformation={applicantInformation}
//             setApplicantInformation={setApplicantInformation}
//             loading={applicantLoading}
//             setMotivo={(motivo: string) => setMotivo(motivo.trim())}
//             motivo={motivo}
//           />
//         </div>
//       </div>

//       {findWeaponInMovements(weaponCode.trim(), movements).isPending ===
//       true ? (
//         <div className="flex justify-end mt-4 ">
//           <Button
//             className={
//               "bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50"
//             }
//             text={"Registrar Salida"}
//           />
//         </div>
//       ) : (
//         <div className="flex justify-end mt-4 ">
//           <Button text={"Registrar Salida"} onClick={handleAddMovement} />
//         </div>
//       )}

//       {isConfirmModalOpen && (
//         <Modal
//           isOpen={isConfirmModalOpen}
//           onClose={() => setConfirmModalOpen(false)}
//           title="Confirmación"
//         >
//           <p>¿Está seguro de que desea registrar la salida del arma?</p>
//           <div className="flex justify-end mt-4">
//             <Button
//               text="Cancelar"
//               className="bg-gray-300 px-4 py-2 rounded-md mr-2"
//               onClick={() => setConfirmModalOpen(false)}
//             />
//             <Button
//               text="Confirmar"
//               className="bg-blue-500 text-white px-4 py-2 rounded-md"
//               onClick={confirmAddMovement}
//             />
//           </div>
//         </Modal>
//       )}

//       {successMessage && (
//         <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2">
//           {successMessage}
//         </div>
//       )}
//     </>
//   );
// };

// export default WeaponExit;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WeaponInfo from "../../components/WeaponInfo/WeaponInfo";
import ApplicantInfo from "../../components/ApplicantInfo/ApplicantInfo";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { useMovements } from "../../contexts/MovementsContext/MovementsContext";
import { findWeaponInMovements } from "../../services/findWeaponInMovements";
import { Weapon } from "../../contexts/WeaponsContext/interfaces";
import { User } from "../../contexts/UsersContext/interfaces";
import { useUsers } from "../../contexts/UsersContext/UsersContext";
import { useWeapons } from "../../contexts/WeaponsContext/WeaponsContext";
import type { Movement } from "../../contexts/MovementsContext/interfaces";
import { CiCircleAlert } from "react-icons/ci";
import io from "socket.io-client";
const socket = io(import.meta.env.VITE_ROUTE_SOCKETIO);

const WeaponExit = () => {
  const navigate = useNavigate();
  const { weapons } = useWeapons();
  const { users } = useUsers();
  const { movements, addMovement } = useMovements();
  const [weaponCode, setWeaponCode] = useState("");
  const [weaponDetails, setWeaponDetails] = useState<Weapon | null>(null);
  const [loading, setLoading] = useState(false);
  const [applicantCI, setApplicantCI] = useState("");
  const [applicantInformation, setApplicantInformation] = useState<User | null>(
    null,
  );
  const [applicantLoading, setApplicantLoading] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    socket.on("rfid", (code) => {
      setWeaponCode(code.trim());
      fetchWeaponDetails(code.trim());
    });

    return () => {
      socket.off("rfid");
    };
  }, []);

  const fetchWeaponDetails = (code: string) => {
    if (!code) return;
    setLoading(true);
    let details = weapons.find((weapon) => weapon.codigo === code.trim());
    if (!details) {
      details = weapons.find((weapon) => weapon.nroarma === code.trim());
      setWeaponDetails(details || null);
    }
    {
      setWeaponDetails(details || null);
    }

    setLoading(false);
  };

  const fetchApplicantInformation = () => {
    if (!applicantCI) return;
    setApplicantLoading(true);
    const details = users.find(
      (applicant) => applicant.ci === applicantCI.trim(),
    );
    setApplicantInformation(details || null);
    setApplicantLoading(false);
  };

  const handleAddMovement = () => {
    if (weaponDetails && applicantInformation) {
      setConfirmModalOpen(true);
    } else {
      alert("Debe ingresar un arma y un solicitante válidos.");
    }
  };

  const confirmAddMovement = () => {
    const newMovement = {
      fechaSalida: `${new Date().getFullYear()}-${String(
        new Date().getMonth() + 1,
      ).padStart(2, "0")}-${String(new Date().getDate()).padStart(
        2,
        "0",
      )} ${String(new Date().getHours()).padStart(2, "0")}:${String(
        new Date().getMinutes(),
      ).padStart(2, "0")}`,
      fechaRegreso: "Pendiente",
      codigo: weaponCode.trim(),
      solicitante: applicantCI.trim(),
      motivo: motivo.trim(),
      actaSalida: "No Asignada",
      actaRegreso: "No Asignada",
    };
    addMovement(newMovement as Movement);
    setConfirmModalOpen(false);
    setSuccessMessage("Registro de salida exitoso");
    setTimeout(() => {
      navigate("/historial-movimientos");
    }, 1500);
  };

  const isFormValid = () =>
    weaponDetails !== null &&
    applicantInformation !== null &&
    motivo.trim() !== "";

  return (
    <>
      <div className="flex flex-col md:flex-row h-[90%]">
        <div className="md:w-1/2 p-2">
          <WeaponInfo
            weaponCode={weaponCode}
            setWeaponCode={(code: string) => setWeaponCode(code.trim())}
            fetchWeaponDetails={fetchWeaponDetails}
            weaponDetails={weaponDetails}
            setWeaponDetails={setWeaponDetails}
            loading={loading}
          />
          {weaponCode.length >= 7 ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span
                className="
              font-medium flex h-[30px] align-middle items-center
              "
              >
                <span>
                  <CiCircleAlert className="text-2xl" />
                </span>
                <span className="pl-2">{"Nota"}</span>
              </span>
              {`
               ${findWeaponInMovements(weaponCode.trim(), movements).message}
              `}
            </div>
          ) : null}
        </div>
        <div className="md:w-1/2 p-2">
          <ApplicantInfo
            applicantCI={applicantCI}
            setApplicantCI={(ci: string) => setApplicantCI(ci.trim())}
            fetchApplicantInformation={fetchApplicantInformation}
            applicantInformation={applicantInformation}
            setApplicantInformation={setApplicantInformation}
            loading={applicantLoading}
            setMotivo={(motivo: string) => setMotivo(motivo.trim())}
            motivo={motivo}
          />
        </div>
      </div>

      {findWeaponInMovements(weaponCode.trim(), movements).isPending ===
      true ? (
        <div className="flex justify-end mt-4 ">
          <Button
            className={
              "bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50"
            }
            text={"Registrar Salida"}
          />
        </div>
      ) : (
        <div className="flex justify-end mt-4 ">
          <Button
            text={"Registrar Salida"}
            onClick={handleAddMovement}
            disabled={!isFormValid()}
            className={
              !isFormValid() ? "bg-gray-300 opacity-50 cursor-not-allowed" : ""
            }
          />
        </div>
      )}

      {isConfirmModalOpen && (
        <Modal
          isOpen={isConfirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          title="Confirmación"
        >
          <p>¿Está seguro de que desea registrar la salida del arma?</p>
          <div className="flex justify-end mt-4">
            <Button
              text="Cancelar"
              className="bg-gray-300 px-4 py-2 rounded-md mr-2"
              onClick={() => setConfirmModalOpen(false)}
            />
            <Button
              text="Confirmar"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={confirmAddMovement}
            />
          </div>
        </Modal>
      )}

      {successMessage && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2">
          {successMessage}
        </div>
      )}
    </>
  );
};

export default WeaponExit;
