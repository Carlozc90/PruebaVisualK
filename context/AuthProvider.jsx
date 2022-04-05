import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { formatearFecha, logFuncion } from "../helpers";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);

  const [verCliente, setVerCliente] = useState(false);
  const [verEditar, setVerEditar] = useState(false);
  const [verCrear, setVerCrear] = useState(false);
  const [verBuscador, setVerBuscardor] = useState(false);
  const [verLog, setVerLog] = useState(false);

  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({});

  // funcionalidad
  const [mostrarPanel, setMostrarPanel] = useState(false);
  const [cookies, setCookies] = useState({});
  const [session, setSession] = useState("");

  // parametros
  const [buscador, setBuscado] = useState([]);

  // LogRegistros
  const [logArr, setLogArr] = useState([]);

  const handleEliminar = (id) => {
    // const clientesActualizado = clientes.filter((item) => item.id !== id);
    // setClientes(clientesActualizado);
    eliminarSocio(id);
  };

  const handleMostrarDash = () => {
    console.log("click");
    setMostrarPanel(!mostrarPanel);
    axiosTusClientes(usuario);
  };

  // peticion login
  const axiosLogin = async (user) => {
    console.log("click login");

    try {
      const toastId = toast.loading("cargando");
      await axios
        .post(`http://localhost:5000/visualk-login`, user)
        .catch((error) => console.error("Error:", error))
        .then(function (response) {
          console.log("respuesta", response.data);
          if (response.data.error) {
            // error
            toast.update(toastId, {
              render: "Acceso denegado",
              type: "error",
              isLoading: false,
              autoClose: 5000,
            });
            setAuth(false);
          } else {
            // ok
            toast.update(toastId, {
              render: "Bienvenido",
              type: "success",
              isLoading: false,
              autoClose: 5000,
            });
            setAuth(true);
            router.push("/prime");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  // obtener los socios del usuario
  const axiosTusClientes = async (usuario) => {
    if (usuario === "") usuario = "postulante3"; // protejer la ruta
    try {
      await axios(`http://localhost:5000/visualk-dashboard/${usuario}`)
        .catch((error) => console.error("Error:", error))
        .then(function (response) {
          console.log("respuesta", response.data);
          setClientes(response.data.value);

          if (response.data.error) toast.error("Error");
        });
    } catch (error) {
      console.log(error);
      if (response.data.error) {
        toast.error("Error");
      }
    }

    // try {
    //   const data = await axios(`http://localhost:5000/visualk-login')`).catch(
    //     function (error) {
    //       if (error.response) {
    //         console.log(error.response.data);
    //         // Arreglo de Log
    //         setLogArr([
    //           ...logArr,
    //           logFuncion(
    //             "",
    //             "Error en Dashboard",
    //             error.response.config.method,
    //             error.response.status,
    //             error.response.statusText,
    //             error.response.data.error.message.value
    //           ),
    //         ]);
    //       }
    //     }
    //   );

    //   // setear la respuesta filtro
    //   setClientes(data.data.value);

    //   // Succes
    //   // Arreglo de Log
    //   setLogArr([
    //     ...logArr,
    //     logFuncion(
    //       usuario,
    //       "Succes Dashboard",
    //       data.config.method,
    //       data.status,
    //       data.statusText,
    //       "Succes"
    //     ),
    //   ]);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // creacion del socio
  const axiosCrecion = async (jsonSocio) => {
    console.log("click creacion", jsonSocio);

    try {
      const toastId = toast.loading("cargando");
      await axios
        .post(`http://localhost:5000/visualk-creacion`, jsonSocio)
        .catch((error) => console.error("Error:", error))
        .then(function (response) {
          console.log("respuesta", response.data);
          if (response.data.error) {
            // error
            toast.update(toastId, {
              render: `${
                response.data.error.code === -10
                  ? "Error Codigo Ocupado"
                  : "Error"
              }`,
              type: "error",
              isLoading: false,
              autoClose: 5000,
            });
          } else {
            // ok
            toast.update(toastId, {
              render: "Creado Correctamente",
              type: "success",
              isLoading: false,
              autoClose: 5000,
            });
            // router.push("/prime");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  // obtener los sociobuscador
  const obtenerBuscador = async (params, str) => {
    try {
      const data = await axios(
        `https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners?$select=CardCode,CardName,CardType,FederalTaxID,AdditionalID&$filter=startswith(${params}, '${str}')`,
        {
          withCredentials: true,
        }
      ).catch(function (error) {
        // respuesta del servidor error
        if (error.response) {
          console.log(error.response.data);
          // Arreglo de Log
          setLogArr([
            ...logArr,
            logFuncion(
              "",
              "Error en Buscador",
              error.response.config.method,
              error.response.status,
              error.response.statusText,
              error.response.data.error.message.value
            ),
          ]);
        }
      });

      console.log("Buscador", data.data.value);
      setBuscado(data.data.value);
      // Succes
      // Arreglo de Log
      setLogArr([
        ...logArr,
        logFuncion(
          usuario,
          "Succes Buscador",
          data.config.method,
          data.status,
          data.statusText,
          "Succes"
        ),
      ]);

      // setClientes(data.value);
    } catch (error) {
      console.log(error);
    }
  };

  // editar socio ERROR
  const editarSocio = async (cardcode, jsonmodificado) => {
    try {
      const data = await axios
        .patch(
          `https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners('${cardcode}')`,
          JSON.stringify(jsonmodificado),
          { withCredentials: true }
        )
        .catch(function (error) {
          // respuesta del servidor error
          if (error.response) {
            console.log(error.response.data);
            // Arreglo de Log
            setLogArr([
              ...logArr,
              logFuncion(
                "",
                "Error Edicion Socio",
                error.response.config.method,
                error.response.status,
                error.response.statusText,
                error.response.data.error.message.value
              ),
            ]);
          }
        });
      console.log("modificado");
      setLogArr([
        ...logArr,
        logFuncion(
          usuario,
          "Succes Edicion",
          data.config.method,
          data.status,
          data.statusText,
          "Succes"
        ),
      ]);
      // // repocicionar al usuario
      // router.push("/prime");
    } catch (error) {
      console.log(error);
    }
  };

  // eliminando socio Error
  const eliminarSocio = async (cardcode) => {
    console.log("eliminando");

    try {
      axios
        .delete(
          `https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners('${cardcode}')`,
          { withCredentials: true }
        )
        .catch(function (error) {
          // respuesta del servidor error
          if (error.response) {
            console.log(error.response.data);
            // Arreglo de Log
            setLogArr([
              ...logArr,
              logFuncion(
                "",
                "Error Eliminar Socio",
                error.response.config.method,
                error.response.status,
                error.response.statusText,
                error.response.data.error.message.value
              ),
            ]);
          }
        });
      console.log("modificado");
      setLogArr([
        ...logArr,
        logFuncion(
          usuario,
          "Succes Eliminacion",
          data.config.method,
          data.status,
          data.statusText,
          "Succes"
        ),
      ]);
      // // repocicionar al usuario
      // router.push("/prime");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
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
        verLog,
        setVerLog,
        handleEliminar,
        handleMostrarDash,
        axiosLogin,
        axiosTusClientes,
        axiosCrecion,
        obtenerBuscador,
        editarSocio,
        buscador,
        logArr,
        // obtenerLogServer,
        // obteneritem,
        mostrarPanel,
        setMostrarPanel,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
