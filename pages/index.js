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

      <main className=" bg-slate-300 h-screen mx-auto grid grid-cols-2 gap-12 px-[80px] pb-32 items-center">
        <Login />
      </main>
    </div>
  );
}

// container mx-auto md:grid md:grid-cols-2 mt-12 gap-12 p-5 items-center
