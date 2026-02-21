"use client"

import Link from "next/link";
import { isLoggedIn } from "@/app/lib/api";

export default () => (
    <header className="main-menu">
      <div className="menu-container">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <span className="brand">TicketBooth</span>
          </Link>

          <nav className="navigation">
            <Link href="/" className="link-item">
              Home
            </Link>
            <Link href="/concerts" className="link-item">
              Concerts
            </Link>
            <Link href="/me" className="link-item">
              {isLoggedIn() ? "My Account" : "Sign In"}
            </Link>
          </nav>
        </div>
      </div>
    </header>
)
