import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";

const Cliente = ({ cliente }) => {
  const router = useRouter();
  // console.log(cliente, "CLiente");
  const { nombre, empresa, email, telefono, id } = cliente;
  const { SetVerCliente, SetCliente } = useAuth();

  const handleVer = () => {
    SetVerCliente(true);
    SetCliente(cliente);
  };

  return (
    <tr className="border-b ">
      <td className="p-3">{nombre}</td>
      <td className="p-3">
        <p>
          <span className="text-gray-800 uppercase font-bold ">Email: </span>
          {email}
        </p>
        <p>
          <span className="text-gray-800 uppercase font-bold ">Tel: </span>
          {telefono}
        </p>
      </td>
      <td className="p-3">{empresa}</td>
      <td className="p-3">
        <button
          type="button"
          className="bg-blue-500 block w-full text-white p-2 uppercase font-bold text-xs"
          onClick={handleVer}
        >
          Ver
        </button>
        <button
          type="button"
          className="bg-orange-500 block w-full text-white p-2 uppercase font-bold text-xs mt-2"
        >
          Editar
        </button>
        <button
          type="button"
          className="bg-red-500 block w-full text-white p-2 uppercase font-bold text-xs mt-2"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Cliente;
