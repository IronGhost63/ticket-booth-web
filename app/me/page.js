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
    <Layout>
      <div className="flex min-h-screen items-center justify-centerfont-sans">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-[5rem]">Hello World</h1>
        </main>
      </div>
    </Layout>
  )
}
