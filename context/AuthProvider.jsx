import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState("postulante3");
  const [password, setPassword] = useState("123qwe");
  const [user, setUser] = useState({});

  const [verCliente, setVerCliente] = useState(false);
  const [verEditar, setVerEditar] = useState(false);
  const [verCrear, setVerCrear] = useState(false);
  const [verBuscador, setVerBuscardor] = useState(false);

  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({});

  const [cookies, setCookies] = useState({});
  const [session, setSession] = useState("");

  // parametros
  const [buscador, setBuscado] = useState([]);

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

  // obtener los socios del usuario
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

  // obtener los sociobuscador
  const obtenerBuscador = async (params, str) => {
    try {
      const { data } = await axios(
        // `https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners('CS001')`,
        `https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners?$select=CardCode,CardName,CardType,FederalTaxID,AdditionalID&$filter=startswith(${params}, '${str}')`,
        {
          withCredentials: true,
        }
      ).catch(function (error) {
        // respuesta del servidor error
        if (error.response) {
          console.log(error.response.data);
        }
      });

      console.log("Buscador", data.value);
      setBuscado(data.value);

      // setClientes(data.value);
    } catch (error) {
      console.log(error);
    }
  };

  // creacion del socio
  const creacionSocio = async (jsonsocio) => {
    try {
      const { data } = await axios
        .post(
          "https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners",
          JSON.stringify(jsonsocio),
          { withCredentials: true }
        )
        .catch(function (error) {
          // respuesta del servidor error
          if (error.response) {
            console.log(error.response.data);
          }
        });

      console.log("creacion hecha");

      // setCookies(data);
      // setSession(data.SessionId);
      // obtenerClientes();

      // repocicionar al usuario
      // router.push("/prime");
    } catch (error) {
      console.log(error);
    }
  };

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
        verBuscador,
        setVerBuscardor,
        handleEliminar,
        obtenerCookies,
        obtenerClientes,
        creacionSocio,
        obtenerBuscador,
        buscador,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
