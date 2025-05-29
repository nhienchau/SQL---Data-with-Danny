
import { ThemeToggle } from "@/components/theme-toggle";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

function Header () {
  return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <div className="font-bold text-xl flex-none">
            <Link href="/">Portfolio</Link>
          </div>
          <nav className="hidden md:flex gap-6 justify-center flex-1 mx-4">
          </nav>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-3 flex-none">
          </div>
        </div>
    </header>
  );
}

export default Header; 