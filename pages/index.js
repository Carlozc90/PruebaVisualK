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

// container mx-auto md:grid md:grid-cols-2 mt-12 gap-12 p-5 items-center
