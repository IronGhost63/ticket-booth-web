"use client"

import { useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import Layout from "@/app/ui/layout/blank";

export default function Page() {
  useEffect(() => {
    Cookies.remove('token');
  }, []);

  return (
    <Layout className="logout-screen">
      <main>
        <div className="main-container">
          <h1 className="page-title text-center">Sign out</h1>
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
