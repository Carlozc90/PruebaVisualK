import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

//   api
const laApi = [
  {
    nombre: "Carlos",
    empresa: "netplay2",
    email: "Carlozc90@gmail.com",
    telefono: "9876543213",
    descripcion:
      "rum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officii",
    direccion: "Norte a Sur y Las Calles (Streets, St.) van de Este a Oeste.",
    id: "1",
  },
  {
    nombre: "Carlos2",
    empresa: "netplay4",
    email: "Carlozc90@gmail.com2",
    telefono: "12222222",
    descripcion:
      "rum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officii",
    direccion: "8333 NW 53rd St. Doral, FL 33166.",
    id: "2",
  },
];

const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({ id: "", key: "" });

  const [verCliente, setVerCliente] = useState(false);
  const [verEditar, setVerEditar] = useState(false);
  const [verCrear, setVerCrear] = useState(false);

  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({});

  useEffect(() => {
    setClientes(laApi);
  }, []);

  const handleEliminar = (id) => {
    const clientesActualizado = clientes.filter((item) => item.id !== id);
    setClientes(clientesActualizado);
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        user,
        setUser,
        clientes,
        setClientes,
        cliente,
        setCliente,
        verCliente,
        setVerCliente,
        verEditar,
        setVerEditar,
        verCrear,
        setVerCrear,
        handleEliminar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
