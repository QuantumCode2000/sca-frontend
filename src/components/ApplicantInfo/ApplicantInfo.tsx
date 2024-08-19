import { useEffect } from "react";

function ApplicantInfo({
  applicantCI,
  setApplicantCI,
  fetchApplicantInformation,
  applicantInformation,
  setApplicantInformation,
  loading,
  setMotivo,
}) {
  useEffect(() => {
    if (applicantCI.length >= 5) {
      fetchApplicantInformation();
    } else {
      setApplicantInformation(null);
    }
  }, [applicantCI, fetchApplicantInformation, setApplicantInformation]);

  return (
    <div className="flex flex-col w-full p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Información del Solicitante
        </h2>
        <input
          type="text"
          value={applicantCI}
          onChange={(e) => setApplicantCI(e.target.value)}
          placeholder="Carnet Identidad Solicitante"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
        />
        <div className="grid  gap-4 h-auto ">
          {loading ? (
            <p className="mt-4 text-blue-500 col-span-2">Cargando...</p>
          ) : applicantInformation ? (
            <>
              <ApplicantCard values={applicantInformation} />
            </>
          ) : (
            <p className="mt-4 text-red-500 col-span-2">
              Ingrese un CI de 7 dígitos para buscar la información del
              solicitante.
            </p>
          )}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Información del Motivo
        </h2>
        <textarea
          placeholder="Motivo de la solicitud"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
          onChange={(e) => setMotivo(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}

const ApplicantCard = ({ values }) => {
  return (
    <div className="p-3 bg-white rounded-lg shadow w-full">
      <div className="flex justify-between">
        <span className="font-semibold text-gray-700">Nombre</span>
        <span className="text-gray-800">{`${values.grado} ${values.nombre} ${values.apellidoPaterno} ${values.apellidoMaterno}`}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-semibold text-gray-700">Carnet de Identidad</span>
        <span className="text-gray-800">{`${values.ci} ${values.extension}`}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-semibold text-gray-700">Carnet Militar</span>
        <span className="text-gray-800">{`${values.cm}`}</span>
      </div>
    </div>
  );
};

export default ApplicantInfo;
