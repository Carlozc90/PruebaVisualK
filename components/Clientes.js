import useAuth from "../hooks/useAuth";
import Cliente from "./Cliente";

const Clientes = () => {
  const { clientes } = useAuth();
  console.log(clientes);

  return (
    <>
      <h1 className="text-4xl text-blue-600 font-semibold">Clientes</h1>
      <p className="mt-3">Administra tus Clientes</p>

      <table className="w-full bg-slate-500 mt-5 table-auto shadow">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes &&
            clientes.map((cliente, i) => <Cliente key={i} cliente={cliente} />)}
        </tbody>
      </table>
    </>
  );
};

export default Clientes;
