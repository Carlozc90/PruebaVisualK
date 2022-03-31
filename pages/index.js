import Head from "next/head";
import Login from "../components/Login";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Test Prueba" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" bg-slate-300 h-screen mx-auto grid grid-cols-2">
        <Login />
      </main>
    </div>
  );
}
