const Log = ({ log }) => {
  const { status, body, type, fecha } = log;
  return (
    <tr className="border-b text-center">
      <td className="p-3">{status}</td>
      <td className="p-3">{type}</td>
      <td className="p-3">{fecha}</td>
      <td className="p-3">
        <button
          type="submit"
          value="Iniciar Sesion"
          className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold my-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
        >
          Ver Body
        </button>
      </td>
    </tr>
  );
};

export default Log;
