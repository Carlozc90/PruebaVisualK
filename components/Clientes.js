import useAuth from "../hooks/useAuth";
import Cliente from "./Cliente";

const Clientes = () => {
  const { clientes } = useAuth();

  // console.log("los clientes", clientes);

  return (
    <>
      <h1 className="text-4xl text-blue-600 font-semibold">Socios</h1>
      <p className="mt-3">Administra tus Socios</p>

      <table className="w-full bg-slate-500 mt-5 table-auto shadow">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Usuario</th>
            <th className="p-2">Socios</th>
            <th className="p-2">Codigo</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* {clientes && console.log("entra", clientes)} */}
          {clientes &&
            clientes.map((cliente, i) => <Cliente key={i} cliente={cliente} />)}
        </tbody>
      </table>
    </>
  );
};

export default Clientes;
