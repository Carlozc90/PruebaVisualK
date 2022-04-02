import axios from "axios";
import { useEffect } from "react";
import Login from "../components/Login";
import Layout from "../layout/Layout";

export default function Home() {
  return (
    <div>
      <Layout>
        <Login />
      </Layout>
    </div>
  );
}

// export async function getServerSideProps() {
//   const params = JSON.stringify({
//     CompanyDB: "VISUALK_CL",
//     UserName: "postulante3",
//     Password: "123qwe",
//   });

//   const url = "https://datacenter.visualkgroup.com:58346/b1s/v1/Login";
//   const respuesta = await axios.post(url, params, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   respuesta.data.data; // '{"answer":42}'
//   respuesta.data.headers["Content-Type"]; // 'application/json',
//   // const resultado = await respuesta.json();

//   // console.log(respuesta);

//   return { props: {} };
// }

// container mx-auto md:grid md:grid-cols-2 mt-12 gap-12 p-5 items-center
