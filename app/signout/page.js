import Link from "next/link";
import Layout from "@/app/ui/layout/blank";

export default function Page() {
  return (
    <Layout className="logout-screen">
      <main>
        <div className="main-container">
          <h1 className="text-5xl font-medium text-center mb-6">Sign out</h1>
          <div className="input-row">
            <p className="text-center">You have been signed out.</p>
          </div>
          <div className="input-row text-center">
            <Link href="/" className="button outlined dark">Back to homepage</Link>
          </div>
        </div>
      </main>
    </Layout>
  )
}
