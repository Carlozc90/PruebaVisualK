import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { formatearFecha, logFuncion } from "../helpers";
import { toast } from "react-toastify";
import { getSqlAxios, newSqlAxios } from "../helpers/peticionSql";

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

  // LogRegistros
  const [logArr, setLogArr] = useState([]);

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
          // Agrega log en sql
          newSqlAxios(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // obtener los socios del usuario en el dash
  const axiosTusClientes = async (usuario) => {
    if (usuario === "") usuario = "postulante3"; // protejer la ruta
    try {
      await axios(`http://localhost:5000/visualk-dashboard/${usuario}`)
        .catch((error) => console.error("Error:", error))
        .then(function (response) {
          console.log("respuesta", response.data);
          setClientes(response.data.value);

          if (response.data.error) toast.error("Error");
          newSqlAxios(response);
        });
    } catch (error) {
      console.log(error);

      toast.error("Error");
    }
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

          newSqlAxios(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // obtener los sociobuscador
  const axiosBuscador = async (params, str) => {
    try {
      await axios(`http://localhost:5000/visualk-buscador/${params},${str}`)
        .catch((error) => console.error("Error:", error))
        .then(function (response) {
          console.log("respuesta", response.data);
          setClientes(response.data.value);

          if (response.data.error) toast.error("Error");
          newSqlAxios(response);
        });
    } catch (error) {
      console.log(error);
      if (response.data.error) {
        toast.error("Error");
      }
    }
  };

  // Editar Socio
  const axiosEdicion = async (cardcode, objNew) => {
    const toastId = toast.loading("cargando");
    try {
      await axios
        .patch(`http://localhost:5000/vissualk-edicion/${cardcode}`, objNew)
        .catch((error) => console.error("Error:", error))
        .then(function (response) {
          console.log("respuesta", response.data);

          if (response.data === 204) {
            toast.update(toastId, {
              render: "Editado Correctamente",
              type: "success",
              isLoading: false,
              autoClose: 5000,
            });

            // router.push("/prime");
          } else {
            toast.update(toastId, {
              render: "Error Coneccion",
              type: "error",
              isLoading: false,
              autoClose: 5000,
            });
          }

          newSqlAxios(response);
        });
    } catch (error) {
      console.log(error);
      toast.update(toastId, {
        render: "Error Coneccion",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  // eliminando socio Error
  const axiosDelete = async (cardcode) => {
    console.log("eliminando", cardcode);
    const toastId = toast.loading("cargando");
    try {
      await axios
        .delete(`http://localhost:5000/visualk-Eliminar/${cardcode}`)
        .catch((error) => console.error("Error:", error))
        .then(function (response) {
          if (response.data === 204) {
            toast.update(toastId, {
              render: "Eliminado Correctamente",
              type: "success",
              isLoading: false,
              autoClose: 5000,
            });

            // llamar de nuevo a los clientes ventana abierta
            axiosTusClientes(usuario);

            // router.push("/prime");
          } else {
            toast.update(toastId, {
              render: "Error Eliminacion",
              type: "error",
              isLoading: false,
              autoClose: 5000,
            });
          }

          newSqlAxios(response);
        });
    } catch (error) {
      console.log(error);
      toast.update(toastId, {
        render: "Error Coneccion",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
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
        // handleEliminar,
        handleMostrarDash,
        axiosLogin,
        axiosTusClientes,
        axiosCrecion,
        axiosBuscador,
        axiosEdicion,
        axiosDelete,
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
