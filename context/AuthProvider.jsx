import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();
axios.defaults.withCredentials = true;

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
    // const clientesActualizado = clientes.filter((item) => item.id !== id);
    // setClientes(clientesActualizado);
    eliminarSocio();
  };

  const router = useRouter();

  // obtener las coockies
  const obtenerCookies = async (jsonusuario) => {
    try {
      const { data } = await axios
        .post(
          "https://datacenter.visualkgroup.com:58346/b1s/v1/Login",
          JSON.stringify(jsonusuario),
          {
            withCredentials: false,
          }
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
      console.log(cookies);

      // repocicionar al usuario
      router.push("/prime");
    } catch (error) {
      console.log(error);
    }
  };

  // async function obtenerCookies() {
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
      const { data } = await axios(
        // `https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners('CS001')`,
        `https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners?$select=CardCode,CardName,CardType,FederalTaxID,AdditionalID&$filter=startswith(AdditionalID, 'postulante3')`
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

  // editar socio ERROR
  const editarSocio = async (cardcode, jsonmodificado) => {
    // try {
    //   const { data } = await axios
    //     .patch(
    //       `https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners('CS001')`,
    //       {
    //         withCredentials: true,
    //       },
    //       JSON.stringify({ CardName: "Carlos(2)" })
    //     )
    //     .catch(function (error) {
    //       // respuesta del servidor error
    //       if (error.response) {
    //         console.log(error.response.data);
    //       }
    //     });
    //   // setear la respuesta filtro
    //   console.log("axios patch ");
    // } catch (error) {
    //   console.log(error);
    // }
    // try {
    //   const { data } = await axios
    //     .patch(
    //       `https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners('${cardcode}')`,
    //       JSON.stringify(jsonmodificado),
    //       { withCredentials: true }
    //     )
    //     .catch(function (error) {
    //       // respuesta del servidor error
    //       if (error.response) {
    //         console.log(error.response.data);
    //       }
    //     });
    //   console.log("modificado");
    //   // // repocicionar al usuario
    //   // router.push("/prime");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // eliminando socio
  const eliminarSocio = async () => {
    console.log("eliminando");
    try {
      const { data } = await axios
        .delete(
          `https://datacenter.visualkgroup.com:58346/b1s/v1/BusinessPartners('CS003')`
        )
        .catch(function (error) {
          // respuesta del servidor error
          if (error.response) {
            console.log(error.response.data);
          }
        });

      // setear la respuesta filtro
      // console.log("eliminado con exito");
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
        editarSocio,
        buscador,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
