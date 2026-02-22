"use client"

import { useEffect, useState } from "react";
import { redirect, RedirectType } from "next/navigation";
import { isLoggedIn, isAdmin } from "@/app/lib/api";
import Link from "next/link";
import Layout from "@/app/ui/layout/main";

export default function Page() {
  const [view, setView] = useState('profile');
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    if ( !isLoggedIn() ) {
      redirect("/signin", RedirectType.replace);
    }

    setIsAdminUser( isAdmin() )
  }, []);

  return (
    <Layout className="account-screen">
      <main>
        <div className="main-container">
          <h1 className="text-5xl font-medium text-center mb-6">My Account</h1>
          <ul className="user-menu">
            <li className="user-menu-item">
              <button className="user-menu-button button outlined dark" onClick={() => setView('profile')}>Profile</button>
            </li>
            <li className="user-menu-item">
              <button className="user-menu-button button outlined dark" onClick={() => setView('tickets')}>Tickets</button>
            </li>
            {isAdminUser && (
              <li className="user-menu-item">
                <Link href="/dashboard" className="user-menu-button button outlined dark">Admin</Link>
              </li>
            )}
            <li className="user-menu-item">
              <Link href="/signout" className="user-menu-button button outlined dark">Sign out</Link>
            </li>
          </ul>
          <div className="content">
            {view === 'profile' && (
              <div>
                Profile view
              </div>
            )}
            {view === 'tickets' && (
              <div>
                Tickets view
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  )
}
