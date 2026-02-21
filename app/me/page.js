"use client"

import { useEffect } from "react";
import { redirect, RedirectType } from "next/navigation";
import { isLoggedIn } from "@/app/lib/api";
import Layout from "@/app/ui/layout/main";

export default function Page() {
  useEffect(() => {
    if ( !isLoggedIn() ) {
      redirect("/signin", RedirectType.replace);
    }
  }, []);

  return (
    <Layout className="account-screen">
      <main>
        <div className="main-container">
          <h1 className="text-5xl font-medium text-center mb-6">My Account</h1>

        </div>
      </main>
    </Layout>
  )
}
