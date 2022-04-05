import useAuth from "../hooks/useAuth";

const BuscardorMapeo = ({ items }) => {
  return (
    <div className="bg-slate-100 mt-10 px-5 py-10 rounded-md shadow-md w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        Resultado
      </h1>

      <p className="text-4xl text-gray-800 mt-10 font-bold">
        Socio:{" "}
        <span className="text-gray-800 text-3xl uppercase font-semibold">
          {items?.CardName}
        </span>
      </p>
      <p className="text-2xl text-gray-800 mt-2 font-bold">
        CardCode:{" "}
        <span className="text-gray-700  font-semibold">{items?.CardCode}</span>
      </p>
      <p className="text-2xl text-gray-800 mt-2 font-bold">
        CardType:{" "}
        <span className="text-gray-700  font-semibold">{items?.CardType}</span>
      </p>
      <p className="text-2xl text-gray-800 mt-2 font-bold">
        Usuario:{" "}
        <span className="text-gray-700  font-semibold">
          {items?.AdditionalID}
        </span>
      </p>
      <p className="text-2xl text-gray-800 mt-2 font-bold">
        TaxID:{" "}
        <span className="text-gray-700  font-semibold">
          {items?.FederalTaxID}
        </span>
      </p>
    </div>
  );
};

export default BuscardorMapeo;
