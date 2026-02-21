"use client"

import Link from "next/link";
import { isLoggedIn } from "@/app/lib/api";

export default () => (
    <header className="main-menu">
      <div className="menu-container">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-medium text-white">TicketBooth</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-white/80 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/concerts" className="text-sm text-white/80 hover:text-white transition-colors">
              Concerts
            </Link>
            <Link href="/me" className="text-sm text-white/80 hover:text-white transition-colors">
              {isLoggedIn() ? "My Account" : "Sign In"}
            </Link>
          </nav>
        </div>
      </div>
    </header>
)
