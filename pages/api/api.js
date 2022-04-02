export default async function handler(req, res) {
  var url = "https://datacenter.visualkgroup.com:58346/b1s/v1/Login";
  var data = {
    CompanyDB: "VISUALK_CL",
    UserName: "postulante3",
    Password: "123qwe",
  };

  fetch(url, {
    method: "POST", // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => console.log("Success:", response));

  res.status(200).json(Api.resources);
}
