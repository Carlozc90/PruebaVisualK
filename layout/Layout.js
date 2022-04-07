import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import Head from "next/head";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {
  const { getSqlAxios } = useAuth();
  const [burger, setBurger] = useState();
  const router = useRouter(false);
  const {
    auth,
    user,
    setVerCliente,
    setVerEditar,
    setCliente,
    setVerCrear,
    setVerBuscardor,
    setVerLog,
    setMostrarPanel,
  } = useAuth();

  useEffect(() => {
    !auth && router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const handleMenu = () => {
    console.log("click");
    setBurger(!burger);
  };

  return (
    <>
      <Head>
        <title>CRM Socios</title>
        <meta name="description" content="Test Prueba" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* {children} */}

      {router.pathname === "/prime" ? (
        <div className="md:flex ">
          <aside className=" md:w-1/5 bg-blue-700 px-5 py-10">
            <h2 className="text-4xl font-black text-center text-white">
              VisualK Socios
            </h2>
            <button
              className="mt-6 md:hidden w-full flex justify-center"
              onClick={handleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-menu-2"
                width="52"
                height="52"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
            <div
              className={`text-center md:text-left md:flex flex-col ${
                burger ? "" : "hidden "
              }`}
            >
              <nav className="mt-10">
                <Link href={"/prime"}>
                  <a
                    onClick={() => {
                      setVerCliente(false);
                      setVerEditar(false);
                      setVerCrear(false);
                      setVerBuscardor(false);
                      setVerLog(false);
                      setMostrarPanel(false);
                      setBurger(false);
                    }}
                    className="text-gray-200 hover:text-white block mt-2 text-2xl font-medium "
                  >
                    Dashboard
                  </a>
                </Link>
                <Link href={"/prime"}>
                  <a
                    onClick={() => {
                      setVerCliente(false);
                      setVerEditar(false);
                      setVerBuscardor(false);
                      setVerCrear(true);
                      setVerLog(false);
                      setBurger(false);
                      // limpar el arreglo
                      setCliente({});
                    }}
                    className="text-gray-200 hover:text-white block mt-2 text-2xl font-medium "
                  >
                    Nuevo Socio
                  </a>
                </Link>
                <Link href={"/prime"}>
                  <a
                    onClick={() => {
                      setVerCliente(false);
                      setVerEditar(false);
                      setVerCrear(false);
                      setVerBuscardor(true);
                      setVerLog(false);
                      setBurger(false);
                    }}
                    className="text-gray-200 hover:text-white block mt-2 text-2xl font-medium "
                  >
                    Buscador
                  </a>
                </Link>
              </nav>
              <div className="">
                <Link href={"/prime"}>
                  <a
                    onClick={() => {
                      setVerCliente(false);
                      setVerEditar(false);
                      setVerCrear(false);
                      setVerBuscardor(false);
                      setVerLog(true);
                      setBurger(false);
                      getSqlAxios();
                    }}
                    className="text-gray-200 hover:text-white block mt-2 text-2xl font-medium "
                  >
                    Registro Log
                  </a>
                </Link>
              </div>
            </div>
          </aside>

          <main className="md:w-4/5 p-10 h-screen md:overflow-y-scroll">
            {children}
          </main>
        </div>
      ) : (
        <div>{children}</div>
      )}

      <ToastContainer />
    </>
  );
};

export default Layout;
