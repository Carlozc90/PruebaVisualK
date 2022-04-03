import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";

const Cliente = ({ cliente }) => {
  const router = useRouter();
  // console.log(cliente, "CLiente");
  const { AdditionalID, CardCode, CardName, CardType, FederalTaxID } = cliente;
  const { setVerCliente, setCliente, setVerEditar, handleEliminar } = useAuth();

  const handleVer = () => {
    setVerCliente(true);
    setCliente(cliente);
  };

  const handleEdit = () => {
    setVerEditar(true);
    setCliente(cliente);
  };

  return (
    <tr className="border-b ">
      <td className="p-3">{AdditionalID}</td>
      <td className="p-3">
        <p>
          <span className="text-gray-800 uppercase font-bold ">Nombre: </span>
          {CardName}
        </p>
        <p>
          <span className="text-gray-800 uppercase font-bold ">
            Tipo de carta:{" "}
          </span>
          {CardType}
        </p>
      </td>
      <td className="p-3">{CardCode}</td>
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
          onClick={handleEdit}
        >
          Editar
        </button>
        <button
          type="button"
          className="bg-red-500 block w-full text-white p-2 uppercase font-bold text-xs mt-2"
          onClick={() => {
            handleEliminar();
          }}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Cliente;
