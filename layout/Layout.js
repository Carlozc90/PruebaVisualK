import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Head from "next/head";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  const router = useRouter();

  const {
    user,
    setVerCliente,
    setVerEditar,
    setCliente,
    setVerCrear,
    setVerBuscardor,
    setVerLog,
  } = useAuth();

  // useEffect(() => {
  //   if (Object.values(user).includes("")) {
  //     //   router.push("/");
  //     console.log("esta vacio paso");
  //     return;
  //   }
  //   console.log("contiene algo");
  // }, [router, user]);

  return (
    <>
      <Head>
        <title>CRM Socios</title>
        <meta name="description" content="Test Prueba" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* {children} */}

      {router.pathname === "/prime" ? (
        <div className="flex">
          <aside className=" w-1/5 bg-blue-700 px-5 py-10">
            <h2 className="text-4xl font-black text-center text-white">
              CRM - Socios
            </h2>
            <nav className="mt-10">
              <Link href={"/prime"}>
                <a
                  onClick={() => {
                    setVerCliente(false);
                    setVerEditar(false);
                    setVerCrear(false);
                    setVerBuscardor(false);
                    setVerLog(false);
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
                  }}
                  className="text-gray-200 hover:text-white block mt-2 text-2xl font-medium "
                >
                  Buscador
                </a>
              </Link>
            </nav>
            <div className="mt-56">
              <Link href={"/prime"}>
                <a
                  onClick={() => {
                    setVerCliente(false);
                    setVerEditar(false);
                    setVerCrear(false);
                    setVerBuscardor(false);
                    setVerLog(true);
                  }}
                  className="text-gray-200 hover:text-white block mt-2 text-2xl font-medium "
                >
                  Registro Log
                </a>
              </Link>
            </div>
          </aside>

          <main className="w-4/5 p-10 h-screen overflow-y-scroll">
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
