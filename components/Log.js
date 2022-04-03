const Log = ({ log }) => {
  const { nombre, peticion, estado, fecha, statuslog, info } = log;
  return (
    <tr className="border-b text-center">
      <td className="p-3">{nombre}</td>
      <td className="p-3">{peticion}</td>
      <td className="p-3">{estado}</td>
      <td className="p-3">{fecha}</td>
      <td className="p-3">{statuslog}</td>
      <td className="p-3">{info}</td>
    </tr>
  );
};

export default Log;
