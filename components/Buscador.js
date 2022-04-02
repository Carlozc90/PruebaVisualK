import { Fragment, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const PLANES = [
  {
    id: 1,
    nombre: "Nombre",
    place: "Nombre del Socio",
    parametro: "CardName",
  },
  {
    id: 2,
    nombre: "Completo",
    place: "Nombre Completo",
  },
];

const Buscador = () => {
  const { obtenerBuscador, buscador } = useAuth();

  const [activador, setActivador] = useState(0);
  const [atvResultado, setAtvResultado] = useState(false);
  const [filtro, setFiltro] = useState({});
  const [inputstate, setInputState] = useState("");
  //   const [resultado, setResultado] = useState({});

  const handleChangeDatos = (e) => {
    console.log(parseInt(e.target.value));
    setActivador(parseInt(e.target.value));

    const plan = PLANES.filter(
      (items) => items.id === parseInt(e.target.value)
    );
    console.log("el plan: ", plan[0]);
    setFiltro(plan[0]);
  };

  const hanleSubmit = (e) => {
    e.preventDefault();

    console.log("parametros", filtro.parametro);
    console.log("string", inputstate);
    obtenerBuscador(filtro.parametro, inputstate);
    setAtvResultado(true);
  };

  return (
    <>
      <h1 className="font-black text-4xl text-blue-700">Buscador</h1>
      <p className="mt-3">Selecciona su tipo de busqueda</p>

      <div className="bg-slate-100 mt-10 px-5 py-10 rounded-md shadow-md w-3/4 mx-auto">
        <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
          Buscador
        </h1>

        <form onSubmit={hanleSubmit}>
          <label className="block mb-3 font-bold text-gray-400 uppercase">
            Elige parametro
          </label>
          <div className="flex gap-3 items-center">
            {PLANES.map((item) => (
              <Fragment key={item.id}>
                <label>{item.nombre}</label>
                <input
                  type="radio"
                  name="plan"
                  value={item.id}
                  onChange={(e) => handleChangeDatos(e)}
                />
              </Fragment>
            ))}
          </div>

          {activador > 0 && (
            <div className="mb-4 mt-6">
              <label
                htmlFor="nombre"
                className=" text-gray-500 block text-xl font-bold"
              >
                {filtro.parametro}
              </label>
              <input
                type="text"
                name="nombre"
                className="border w-full p-3 mt-3 bg-gray-50"
                placeholder={filtro.place}
                value={inputstate}
                onChange={(e) => setInputState(e.target.value)}
              />
            </div>
          )}

          <button
            disabled={inputstate ? false : true}
            type="submit"
            className={`bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold my-5   md:w-auto ${
              inputstate ? "hover:bg-indigo-900" : "cursor-not-allowed"
            } `}
          >
            Buscar
          </button>
        </form>
      </div>

      {atvResultado && (
        <div className="bg-slate-100 mt-10 px-5 py-10 rounded-md shadow-md w-3/4 mx-auto">
          <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
            Resultado
          </h1>

          <p className="text-4xl text-gray-800 mt-10 font-bold">
            Socio:{" "}
            <span className="text-gray-800 text-3xl uppercase font-semibold">
              {buscador[0]?.CardName}
            </span>
          </p>
          <p className="text-2xl text-gray-800 mt-2 font-bold">
            CardCode:{" "}
            <span className="text-gray-700  font-semibold">
              {buscador[0]?.CardCode}
            </span>
          </p>
          <p className="text-2xl text-gray-800 mt-2 font-bold">
            CardType:{" "}
            <span className="text-gray-700  font-semibold">
              {buscador[0]?.CardType}
            </span>
          </p>
          <p className="text-2xl text-gray-800 mt-2 font-bold">
            Usuario:{" "}
            <span className="text-gray-700  font-semibold">
              {buscador[0]?.AdditionalID}
            </span>
          </p>
          <p className="text-2xl text-gray-800 mt-2 font-bold">
            TaxID:{" "}
            <span className="text-gray-700  font-semibold">
              {buscador[0]?.FederalTaxID}
            </span>
          </p>
        </div>
      )}
    </>
  );
};

export default Buscador;
