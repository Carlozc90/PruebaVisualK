import axios from "axios";
import { saveAs } from "file-saver";

export async function getTextError() {
  try {
    await axios(`http://localhost:5000/errortxt`)
      .catch((error) => console.error("Error apirest:", error))
      .then(function (response) {
        console.log("respuesta_>", response);
        const res = JSON.stringify(response.data);

        console.log(typeof res);
        const blob = new Blob([res], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "PeticionErrores.txt");
      });
  } catch (error) {
    console.log(error);
  }
}
