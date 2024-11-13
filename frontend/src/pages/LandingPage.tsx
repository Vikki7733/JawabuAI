import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import CategoryRow from "../components/CategoryRow";
import SocialProof from "../components/SocialProof";
import OfferSection from "../components/OfferSection";
import "../styles/LandingPage.css";
import LoginCard from "../components/authentication/LoginCard";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";

const LandingPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const handleLogin = () => setShowLogin(true);
  const location = useLocation(); // To get the state passed during navigation

  useEffect(() => {
    if (location.state?.scrollToOffer) {
        // Wait until the component is rendered and then scroll
        setTimeout(() => {
            const offerSection = document.getElementById("offer-section");
            if (offerSection) {
                offerSection.scrollIntoView({ behavior: "smooth" });
            }
        }, 100); // Adding timeout to ensure rendering happens before scroll
    }
}, [location]);

  return (
    <div className="landing-page">
<Header onLoginClick={handleLogin} />

      <section className="section hero-section">
        <HeroSection />
      </section>

      <section className="section category-section">
        <CategoryRow />
      </section>

      <section className="section social-section">
        <SocialProof />
      </section>

      <section className="section offer-section">
        <OfferSection />
      </section>

      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <LoginCard /> {/* LoginCard with close option */}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
