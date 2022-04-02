import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const Formulario = ({ creacionSocio }) => {
  const {
    cliente,
    setClientes,
    clientes,
    setCliente,
    verEditar,
    setVerEditar,
    setVerCrear,
    usuario,
  } = useAuth();

  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [carta, setCarta] = useState("");
  const [taxId, setTaxId] = useState("");
  const [activador, setActivador] = useState(false);

  const [direccion, setDireccion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [id, setId] = useState("");

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  };

  // mode Edit
  useEffect(() => {
    if (Object.keys(cliente).length > 0) {
      setNombre(cliente.nombre);
      setCodigo(cliente.email);
      setCarta(cliente.telefono);
      setTaxId(cliente.empresa);
      setDireccion(cliente.direccion);
      setDescripcion(cliente.descripcion);
      setId(cliente.id);
    }
  }, [cliente]);

  useEffect(() => {
    if ([nombre, codigo, carta, taxId].includes("")) return;
    setActivador(true);
  }, [carta, codigo, nombre, taxId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, codigo, carta, taxId].includes("")) {
      console.log("Todos los Campos son obligatorias");
      return;
    }

    //   construccion del objeto
    const socioNew = {
      CardName: nombre,
      CardCode: codigo.toLocaleUpperCase(),
      CardType: carta.toLocaleUpperCase(),
      FederalTaxID: taxId,
      AdditionalID: usuario,
    };

    if (verEditar) {
      // editar el obj
      socioNew.id = cliente.id;
      const clienteActualizado = clientes.map((item) =>
        item.id === cliente.id ? socioNew : item
      );
      setClientes(clienteActualizado);
      setVerEditar(false);

      return;
    }
    // añadir copia del objeto
    // socioNew.id = generarId();
    // setClientes([...clientes, socioNew]);

    console.log("obj nuevo", socioNew);
    creacionSocio(socioNew);

    // setVerCrear(false);
  };

  return (
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
          placeholder="Nombre del Socio"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="codigo"
          className="uppercase text-gray-500 block text-xl font-bold"
        >
          Codigo:
        </label>
        <input
          type="text"
          name="codigo"
          className="border w-full p-3 mt-3 bg-gray-50"
          placeholder="Ej: CS001"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="carta"
          className="uppercase text-gray-500 block text-xl font-bold"
        >
          Tipo Carta:
        </label>
        <input
          type="text"
          name="carta"
          className="border w-full p-3 mt-3 bg-gray-50"
          placeholder="Ej: C"
          value={carta}
          onChange={(e) => setCarta(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="taxId"
          className="uppercase text-gray-500 block text-xl font-bold"
        >
          FederalTaxID
        </label>
        <input
          type="text"
          name="taxId"
          placeholder="Ej: 1-3"
          className="border w-full p-3 mt-3 bg-gray-50"
          value={taxId}
          onChange={(e) => setTaxId(e.target.value)}
        />
      </div>

      <button
        disabled={activador ? false : true}
        type="submit"
        className={`bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold my-5   md:w-auto ${
          activador ? "hover:bg-indigo-900" : "cursor-not-allowed bg-indigo-300"
        } `}
      >
        Editar Cliente
      </button>
    </form>
  );
};

export default Formulario;
