import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

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
  const [usuario, setUsuario] = useState("postulante3");
  const [password, setPassword] = useState("123qwe");
  const [user, setUser] = useState({});

  const [verCliente, setVerCliente] = useState(false);
  const [verEditar, setVerEditar] = useState(false);
  const [verCrear, setVerCrear] = useState(false);

  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({});

  const [cookies, setCookies] = useState({});
  const [session, setSession] = useState("");

  const handleEliminar = (id) => {
    const clientesActualizado = clientes.filter((item) => item.id !== id);
    setClientes(clientesActualizado);
  };

  const router = useRouter();

  // obtener las coockies
  const obtenerCookies = async (jsonusuario) => {
    try {
      const { data } = await axios
        .post(
          "https://datacenter.visualkgroup.com:58346/b1s/v1/Login",
          JSON.stringify(jsonusuario),
          { withCredentials: true }
        )
        .catch(function (error) {
          // respuesta del servidor error
          if (error.response) {
            console.log(error.response.data);
          }
        });
      setCookies(data);
      setSession(data.SessionId);
      obtenerClientes();

      // repocicionar al usuario
      router.push("/prime");
    } catch (error) {
      console.log(error);
    }
  };

  // obtener los usuarios
  const obtenerClientes = async () => {
    try {
      const { data } = await axios(
        // `https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners('CS001')`,
        `https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners?$select=CardCode,CardName,CardType,FederalTaxID,AdditionalID&$filter=startswith(AdditionalID, 'postulante3')`,
        {
          withCredentials: true,
        }
      ).catch(function (error) {
        // respuesta del servidor error
        if (error.response) {
          console.log(error.response.data);
        }
      });

      // setear la respuesta filtro
      setClientes(data.value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // setClientes(laApi);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        setUsuario,
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
        obtenerCookies,
        obtenerClientes,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
