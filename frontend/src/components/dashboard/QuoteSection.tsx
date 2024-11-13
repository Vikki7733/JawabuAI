import React from "react";
import quoteImage from "../../assets/curious-learn.jpg";

const QuoteSection: React.FC = () => (
  <div className="col-md-6 d-flex align-items-center justify-content-center">
    <div className="quote-image-container">
      <img src={quoteImage} alt="Background" className="quote-image" />
      <p className="quote-text">
        "Intelligence is the capacity to perceive the essential, the what is; to awaken this capacity, in oneself and in others, is education."
        <br /> - Jiddu Krishnamurti
      </p>
    </div>
  </div>
);

export default QuoteSection;
