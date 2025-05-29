import React from "react";
import Hero from './_components/hero';
import Experience from './_components/experience';
import Certificate from './_components/certificate';
import Footer from './_components/footer'; 

export default function ResumePage() {
  return (
    <div>
      <Hero />
      <Experience />
      <Certificate />
      <Footer />
    </div>
  );
}
