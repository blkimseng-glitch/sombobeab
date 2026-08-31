"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Import component Image
import { Menu as MenuIcon, X } from "lucide-react";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-cream/90 backdrop-blur">
      <nav className="container-x flex h-20 items-center justify-between">
      
        <Link href="/" className="flex items-center gap-2">

          <Image
            src="/img/sombobeab.png"
            alt="Foodeza Logo"
            width={250} 
            height={70} 
            className="h-10 w-20 object-contain" 
            priority 
          />
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm font-medium text-neutral-700 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="#contact"
          className="hidden rounded-full bg-primary px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark lg:inline-flex"
        >
          កក់ឥឡូវនេះ
        </Link>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="បើក/បិទមឺនុយ"
        >
          {open ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-black/5 bg-cream px-6 pb-6 pt-2 lg:hidden">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-primary/10 hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-3 flex w-full justify-center rounded-full bg-primary px-7 py-3 text-sm font-medium text-white"
          >
            កក់ឥឡូវនេះ
          </Link>
        </div>
      )}
    </header>
  );
}