// src/components/HeroSection.tsx
import React from "react";
import "../styles/components/HeroSection.css";
import heroImage from "../assets/learn-new.jpg"

const HeroSection = () => {
  return (
    <section className="hero-section">

<img className="hero-image" src={heroImage} alt="Hero" />
      <p className="mb-4">Interactive problem solving that’s effective and fun.<br /> Get smarter in 15 minutes a day.</p>
      <button className="get-started">Get started</button>
    </section>
  );
};

export default HeroSection;