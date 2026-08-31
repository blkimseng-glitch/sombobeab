


import { ProductListComponent } from "@/components/ProductListComponent";
import Image from "next/image";
import Navbar from "@/components/NavbarComponent";
import Footer from "@/components/FooterComponent";

export default function Home() {
  return (
    <>
    <Navbar/>
    <main>
        <ProductListComponent/>
    </main>
    <Footer/>
    
    </>
  
  );
}