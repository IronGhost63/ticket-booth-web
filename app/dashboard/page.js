import Layout from "@/app/ui/layout/dashboard";
import Stats from "./components/stats";

export default function Page() {
  return (
    <Layout className="dashboard">
      <Stats/>
    </Layout>
  );
}
