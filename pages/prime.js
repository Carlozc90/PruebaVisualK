import Clientes from "../components/Clientes";
import EditarCliente from "../components/EditarCliente";
import VerCliente from "../components/VerCliente";
import useAuth from "../hooks/useAuth";
import Layout from "../layout/Layout";

export default function Prime() {
  const { verCliente, verEditar } = useAuth();
  return (
    <Layout>
      {verCliente ? (
        <VerCliente />
      ) : verEditar ? (
        <EditarCliente />
      ) : (
        <Clientes />
      )}
    </Layout>
  );
}
