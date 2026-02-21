import Link from "next/link";
import Layout from "@/app/ui/layout/blank";

export default function Page() {
  const handleGoBack = () => {
    redirect("/", RedirectType.replace);
  }
  return (
    <Layout className="logout-screen">
      <div className="flex min-h-screen items-center justify-center font-sans">
        <div className="md:max-w-1/5 mx-auto w-full p-4">
          <h1 className="text-5xl font-medium text-center mb-6">Sign out</h1>
          <div className="input-row">
            <p className="text-center">You have been signed out.</p>
          </div>
          <div className="input-row text-center">
            <Link href="/" className="button outlined dark">Back to homepage</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
