import Buscador from "../components/Buscador";
import Clientes from "../components/Clientes";
import EditarCliente from "../components/EditarCliente";
import NuevoCliente from "../components/NuevoCliente";
import VerCliente from "../components/VerCliente";
import useAuth from "../hooks/useAuth";
import Layout from "../layout/Layout";

export default function Prime() {
  const { verCliente, verEditar, verCrear, verBuscador } = useAuth();
  return (
    <Layout>
      {verCliente ? (
        // ver cliente es true
        <VerCliente />
      ) : verEditar ? (
        // ver editar es true
        <EditarCliente />
      ) : verCrear ? (
        // ver Crear es true
        <NuevoCliente />
      ) : verBuscador ? (
        // ver Buscador
        <Buscador />
      ) : (
        <Clientes />
      )}
    </Layout>
  );
}
