const Log = ({ log }) => {
  const { status, usuario, type, fecha, funcion } = log;
  return (
    <tr className="border-b text-center">
      <td className="p-2">{status}</td>
      <td className="p-2">{type}</td>
      <td className="p-2">{fecha}</td>
      <td className="p-2">{funcion}</td>
      <td className="p-2">{usuario}</td>
    </tr>
  );
};

export default Log;
