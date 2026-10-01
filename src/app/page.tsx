import Footer from "./_components/shared/Footer";
import Header from "./_components/shared/Header";
import Hero from "./_components/sections/Hero";
import ABFStats from "./_components/sections/ABFStats";
import Services from "./_components/sections/Services";
import Contact from "./_components/sections/Contact";
import AboutABF from "./_components/sections/AboutABF";
import HowABFWorks from "./_components/sections/HowABFWork";
import FAQ from "./_components/sections/FAQ";

export default function Home() {
  return (
    <>
      <div
        className="absolute w-full h-240 top-0 -z-50 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 78% 24%,rgba(212, 167, 44, 0.10) 0, transparent 40%),
      radial-gradient(circle at 15% 15%,rgba(20, 83, 45, 0.10) 0, transparent 35% )`,
        }}
      />

      {/* ===== All home page sections here ===== */}
      <Header />
      <Hero />
      <AboutABF />
      <ABFStats />
      <HowABFWorks/>
      <Services />
      <FAQ/>
      <Contact />
      <Footer />
    </>
  );
}
