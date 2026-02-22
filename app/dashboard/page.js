"use client"

import { useState, useEffect } from 'react';
import { redirect, RedirectType } from "next/navigation";
import Layout from "@/app/ui/layout/dashboard";
import Stats from "./components/stats";
import ListConcert from "./components/list-concert";
import CreateConcert from "./components/create-concert";
import UserPanel from "@/app/dashboard/components/user-panel";
import { isLoggedIn, isAdmin } from "../lib/api";

export default function Page() {
  const [view, setView] = useState('list');
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    if ( !isLoggedIn() ) {
      redirect("/signin", RedirectType.replace);
    }

    setIsAdminUser( isAdmin() )
  }, []);
  return (
    <Layout className="dashboard" isAdmin={isAdminUser}>
      {isAdminUser && (
        <div>
          <Stats/>
          <div className="manage-concerts">
            <ul className="manage-concerts-menu">
              <li className="menu-item">
                <button className={`menu-button ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>Overview</button>
              </li>
              <li className="menu-item">
                <button className={`menu-button ${view === 'create' ? 'active' : ''}`} onClick={() => setView('create')}>Create</button>
              </li>
            </ul>
            {view === 'list' && (
              <ListConcert />
            )}
            {view === 'create' && (
              <CreateConcert />
            )}
          </div>
        </div>
      )}
      {!isAdminUser && (
        <UserPanel />
      )}
    </Layout>
  );
}
