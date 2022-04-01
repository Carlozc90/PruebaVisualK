import useAuth from "../hooks/useAuth";

function VerCliente() {
  const { cliente } = useAuth();
  console.log(cliente);
  return (
    <>
      <h1 className="font-black text-4xl text-blue-700">Ver Cliente</h1>
      <p className="mt-3">Informacion del Cliente</p>
    </>
  );
}

export default VerCliente;
