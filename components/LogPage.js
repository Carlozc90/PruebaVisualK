import { getTextError } from "../helpers/peticionArchivos";
import useAuth from "../hooks/useAuth";
import Log from "./Log";

const LogPage = () => {
  const { logArr } = useAuth();

  const handlePdf = () => {
    console.log("click pdf");
  };

  const handleTxt = () => {
    console.log("click texto");
    getTextError();
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl text-blue-600 font-semibold">Registro LOG</h1>
        <div>
          <button
            type="submit"
            className={`bg-indigo-700 w-full py-3 px-4 rounded-xl text-white  font-bold my-5 md:w-auto hover:bg-indigo-900`}
            onClick={handleTxt}
          >
            Descarga .txt
          </button>
          <button
            type="submit"
            className={`bg-indigo-700 w-full py-3 px-4 rounded-xl text-white font-bold my-5 md:ml-3 md:w-auto hover:bg-indigo-900`}
            onClick={handlePdf}
          >
            Descarga .PDF
          </button>
        </div>
      </div>

      <p className="mt-3">Operaciones Realizadas</p>
      <table className="w-full bg-slate-500 mt-5 table-auto shadow">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Status</th>
            <th className="p-2">Type</th>
            <th className="p-2">Fecha</th>
            <th className="p-2">Body</th>
          </tr>
        </thead>
        <tbody>
          {logArr && logArr.map((items, i) => <Log key={i} log={items} />)}
        </tbody>
      </table>
    </>
  );
};

export default LogPage;
