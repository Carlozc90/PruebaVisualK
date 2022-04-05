import axios from "axios";

export async function getSqlAxios() {
  try {
    await axios(`http://localhost:5000/sql`)
      .catch((error) => console.error("Error sql:", error))
      .then(function (response) {
        console.log("respuesta sql", response);
      });
  } catch (error) {
    console.log("error sql->", error);
  }
}

export async function newSqlAxios(obj) {
  const body = {
    status: obj.data.error.code,
    type: obj.config.method.toUpperCase(),
    body: JSON.stringify(obj.data),
    fecha: new Date().toLocaleString("es-ES"),
  };

  try {
    await axios
      .post(`http://localhost:5000/sql`, body)
      .catch((error) => console.error("Error sql:", error))
      .then(function (response) {
        console.log("respuesta sql", response);
      });
  } catch (error) {
    console.log("error sql->", error);
  }
}
