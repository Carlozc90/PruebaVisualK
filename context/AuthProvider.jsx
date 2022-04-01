import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({ id: "", key: "" });

  const [verCliente, SetVerCliente] = useState(false);
  const [cliente, SetCliente] = useState({});

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
      id: 1,
    },
    {
      nombre: "Carlos2",
      empresa: "netplay4",
      email: "Carlozc90@gmail.com2",
      telefono: "12222222",
      descripcion:
        "rum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officii",
      direccion: "8333 NW 53rd St. Doral, FL 33166.",
      id: 2,
    },
  ];

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        user,
        setUser,
        laApi,
        verCliente,
        SetVerCliente,
        cliente,
        SetCliente,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;