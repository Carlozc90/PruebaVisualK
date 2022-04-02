export default function handler(req, res) {
  res.status(200).json({
    nombre: "Carlos",
    empresa: "netplay2",
    email: "Cc90@gmail.com",
    telefono: "9813",
    id: 1,
  });
}

// const data = await axios.post(
//   "https://datacenter.visualkgroup.com:58346/b1s/v1/Login",
//   JSON.stringify({
//     CompanyDB: "VISUALK_CL",
//     UserName: "postulante3",
//     Password: "123qwe",
//   })
//   // { headers: { "content-type": "application/json" } }
// );
// setCookies(data.data);
// //   return data;
// // setCookies{data};
// } catch (error) {
// console.log(error);
// }
