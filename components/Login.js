import React from "react";

const Login = () => {
  return (
    <>
      <div className="">
        <h1 className="text-orange-400 font-black text-6xl">
          Inicia Sesion y Administra tus{" "}
          <span className="text-black">VisualK Group</span>
        </h1>
      </div>
      <div className="">
        <form>
          <div>
            <label className="uppercase text-gray-500 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email de Registro"
              className=" border w-full p-3 mt-3 bg-gray-50 "
            />
          </div>
        </form>
      </div>
    </>
  );
};

{
  /* <label className="uppercase text-gray-600 block text-xl font-bold">
Email
</label>
<input
type="email"
placeholder="Email de Registro"
className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" */
}

export default Login;
