import useAuth from "../hooks/useAuth";

const BuscardorMapeo = ({ items }) => {
  const { axiosDelete, setVerEditar, setCliente } = useAuth();
  const handleEdit = () => {
    setVerEditar(true);
    setCliente(items);
  };
  return (
    <div className="bg-slate-100  rounded-md shadow-md ">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center mt-5">
        Resultado
      </h1>

      <p className="text-3xl text-gray-800 mt-8 font-bold mx-2 ">
        Socio:{" "}
        <span className="text-gray-800 text-2xl font-semibold">
          {items?.CardName}
        </span>
      </p>
      <p className="text-2xl text-gray-800 mt-2 mx-2 font-bold">
        CardCode:{" "}
        <span className="text-gray-700   font-semibold">{items?.CardCode}</span>
      </p>
      <p className="text-2xl text-gray-800 mt-2  mx-2 font-bold">
        CardType:{" "}
        <span className="text-gray-700  font-semibold">{items?.CardType}</span>
      </p>
      <p className="text-2xl text-gray-800 mt-2 mx-2  font-bold">
        Usuario:{" "}
        <span className="text-gray-700  font-semibold">
          {items?.AdditionalID}
        </span>
      </p>
      <p className="text-2xl text-gray-800 mt-2  mx-2  font-bold">
        TaxID:{" "}
        <span className="text-gray-700  font-semibold">
          {items?.FederalTaxID}
        </span>
      </p>
      <div className=" flex justify-end gap-2 mr-4 mb-4">
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
            axiosDelete(items.CardCode);
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
      </div>
    </div>
  );
};

export default BuscardorMapeo;
