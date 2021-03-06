import axios from "axios";

export async function newSqlAxios(user, fn, obj, condicion = "") {
  // console.log("sql->", obj);

  const body = {
    status: obj.data.statusCode,
    type: obj.data.request.method,
    body:
      condicion === "creacion"
        ? "Creado Correctamente"
        : condicion === "edicion"
        ? obj.config.data
        : JSON.stringify(obj.data.body),
    fecha: obj.data.headers.date,
    usuario: user,
    funcion: fn,
  };

  // console.log("sqlbody_>", body);

  try {
    await axios
      .post(`http://localhost:5000/sql`, body)
      .catch((error) => console.error("Error sql:", error))
      .then(function (response) {
        // console.log("respuesta sql", response);
      });
  } catch (error) {
    console.log("error sql->", error);
  }
}
