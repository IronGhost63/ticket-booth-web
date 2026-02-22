"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ImHome, ImDrawer, ImShuffle, ImExit } from "react-icons/im";

export default function Layout ({children, className}) {
  const pathName = usePathname();

  return (
    <div className={`dashboard-layout ${className || ""}`}>
      <div className="dashboard-sidebar">
        <h1 className="sidebar-title">Admin</h1>
        <ul className="dashboard-menu">
          <li className="dashboard-menu-item">
            <Link href="/dashboard" className={`dashboard-menu-link ${pathName === '/dashboard' ? 'active' : ''}`}>
              <span className="icon"><ImHome/></span> <span className="label">Home</span>
            </Link>
          </li>
          <li className="dashboard-menu-item">
            <Link href="/dashboard/history" className={`dashboard-menu-link ${pathName === '/dashboard/history' ? 'active' : ''}`}>
              <span className="icon"><ImDrawer/></span> <span className="label">History</span>
            </Link>
          </li>
          <li className="dashboard-menu-item">
            <Link href="/dashboard/switch" className="dashboard-menu-link">
              <span className="icon"><ImShuffle/></span> <span className="label">Switch user</span>
            </Link>
          </li>
          <li className="dashboard-menu-item mt-auto">
            <Link href="/signout" className="dashboard-menu-link">
              <span className="icon"><ImExit/></span> <span className="label">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="dashboard-content">
        {children}
      </div>
    </div>
  )
};
