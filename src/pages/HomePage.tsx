import { useEffect } from 'react';
import Lenis from 'lenis';
import CinematicIntro from '../components/CinematicIntro';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import Benefits from '../components/Benefits';
import AboutMe from '../components/AboutMe';
import BeforeAfter from '../components/BeforeAfter';
import HowItWorks from '../components/HowItWorks';
import Colors from '../components/Colors';
import CalculatorSection from '../components/Calculator';
import QuoteRequest from '../components/QuoteRequest';
import Gallery from '../components/Gallery';
import ServiceArea from '../components/ServiceArea';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import FloatingElements from '../components/FloatingElements';

export default function HomePage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <CinematicIntro />
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Benefits />
        <AboutMe />
        <BeforeAfter />
        <HowItWorks />
        <Colors />
        <CalculatorSection />
        <QuoteRequest />
        <Gallery />
        <ServiceArea />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingElements />
    </>
  );
}
