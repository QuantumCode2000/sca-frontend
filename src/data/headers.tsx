const headerMovimientos = {
  id: "N. de Movimiento",
  fechaSalida: "Fecha de Salida",
  fechaRegreso: "Fecha de Devolución",
  codigo: "Código",
  solicitante: "CI Solicitante",
  motivo: "Motivo",
  actaSalida: "Acta de Salida",
  actaRegreso: "Acta de Devolución",
};
const headersUsers = {
  tabla: {
    ci: "Carnet de Identidad",
    extension: "Ex.",
    grado: "Grado",
    especialidad: "Esp.",
    nombre: "Nombre",
    apellidoPaterno: "Apellido Paterno",
    apellidoMaterno: "Apellido Materno",
    inSystemPermission: "Permiso en Sistema",
    rol: "Rol",
    estado: "Estado",
  },
  verMas: {
    ci: "Carnet de Identidad",
    extension: "Ex.",
    cm: "Carnet Militar",
    grado: "Grado",
    especialidad: "Especialidad",
    nombre: "Nombre",
    apellidoPaterno: "Apellido Paterno",
    apellidoMaterno: "Apellido Materno",
    correo: "Correo",
    inSystemPermission: "Permiso en Sistema",
    rol: "Rol",
    estado: "Estado",
  },
};

const headersWeapons = {
  tabla: {
    codigo: "Código",
    nroarma: "Nro. de Arma",
    estado: "Estado",
    observations: "Observaciones",
    propietario: "Propietario",
    armamento: "Armamento",
    modelo: "Modelo",
  },
  verMas: {
    codigo: "Código",
    nroarma: "Nro. Arma",
    estado: "Estado",
    observations: "Observaciones",
    propietario: "Propietario",
    armamento: "Armamento",
    modelo: "Modelo",
    calibre: "Calibre",
    industria: "Industria",
    inInventory: "Inventario",
    clasification: "Clasificación",
  },
};
export { headerMovimientos, headersUsers, headersWeapons };
