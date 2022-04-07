import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Cliente from "./Cliente";

const Clientes = () => {
  const { clientes, axiosTusClientes, mostrarPanel, handleMostrarDash } =
    useAuth();

  return (
    <>
      <h1 className="text-4xl text-blue-600 font-semibold text-center md:text-left ">
        Socios
      </h1>
      <p className="mt-3 text-center md:text-left">Administra tus Socios</p>

      {mostrarPanel ? (
        <table className="w-full bg-slate-300  mt-5 table-auto shadow">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Usuario</th>
              <th className="p-2">Socios</th>
              <th className="p-2">Codigo</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes &&
              clientes.map((cliente, i) => (
                <Cliente key={i} cliente={cliente} />
              ))}
          </tbody>
        </table>
      ) : (
        <button
          type="submit"
          value="Mostrar socios"
          className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold my-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          onClick={handleMostrarDash}
        >
          Mostrar tus socios
        </button>
      )}
    </>
  );
};

export default Clientes;
