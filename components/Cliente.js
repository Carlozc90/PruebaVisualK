import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";

const Cliente = ({ cliente }) => {
  const router = useRouter();
  // console.log(cliente, "CLiente");
  const { AdditionalID, CardCode, CardName, CardType, FederalTaxID } = cliente;
  const { setVerCliente, setCliente, setVerEditar, axiosDelete } = useAuth();

  const handleVer = () => {
    setVerCliente(true);
    setCliente(cliente);
  };

  const handleEdit = () => {
    setVerEditar(true);
    setCliente(cliente);
  };

  return (
    <tr className="border-b text-center ">
      <td className="font-medium">{AdditionalID}</td>
      <td className="font-medium">{CardName}</td>
      <td className="font-medium">{CardCode}</td>
      <td className="flex justify-center -mx-2 ">
        <button
          type="button"
          className="bg-blue-500 rounded-md "
          onClick={handleVer}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-file-search "
            width="32"
            height="32"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ffffff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M12 21h-5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v4.5" />
            <circle cx="16.5" cy="17.5" r="2.5" />
            <line x1="18.5" y1="19.5" x2="21" y2="22" />
          </svg>
        </button>
        <button
          type="button"
          className="bg-orange-500 mx-2  rounded-md "
          onClick={handleEdit}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-edit"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ffffff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
            <line x1="16" y1="5" x2="19" y2="8" />
          </svg>
        </button>
        <button
          type="button"
          className="bg-red-500 rounded-md "
          onClick={() => {
            axiosDelete(cliente.CardCode);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-trash"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ffffff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Cliente;
