import { useEffect } from "react";

function WeaponInfo({
  weaponCode,
  setWeaponCode,
  fetchWeaponDetails,
  weaponDetails,
  setWeaponDetails,
  loading,
}) {
  useEffect(() => {
    if (weaponCode.length >= 9) {
      fetchWeaponDetails(weaponCode);
    } else {
      setWeaponDetails(null);
    }
  }, [weaponCode, fetchWeaponDetails, setWeaponDetails]);

  return (
    <div className="flex flex-col flex-grow w-full p-4">
      <h2 className="text-xl font-bold mb-4">Información del Arma</h2>
      <input
        type="text"
        value={weaponCode}
        onChange={(e) => setWeaponCode(e.target.value.trim())}
        placeholder="Código del Arma"
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
      />
      <div className="grid grid-cols-2 gap-4 h-auto min-h-[300px]">
        {loading ? (
          <p className="mt-4 text-blue-500 col-span-2">Cargando...</p>
        ) : weaponDetails ? (
          <>
            <WeaponCard label="Armamento" value={weaponDetails.armamento} />
            <WeaponCard label="Estado" value={weaponDetails.estado} />
            <WeaponCard
              label="Clasificación"
              value={weaponDetails.clasification}
            />
            <WeaponCard label="Propietario" value={weaponDetails.propietario} />
            <WeaponCard label="Número de Arma" value={weaponDetails.nroarma} />
            <WeaponCard label="Modelo" value={weaponDetails.modelo} />
            <WeaponCard label="Procedencia" value={weaponDetails.industria} />
            <WeaponCard label="Calibre" value={weaponDetails.calibre} />
          </>
        ) : (
          <p className="mt-4 text-red-500 col-span-2">
            Ingrese un código de 10 dígitos para buscar la información del arma.
          </p>
        )}
      </div>
    </div>
  );
}

const WeaponCard = ({ label, value }) => {
  return (
    <div className="mt-2 px-6 bg-white rounded-lg shadow w-full">
      <div className="inline-flex items-center justify-between w-full">
        <div className="inline-flex items-center">
          <h3 className="font-bold text-base text-gray-800">{label}</h3>
        </div>
      </div>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  );
};

export default WeaponInfo;
