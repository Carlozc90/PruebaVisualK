import Formulario from "./Formulario";

const NuevoCliente = () => {
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Crear nuevo Cliente</h1>
      <p className="mt-3">
        Utiliza este formulario para crear un nuevo Cliente
      </p>

      <div className="bg-slate-100 mt-10 px-5 py-10 rounded-md shadow-md w-3/4 mx-auto">
        <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
          Crear Cliente
        </h1>

        <Formulario />
      </div>
    </>
  );
};

export default NuevoCliente;
