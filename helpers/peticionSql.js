import axios from "axios";

export async function getSqlAxios() {
  try {
    await axios(`http://localhost:5000/sql`)
      .catch((error) => console.error("Error sql:", error))
      .then(function (response) {
        // console.log("respuesta sql", response);
      });
  } catch (error) {
    console.log("error sql->", error);
  }
}

export async function newSqlAxios(obj) {
  // console.log("sql->", obj);

  const body = {
    status: obj.data.statusCode,
    type: obj.data.request.method,
    body: JSON.stringify(obj.data.body),
    fecha: obj.data.headers.date,
  };

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

  //Actualiza el txt en el Api Rest
  getSqlAxios();
}
