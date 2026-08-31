import { Suspense } from "react";
import Navbar from "../components/NavbarComponent";
import Hero from "@/components/Hero";
import About from "@/components/About";
// import Services from "@/components/Services";
// import Testimonials from "@/components/Testimonials";
// import Chefs from "@/components/Chefs";
// import Newsletter from "@/components/Newsletter";
import Footer from "@/components/FooterComponent";
import Menu from "@/components/menu/Menu";
import MenuSkeleton from "@/components/menu/MenuSkeleton";

export default function Home() {
  return (
    <>
      <Navbar/>
      <main>
        <Hero />
        <About />

        <Suspense fallback={<MenuSkeleton />}>
          <Menu />
        </Suspense>
 
      </main>
      <Footer />
    </>
  );
}
