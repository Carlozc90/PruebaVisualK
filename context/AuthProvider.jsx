import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { formatearFecha, logFuncion } from "../helpers";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});

  const [verCliente, setVerCliente] = useState(false);
  const [verEditar, setVerEditar] = useState(false);
  const [verCrear, setVerCrear] = useState(false);
  const [verBuscador, setVerBuscardor] = useState(false);
  const [verLog, setVerLog] = useState(false);

  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({});

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

  const router = useRouter();

  const axiosLogin = async (user) => {
    console.log("click login");

    try {
      const toastId = toast.loading("cargando");
      await axios
        .post("http://localhost:5000/visualk-login", user)
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
          } else {
            // ok
            toast.update(toastId, {
              render: "Bienvenido",
              type: "success",
              isLoading: false,
              autoClose: 5000,
            });
            router.push("/prime");
          }

          // const id = toast.loading("Please wait...");
          // //do something else
          // toast.update(id, {
          //   render: "All is good",
          //   type: "success",
          //   isLoading: false,
          // });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const obteneritem = async (jsonusuario) => {
    console.log("click obtener id");
    // try {
    //   await axios
    //     .get("http://localhost:5000/visualk-id")
    //     .catch((error) => console.error("Error:", error))
    //     .then(function (response) {
    //       console.log("succes", response.data);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // obtener las coockies
  // const axiosLogin = async (jsonusuario) => {
  //   try {
  //     const data = await axios
  //       .post(
  //         "https://datacenter.visualkgroup.com:58346/b1s/v1/Login",
  //         JSON.stringify(jsonusuario),
  //         {
  //           withCredentials: true,
  //         }
  //       )
  //       .catch(function (error) {
  //         // respuesta del servidor error
  //         if (error.response) {
  //           console.log("error: ", error.response);
  //           // ERROR
  //           // Arreglo de Log
  //           setLogArr([
  //             ...logArr,
  //             logFuncion(
  //               "",
  //               "Error en Login",
  //               error.response.config.method,
  //               error.response.status,
  //               error.response.statusText,
  //               error.response.data.error.message.value
  //             ),
  //           ]);
  //         }
  //       });

  //     setCookies(data.data);
  //     setSession(data.data.SessionId);
  //     obtenerClientes();
  //     // console.log("data", data);

  //     // Succes
  //     // Arreglo de Log
  //     setLogArr([
  //       ...logArr,
  //       logFuncion(
  //         usuario,
  //         "Succes Login",
  //         data.config.method,
  //         data.status,
  //         data.statusText,
  //         "Succes"
  //       ),
  //     ]);
  //     // repocicionar al usuario
  //     router.push("/prime");
  //   } catch (error) {
  //     // sin los registros
  //   }
  // };

  // async function axiosLogin() {
  //   // cookie_header = document.getElementById("cookie_data");
  //   const usuarioApi = {
  //     CompanyDB: "VISUALK_CL",
  //     UserName: "postulante3",
  //     Password: "123qwe",
  //   };

  //   const url = "https://datacenter.visualkgroup.com:58346/b1s/v1/Login";

  //   try {
  //     await fetch(url, {
  //       method: "POST", // or 'PUT'
  //       body: JSON.stringify(usuarioApi), // data can be `string` or {object}!
  //       credentials: "same-origin",
  //     })
  //       .then((res) => res.json())
  //       .catch((error) => console.error("Error:", error))
  //       .then(function (response) {
  //         //   console.log("resous", response);
  //         // cookie_header.innerHTML = response.SessionId;
  //         // console.log("dentro de fech post", cookie_header.textContent);
  //       });

  //     // let cookies = document.cookie;
  //     console.log("los cookies", document.cookie);
  //   } catch (error) {}
  // }

  // obtener los socios del usuario
  const obtenerClientes = async () => {
    try {
      const data = await axios(
        // `https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners('CS001')`,
        `https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners?$select=CardCode,CardName,CardType,FederalTaxID,AdditionalID&$filter=startswith(AdditionalID, 'postulante3')`,
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
              "Error en Dashboard",
              error.response.config.method,
              error.response.status,
              error.response.statusText,
              error.response.data.error.message.value
            ),
          ]);
        }
      });

      // setear la respuesta filtro
      setClientes(data.data.value);

      // Succes
      // Arreglo de Log
      setLogArr([
        ...logArr,
        logFuncion(
          usuario,
          "Succes Dashboard",
          data.config.method,
          data.status,
          data.statusText,
          "Succes"
        ),
      ]);
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

  // creacion del socio
  const creacionSocio = async (jsonsocio) => {
    try {
      const data = await axios
        .post(
          "https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners",
          JSON.stringify(jsonsocio),
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
                "Error Creacion Socio",
                error.response.config.method,
                error.response.status,
                error.response.statusText,
                error.response.data.error.message.value
              ),
            ]);
          }
        });

      console.log("creacion hecha");

      // Succes
      // Arreglo de Log
      setLogArr([
        ...logArr,
        logFuncion(
          usuario,
          "Succes Creacion",
          data.config.method,
          data.status,
          data.statusText,
          "Succes"
        ),
      ]);

      console.log("creacion: ", data);

      // obtenerClientes();

      // repocicionar al usuario
      // router.push("/prime");
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
        axiosLogin,
        obtenerClientes,
        creacionSocio,
        obtenerBuscador,
        editarSocio,
        buscador,
        logArr,
        // obtenerLogServer,
        obteneritem,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
