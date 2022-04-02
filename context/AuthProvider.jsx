import axios from "axios";
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

const layer = [
  {
    "odata.metadata":
      "https://datacenter.visualkgroup.com:58346/b1s/v1/$metadata#B1Sessions/@Element",
    SessionId: "85a3ce9e-b228-11ec-8000-0050569ff3d9",
    Version: "930230",
    SessionTimeout: 30,
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

  const [cookies, setCookies] = useState({});
  const [pase, setPase] = useState(false);

  useEffect(() => {
    // setClientes(laApi);
  }, []);

  const handleEliminar = (id) => {
    const clientesActualizado = clientes.filter((item) => item.id !== id);
    setClientes(clientesActualizado);
  };

  const obtenerCookies = async () => {
    try {
      const data = await axios.post(
        "https://datacenter.visualkgroup.com:58346/b1s/v1/Login",
        JSON.stringify({
          CompanyDB: "VISUALK_CL",
          UserName: "postulante3",
          Password: "123qwe",
        })
        // { headers: { "content-type": "application/json" } }
      );
      console.log(`data: `, typeof data);
      setCookies(data);
      //   return data;
      // setCookies{data};
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log("lol", obtenerCookies());
    const hola = obtenerCookies();
    console.log("aki", hola);

    setPase(true);
    // setCookies(obtenerCookies());
  }, []);

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
