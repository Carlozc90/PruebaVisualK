import useAuth from "../hooks/useAuth";

function VerCliente() {
  const { cliente } = useAuth();
  const { nombre, email, telefono, empresa, descripcion, direccion } = cliente;

  return (
    <>
      <h1 className="font-black text-4xl text-blue-700">Ver Cliente</h1>
      <p className="mt-3">Informacion del Cliente</p>

      <p className="text-4xl text-gray-800 mt-10 font-bold">
        Cliente:{" "}
        <span className="text-gray-800 text-3xl uppercase font-semibold">
          {nombre}
        </span>
      </p>
      <p className="text-2xl text-gray-800 mt-2 font-bold">
        Email: <span className="text-gray-700  font-semibold">{email}</span>
      </p>
      <p className="text-2xl text-gray-800 mt-2 font-bold">
        Telefono:{" "}
        <span className="text-gray-700  font-semibold">{telefono}</span>
      </p>
      <p className="text-2xl text-gray-800 mt-2 font-bold">
        Empresa: <span className="text-gray-700  font-semibold">{empresa}</span>
      </p>
      <p className="text-2xl text-gray-800 mt-2 font-bold">
        Direccion:{" "}
        <span className="text-gray-700  font-semibold">{direccion}</span>
      </p>
      <p className="text-2xl text-gray-800 mt-4 font-bold">
        Descripcion:{" "}
        <span className="text-gray-700  font-semibold">{descripcion}</span>
      </p>
    </>
  );
}

export default VerCliente;
