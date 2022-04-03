import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

function VerCliente() {
  const { cliente } = useAuth();
  const { AdditionalID, CardCode, CardName, CardType, FederalTaxID } = cliente;

  return (
    <>
      <h1 className="font-black text-4xl text-blue-700">Ver Cliente</h1>
      <p className="mt-3">Informacion del Cliente</p>

      <p className="text-4xl text-gray-800 mt-10 font-bold">
        Socio:{" "}
        <span className="text-gray-800 text-3xl uppercase font-semibold">
          {CardName}
        </span>
      </p>
      <p className="text-2xl text-gray-800 mt-2 font-bold">
        CardCode:{" "}
        <span className="text-gray-700  font-semibold">{CardCode}</span>
      </p>
      <p className="text-2xl text-gray-800 mt-2 font-bold">
        CardType:{" "}
        <span className="text-gray-700  font-semibold">{CardType}</span>
      </p>
      <p className="text-2xl text-gray-800 mt-2 font-bold">
        Usuario:{" "}
        <span className="text-gray-700  font-semibold">{AdditionalID}</span>
      </p>
      <p className="text-2xl text-gray-800 mt-2 font-bold">
        TaxID:{" "}
        <span className="text-gray-700  font-semibold">{FederalTaxID}</span>
      </p>
    </>
  );
}

export default VerCliente;
