// src/app/(public)/page.tsx  ← o src/app/page.tsx si la landing es la raíz
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/landing/hero-section";
import ToursSection from "@/components/landing/tours-section";
import InscripcionSection from "@/components/landing/inscripcion-section";
import FloorPlansSection from "@/components/landing/floor-plans-section";
 
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        
        <HeroSection />
        <ToursSection />
        <FloorPlansSection />
        <InscripcionSection />
      </main>
      <Footer />
    </>
  );
}
 