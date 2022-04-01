import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";

const Formulario = () => {
  const {
    cliente,
    setClientes,
    clientes,
    setCliente,
    verEditar,
    setVerEditar,
    setVerCrear,
  } = useAuth();
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [direccion, setDireccion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [id, setId] = useState("");

  console.log("modo editar:", verEditar);

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  };

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

    if (verEditar) {
      // editar el obj
      clienteNew.id = cliente.id;
      const clienteActualizado = clientes.map((item) =>
        item.id === cliente.id ? clienteNew : item
      );
      setClientes(clienteActualizado);
      setVerEditar(false);

      return;
    }
    // añadir copia del objeto
    clienteNew.id = generarId();
    setClientes([...clientes, clienteNew]);
    setVerCrear(false);
  };

  return (
    <>
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
    </>
  );
};

export default Formulario;
