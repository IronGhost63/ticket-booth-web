"use client"

import { useState } from 'react';
import Layout from "@/app/ui/layout/dashboard";
import Stats from "./components/stats";
import ListConcert from "./components/list-concert";
import CreateConcert from "./components/create-concert";

export default function Page() {
  const [view, setView] = useState('list');

  return (
    <Layout className="dashboard">
      <Stats/>
      <div className="manage-concerts">
        <ul className="manage-concerts-menu">
          <li className="menu-item">
            <buttom className={`menu-button ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>Overview</buttom>
          </li>
          <li className="menu-item">
            <buttom className={`menu-button ${view === 'create' ? 'active' : ''}`} onClick={() => setView('create')}>Create</buttom>
          </li>
        </ul>
        {view === 'list' && (
          <ListConcert />
        )}
        {view === 'create' && (
          <CreateConcert />
        )}
      </div>
    </Layout>
  );
}
