"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { navLinks } from "@/lib/data";

const serviceLinks = ["Food Catering", "Fast Delivery", "Event Booking", "Gift Cards"];

export default function Footer() {
  return (
    <footer className="mt-16 bg-emerald-950 text-emerald-50">
      {/* ផ្នែកខាងលើ៖ Content ទាំង ៤ ជួរ */}
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        
        {/* 1. Brand Logo & Description */}
        <div className="space-y-4">
          <Link href="/" className="inline-block">
            <Image
              src="/img/sombobeab.png"
              alt="sombobeab Logo"
              width={160}
              height={60}
              className="h-12 w-auto object-contain brightness-110 drop-shadow-md"
              priority
            />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-emerald-100/70">
            គ្រឿងផ្សំស្រស់ៗ រសជាតិឆ្ងាញ់ និងមានអនាម័យខ្ពស់ — ដឹកជញ្ជូនរហ័សទាន់ចិត្តដល់ផ្ទះរបស់អ្នក។
          </p>
        </div>

        {/* 2. Quick Links */}
        <div>
          <h3 className="text-base font-semibold tracking-wide text-white">Links</h3>
          <ul className="mt-4 space-y-2.5">
            {navLinks.slice(0, 5).map((l) => (
              <li key={l.label}>
                <Link 
                  href={l.href} 
                  className="text-sm text-emerald-100/70 transition-colors duration-200 hover:text-emerald-300"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Our Services */}
        <div>
          <h3 className="text-base font-semibold tracking-wide text-white">សេវាកម្មរបស់យើង</h3>
          <ul className="mt-4 space-y-2.5">
            {serviceLinks.map((s) => (
              <li key={s}>
                <a 
                  href="#services" 
                  className="text-sm text-emerald-100/70 transition-colors duration-200 hover:text-emerald-300"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. Contact Info */}
        <div>
          <h3 className="text-base font-semibold tracking-wide text-white">ព័ត៌មានទំនាក់ទំនង</h3>
          <ul className="mt-4 space-y-3.5 text-sm text-emerald-100/80">
            <li className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-800/60 text-emerald-300">
                <MapPin size={16} />
              </span>
              <span className="mt-1">រាជធានីភ្នំពេញ, ប្រទេសកម្ពុជា</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-800/60 text-emerald-300">
                <Phone size={16} />
              </span>
              <span>+855 12 345 678</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-800/60 text-emerald-300">
                <Mail size={16} />
              </span>
              <span>info@sombobeab.com</span>
            </li>
          </ul>
        </div>

      </div>

      {/* ផ្នែកខាងក្រោម៖ Copyright */}
      <div className="border-t border-emerald-900/60 bg-emerald-950/80">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-emerald-200/50 sm:flex-row">
          <p>© {new Date().getFullYear()} sombobeab. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-emerald-400">💚</span> for good health.
          </p>
        </div>
      </div>
    </footer>
  );
}