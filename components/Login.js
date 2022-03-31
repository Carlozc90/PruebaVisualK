import useAuth from "../hooks/useAuth";

const Login = () => {
  const { email, setEmail, password, setPassword } = useAuth();

  const handleInicio = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };
  return (
    <>
      <div className=" ">
        <h1 className="text-orange-400 font-black text-6xl text-center">
          Inicia Sesion y Administra tus{" "}
          <span className="text-black">VisualK Group</span>
        </h1>
      </div>
      <div className="mt-20 shadow-lg px-5 py-10 bg-slate-50 rounded-xl">
        <form onSubmit={handleInicio}>
          <div>
            <label className="uppercase text-gray-500 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email de Registro"
              className=" border w-full p-3 mt-3 bg-gray-50 "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
    </>
  );
};

export default Login;
