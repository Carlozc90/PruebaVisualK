import jsPDF from "jspdf";

export function creaPdf(arr) {
  var datos = function (amount) {
    let result = [];
    for (let i = amount - 1; i >= 0; i -= 1) {
      var data = {
        DB_id: arr[i].id.toString(),
        status: arr[i].status.toString(),
        Type: ` ${arr[i].type} `,
        FechaServidor: arr[i].fecha,
        Usuario: arr[i].usuario,
        Funcion: ` ${arr[i].funcion} `,
      };
      data.id = (i + 1).toString();
      result.push(Object.assign({}, data));
    }
    return result;
  };

  function Cabecera(keys) {
    let result = [];
    for (let i = 0; i < keys.length; i += 1) {
      result.push({
        id: keys[i],
        name: keys[i],
        prompt: keys[i],
        width: 65,
        align: "center",
        padding: 0,
      });
    }
    return result;
  }

  const headers = Cabecera([
    "id",
    "DB_id",
    "status",
    "Type",
    "FechaServidor",
    "Usuario",
    "Funcion",
  ]);

  var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });

  doc.table(40, 40, datos(arr.length), headers, { autoSize: true });

  doc.save("LogPeticiones.pdf");
}
