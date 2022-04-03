export function formatearFecha() {
  return new Date().toLocaleString("es-ES");
}

export function logFuncion(
  user = "",
  descripcion = "",
  peticion = "",
  estado = "",
  statuslog = "",
  info = ""
) {
  // creacion del objetoLog
  const logNew = {
    nombre: user,
    descripcion,
    peticion,
    estado,
    fecha: formatearFecha(),
    statuslog,
    info,
  };

  return logNew;
}

export function errorLog() {
  return;
}
