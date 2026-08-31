"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

export default function Navbar() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Menu", href: "/menu" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* 1. Logo */}
        <Link href="" className="flex items-center space-x-2">
          <span className="text-xl mr-4.5 font-fantacy tracking-tight text-primary">
           
            Sombobeab
          </span>
        </Link>

        {/* 2. Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* 3. Desktop Sign In Button */}
        <div className="hidden mr-4.5 md:flex items-center">
          <Button  variant="default" size="sm">
            <Link href="/signin">Sign In</Link>
          </Button>
        </div>

        {/* 4. Mobile Menu Toggle */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger >
              <Button variant="outline" size="icon" aria-label="Open Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="text-left font-bold">Navigation</SheetTitle>
              <div className="flex flex-col gap-4 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <hr className="my-2" />
                <Button  className="w-full">
                  <Link href="/signin">Sign In</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}