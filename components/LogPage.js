import useAuth from "../hooks/useAuth";
import Log from "./Log";

const LogPage = () => {
  const { logArr } = useAuth();

  return (
    <>
      <h1 className="text-4xl text-blue-600 font-semibold">Registro LOG</h1>
      <p className="mt-3">Operaciones Realizadas</p>
      <table className="w-full bg-slate-500 mt-5 table-auto shadow">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Usuario</th>
            <th className="p-2">Peticion</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Fecha</th>
            <th className="p-2">StatusLog</th>
            <th className="p-2">Info</th>
          </tr>
        </thead>
        <tbody>
          {logArr.map((items, i) => (
            <Log key={i} log={items} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default LogPage;
