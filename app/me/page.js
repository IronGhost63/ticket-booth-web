"use client"

import { useEffect, useState } from "react";
import { redirect, RedirectType } from "next/navigation";
import { isLoggedIn } from "@/app/lib/api";
import Link from "next/link";
import Layout from "@/app/ui/layout/main";
import ProfileView from "./components/profile-view";
import TicketsView from "./components/tickets-view";

export default function Page() {
  const [view, setView] = useState('profile');

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
          <ul className="user-menu">
            {/* <li className="user-menu-item">
              <button className="user-menu-button button outlined dark" onClick={() => setView('profile')}>Profile</button>
            </li> */}
            <li className="user-menu-item">
              <button className="user-menu-button button outlined dark" onClick={() => setView('tickets')}>Tickets</button>
            </li>
            <li className="user-menu-item">
              <Link href="/dashboard" className="user-menu-button button outlined dark">Dashboard</Link>
            </li>
            <li className="user-menu-item">
              <Link href="/signout" className="user-menu-button button outlined dark">Sign out</Link>
            </li>
          </ul>
          <div className="content">
            {view === 'profile' && (
              <ProfileView />
            )}
            {view === 'tickets' && (
              <TicketsView />
            )}
          </div>
        </div>
      </main>
    </Layout>
  )
}
