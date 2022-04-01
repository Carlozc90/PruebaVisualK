import Clientes from "../components/Clientes";
import VerCliente from "../components/VerCliente";
import useAuth from "../hooks/useAuth";
import Layout from "../layout/Layout";

export default function Prime() {
  const { verCliente } = useAuth();
  return <Layout>{!verCliente ? <Clientes /> : <VerCliente />}</Layout>;
}
