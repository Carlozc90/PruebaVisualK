import { Fragment, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import BuscardorMapeo from "./BuscardorMapeo";

const PLANES = [
  {
    id: 1,
    nombre: "Nombre",
    place: "Nombre del Socio",
    parametro: "CardName",
  },
  {
    id: 2,
    nombre: "Codigo",
    place: "Codigo del Socio",
    parametro: "CardCode",
  },
];

const Buscador = () => {
  const { axiosBuscador, clientes } = useAuth();

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

  const hanleSubmit = async (e) => {
    e.preventDefault();

    console.log("parametros", filtro.parametro);
    console.log("string", inputstate);
    setAtvResultado(false);
    await axiosBuscador(filtro.parametro, inputstate);
    setAtvResultado(true);
  };

  return (
    <>
      <h1 className="font-black text-4xl text-blue-700 text-center md:text-left">
        Buscador
      </h1>
      <p className="mt-3 text-center md:text-left">
        Selecciona su tipo de busqueda
      </p>

      <div className="bg-slate-100 mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
        <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
          Buscador
        </h1>

        <form onSubmit={hanleSubmit}>
          <label className="block mb-3 font-bold text-gray-400 uppercase mt-5">
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
            className={`bg-indigo-700 w-full py-3 px-10 rounded-xl mt-6 text-white uppercase font-bold md:w-auto ${
              inputstate
                ? "hover:bg-indigo-900"
                : "cursor-not-allowed bg-indigo-300"
            } `}
          >
            Buscar
          </button>
        </form>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-4 mt-10">
        {atvResultado &&
          clientes &&
          clientes.map((items, i) => <BuscardorMapeo key={i} items={items} />)}
      </div>
      {!clientes.length && (
        <p className="uppercase text-center font-semibold">
          Elemento no encontrado
        </p>
      )}
    </>
  );
};

export default Buscador;
