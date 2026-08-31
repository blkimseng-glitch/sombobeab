import type { Metadata } from "next";
import {
  Playfair_Display,
  Poppins,
  Dancing_Script,
  Kantumruy_Pro,
  Moul, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const dancing = Dancing_Script({ 
  subsets: ["latin"], 
  variable: "--font-dancing" 
});

const khmer = Kantumruy_Pro({ 
  subsets: ["khmer", "latin"], 
  variable: "--font-khmer" 
});

export const metadata: Metadata = {
  title: "Foodeza — Good Food For Good Health",
  description: "Eat healthy, live healthy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`${playfair.variable} ${poppins.variable} ${dancing.variable} ${khmer.variable} bg-[#FFFDF9] font-sans text-neutral-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}