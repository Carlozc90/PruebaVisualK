export default function handler(req, res) {
  res.status(200).json(
    {
      nombre: "Carlos",
      empresa: "netplay2",
      email: "Carlozc90@gmail.com",
      telefono: "9876543213",
      id: 1,
    },
    {
      nombre: "Carlos2",
      empresa: "netplay4",
      email: "Carlozc90@gmail.com2",
      telefono: "12222222",
      id: 2,
    }
  );
}
