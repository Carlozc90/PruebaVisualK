import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const EditarCliente = () => {
  const { cliente, setClientes, clientes, setCliente } = useAuth();
  //   const { nombre } = cliente;
  //   const clientelol = clie

  const [clienteEditado, setClienteEditado] = useState({});

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [direccion, setDireccion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [id, setId] = useState("");

  //   console.log(cliente);

  useEffect(() => {
    if (Object.keys(cliente).length > 0) {
      setNombre(cliente.nombre);
      setEmail(cliente.email);
      setTelefono(cliente.telefono);
      setEmpresa(cliente.empresa);
      setDireccion(cliente.direccion);
      setDescripcion(cliente.descripcion);
      setId(cliente.id);
    }
  }, [cliente]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //   construccion del objeto

    const clienteNew = {
      nombre,
      email,
      telefono,
      empresa,
      direccion,
      descripcion,
    };

    // añadir copia del objeto
    // generar el id
    // setClientes([...clientes, clienteNew]);

    // editar el obj
    clienteNew.id = cliente.id;
    const clienteActualizado = clientes.map((item) =>
      item.id === cliente.id ? clienteNew : item
    );
    setClientes(clienteActualizado);
  };

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
        Utiliza este formulario para editar datos de un cliente
      </p>

      <div className="bg-slate-100 mt-10 px-5 py-10 rounded-md shadow-md w-3/4 mx-auto">
        <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
          Cliente
        </h1>

        {/* Formulario */}

        <form className="mt-10" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="uppercase text-gray-500 block text-xl font-bold"
            >
              Nombre:
            </label>
            <input
              type="text"
              name="nombre"
              className="border w-full p-3 mt-3 bg-gray-50"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="uppercase text-gray-500 block text-xl font-bold"
            >
              E-mail:
            </label>
            <input
              type="email"
              name="email"
              className="border w-full p-3 mt-3 bg-gray-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="telefono"
              className="uppercase text-gray-500 block text-xl font-bold"
            >
              Telefono:
            </label>
            <input
              type="text"
              name="telefono"
              className="border w-full p-3 mt-3 bg-gray-50"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="empresa"
              className="uppercase text-gray-500 block text-xl font-bold"
            >
              Empresa:
            </label>
            <input
              type="text"
              name="empresa"
              className="border w-full p-3 mt-3 bg-gray-50"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="direccion"
              className="uppercase text-gray-500 block text-xl font-bold"
            >
              Direccion:
            </label>
            <input
              type="text"
              name="direccion"
              className="border w-full p-3 mt-3 bg-gray-50"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="descripcion"
              className="uppercase text-gray-500 block text-xl font-bold"
            >
              Descripcion:
            </label>
            <textarea
              className="border w-full p-3 mt-3 bg-gray-50"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold my-5 hover:cursor-pointer hover:bg-indigo-900 md:w-auto"
          >
            Editar Cliente
          </button>
        </form>
      </div>
    </>
  );
};

export default EditarCliente;
