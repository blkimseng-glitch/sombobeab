import About from '@/components/AboutComponent';
import Navbar from '@/components/NavbarComponent';
import Footer from '@/components/FooterComponent';
import React from 'react'

export default function AboutPage() {
  return (
    <>
        <Navbar/>
    <main>
         <About/>
    </main>
    <Footer/>
    </>

   
  )
}