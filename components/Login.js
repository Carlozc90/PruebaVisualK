import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login = () => {
  const {
    usuario,
    setUsuario,
    password,
    setPassword,
    setUser,
    obtenerCookies,
    user,
    cookies,
  } = useAuth();
  const router = useRouter();

  const handleAuth = (e) => {
    e.preventDefault();

    if ([usuario, password].includes("")) {
      console.log("Todos los Campos son obligatorias");
      return;
    }

    // autentificar el usuario
    const usuarioApi = {
      CompanyDB: "VISUALK_CL",
      UserName: usuario,
      Password: password,
    };

    // peticion de la api cookis
    obtenerCookies(usuarioApi);

    // router.push("/prime");
  };

  useEffect(() => {
    console.log("hay cookies", cookies);
  }, [cookies]);

  return (
    <main className=" bg-slate-300 h-screen mx-auto grid grid-cols-2 gap-12 px-[80px] pb-32 items-center">
      <div className=" ">
        <h1 className="text-orange-400 font-black text-6xl text-center">
          Inicia Sesion y Administra tus{" "}
          <span className="text-black">VisualK Group</span>
        </h1>
      </div>
      <div className="mt-20 shadow-lg px-5 py-10 bg-slate-50 rounded-xl">
        <form onSubmit={handleAuth}>
          <div>
            <label className="uppercase text-gray-500 block text-xl font-bold">
              Usuario
            </label>
            <input
              type="text"
              placeholder="Su usuario"
              className=" border w-full p-3 mt-3 bg-gray-50 "
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>
          <div>
            <label className="uppercase text-gray-500 block text-xl font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Tu Password"
              className=" border w-full p-3 mt-3 bg-gray-50 "
              value={password}
              onChange={(e) => setPassword(e.target.value) || ""}
            />
          </div>

          <button
            type="submit"
            value="Iniciar Sesion"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold my-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          >
            Iniciar Sesion
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
