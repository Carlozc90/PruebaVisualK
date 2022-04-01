import Formulario from "./Formulario";

const EditarCliente = () => {
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
        Utiliza este formulario para editar datos de un cliente
      </p>

      <div className="bg-slate-100 mt-10 px-5 py-10 rounded-md shadow-md w-3/4 mx-auto">
        <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
          Editar Cliente
        </h1>

        <Formulario />
      </div>
    </>
  );
};

export default EditarCliente;
