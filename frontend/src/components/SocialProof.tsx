import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebook, FaInstagram, FaStar, FaTwitter } from 'react-icons/fa'; 
import '../styles/components/SocialProof.css';
import iosLogo from "../assets/logo-editor-choice.png"; 

const reviews = [
  {
    name: 'Lawda Lewis',
    role: 'High school',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    text: "Interactive learning asl ilantivi endk ostnayo kuda telidu. Nice explanation samajam etu potundi kuda. Highly recommend!",
    socialLink: 'https://twitter.com/ravikumar/status/1234567890',
    socialIcon: <FaFacebook className="text-blue-500" />,
  },
  {
    name: 'Chella Joseph',
    role: 'Instructor',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    text: "The quality of the courses is outstanding. Elago meku idi chadvadaniki raadu kabatti great courses and helpful naku nachindi nen raaskutunta. Highly recommend!",
    socialLink: 'https://twitter.com/ravikumar/status/1234567890',
    socialIcon: <FaInstagram className="text-blue-500" />,
  },

];

const SocialProof = () => {
  return (
    <section className="social-proof py-5">
      <div className="container text-center">
        <h2 className="mb-4">Join over 10 million people learning on JawabuAI</h2>

        <div className="row d-flex justify-content-start align-items-center flex-nowrap">

          {/* The New York Times */}
          {reviews.map((review, index) => (
            <div key={index} className="col-lg-3">
             <div className="p-3 bg-white border border-gray-100 shadow-sm rounded-xl text-start review-card narrow-card">
             <div className="d-flex gap-2 align-items-center mb-2">
                   <img src={review.avatar} alt="user avatar" className="rounded-circle" width="36" height="36" />
                  <div>
                    <h6 className="mb-0 font-medium small-text">{review.name}</h6>
                    <p className="text-muted mb-0 tiny-text">{review.role}</p>
                  </div>
                  <a href={review.socialLink} target="_blank" rel="noopener noreferrer" className="ms-auto">
                    {review.socialIcon}
                  </a>
                </div>
                <p className="text-gray-700 small-text">{review.text}</p>
              </div>
            </div>
          ))}

          {/* 5-Star App Reviews */}
          <div className="col-auto text-center">
            <div className="d-flex align-items-center justify-content-center">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} className="text-warning" size={24} />
              ))}
            </div>
            <p className="small text-muted mb-0">Over 50,000 5-star reviews on</p>
          </div>

          {/* TrustPilot Rating */}
          <div className="col-auto text-center">
            <p className="small text-muted mb-0">TrustPilot</p>
            <div className="d-flex align-items-center justify-content-center">
              {[...Array(4)].map((_, index) => (
                <FaStar key={index} className="text-primary" size={24} />
              ))}
              <FaStar className="text-primary half-star" size={24} />
            </div>
          </div>

          {/* App of the Day */}
          <div className="col-auto">
            <img src={iosLogo} alt="App of the Day" className="media-logo" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
