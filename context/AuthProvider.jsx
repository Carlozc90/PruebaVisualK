import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { newSqlAxios } from "../helpers/peticionSql";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [usuario, setUsuario] = useState("develop");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);

  const [verCliente, setVerCliente] = useState(false);
  const [verEditar, setVerEditar] = useState(false);
  const [verCrear, setVerCrear] = useState(false);
  const [verBuscador, setVerBuscardor] = useState(false);
  const [verLog, setVerLog] = useState(false);
  const [verPdf, setVerPdf] = useState(false);

  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({});

  // funcionalidad
  const [mostrarPanel, setMostrarPanel] = useState(false);

  // LogRegistros
  const [logArr, setLogArr] = useState([]);

  const handleMostrarDash = () => {
    console.log("click");
    setMostrarPanel(!mostrarPanel);
    axiosTusClientes(usuario);
  };

  // peticion Sql
  const getSqlAxios = async () => {
    try {
      await axios(`http://localhost:5000/sql`)
        .catch((error) => console.error("Error sql:", error))
        .then(function (response) {
          // console.log("respuesta sql", response.data);
          setLogArr(response.data);
        });
    } catch (error) {
      console.log("error sql->", error);
    }
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
          console.log("respuesta login->", response);
          const code = response.data.statusCode;
          if (code >= 200 && code < 300) {
            // ok
            toast.update(toastId, {
              render: "Bienvenido",
              type: "success",
              isLoading: false,
              autoClose: 5000,
            });
            setAuth(true);
            router.push("/prime");
          } else {
            // error
            toast.update(toastId, {
              render: "Acceso denegado",
              type: "error",
              isLoading: false,
              autoClose: 5000,
            });
            setAuth(false);
          }

          // Agrega log en sql
          newSqlAxios(usuario, "axiosLogin()", response);
          //Actualiza front sql
          getSqlAxios();
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
          console.log("respuesta usuario", response.data);
          setClientes(response.data.body.value);

          if (response.data.body.error) toast.error("Error");
          newSqlAxios(usuario, "axiosTusClientes()", response);
          //Actualiza front sql
          getSqlAxios();
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
          const code = response.data.statusCode;
          if (code >= 200 && code < 300) {
            // ok
            toast.update(toastId, {
              render: "Creado Correctamente",
              type: "success",
              isLoading: false,
              autoClose: 5000,
            });
            // router.push("/prime");
          } else {
            console.log("erro _>", response.data);
            // error
            toast.update(toastId, {
              render: `${
                response.data.body.error.code === -10
                  ? "Error Codigo Ocupado"
                  : "Error"
              }`,
              type: "error",
              isLoading: false,
              autoClose: 5000,
            });
          }
          newSqlAxios(usuario, "axiosCrecion()", response, "creacion");
          //Actualiza front sql
          getSqlAxios();
        });
    } catch (error) {
      console.log(error);
    }
  };

  // obtener los sociobuscador
  const axiosBuscador = async (params, str) => {
    try {
      const toastId = toast.loading("cargando");
      await axios(`http://localhost:5000/visualk-buscador/${params},${str}`)
        .catch((error) => console.error("Error:", error))
        .then(function (response) {
          console.log("respuesta buscador", response.data);
          const code = response.data.statusCode;

          setClientes(response.data.body.value);
          if (code >= 200 && code < 300) {
            // ok
            toast.update(toastId, {
              render: "Busqueda Correcta",
              type: "success",
              isLoading: false,
              autoClose: 5000,
            });
          } else {
            // error
            toast.update(toastId, {
              render: "Acceso denegado",
              type: "error",
              isLoading: false,
              autoClose: 5000,
            });
          }
          newSqlAxios(usuario, "axiosBuscador()", response);
          //Actualiza front sql
          getSqlAxios();
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
        .patch(`http://localhost:5000/visualk-edicion/${cardcode}`, objNew)
        .catch((error) => console.error("Error:", error))
        .then(function (response) {
          // console.log("respuesta", response.data);
          newSqlAxios(usuario, "axiosEdicion()", response, "edicion");
          //Actualiza front sql
          getSqlAxios();
          const code = response.data.statusCode;
          if (code >= 200 && code < 300) {
            toast.update(toastId, {
              render: "Editado Correctamente",
              type: "success",
              isLoading: false,
              autoClose: 5000,
            });
            return;
          }
          toast.update(toastId, {
            render: "Error Edicion",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
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
          const code = response.data.statusCode;
          if (code >= 200 && code < 300) {
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

          newSqlAxios(usuario, "axiosDelete()", response);
          //Actualiza front sql
          getSqlAxios();
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
        logArr,
        setLogArr,

        //Vistas States
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
        verPdf,
        setVerPdf,
        mostrarPanel,
        setMostrarPanel,

        //peticiones
        handleMostrarDash,
        getSqlAxios,
        axiosLogin,
        axiosTusClientes,
        axiosCrecion,
        axiosBuscador,
        axiosEdicion,
        axiosDelete,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
