import useAuth from "../hooks/useAuth";
import Formulario from "./Formulario";

const NuevoCliente = () => {
  const { axiosCrecion } = useAuth();
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Crear nuevo Socio</h1>
      <p className="mt-3">Utiliza este formulario para crear un nuevo Socio</p>

      <div className="bg-slate-100 mt-10 px-5 py-10 rounded-md shadow-md w-3/4 mx-auto">
        <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
          Crear Socio
        </h1>

        <Formulario axiosCrecion={axiosCrecion} />
      </div>
    </>
  );
};

export default NuevoCliente;
