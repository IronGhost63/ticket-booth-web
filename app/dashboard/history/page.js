'use client'

import { useState, useEffect } from 'react';
import Layout from "@/app/ui/layout/dashboard";
import { isLoggedIn, isAdmin } from "@/app/lib/api";

export default function Page() {
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    if ( !isLoggedIn() ) {
      redirect("/signin", RedirectType.replace);
    }

    setIsAdminUser( isAdmin() )
  }, []);

  return (
    <Layout className="dashboard" isAdmin={isAdminUser}>
      Hello World
    </Layout>
  );
}
