import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/components/OfferSection.css';

const OfferSection = () => {
  return (
    <section className="container my-4">
      <div className="text-center">
      <h2 className="mb-4">Subscription Plans</h2>
        <p className="mx-auto mt-3 mb-4 lead">
          Get started on our free plan and upgrade when you are ready.
        </p>
      </div>

      <div className="row row-cols-1 row-cols-lg-3 g-3 justify-content-center">
        
        {/* Free Plan Card */}
        <div className="col">
          <div className="p-3 border-light shadow rounded-3 h-100 custom-card-size">
            <div className="card-body d-flex flex-column">
              <h3 className="card-title mb-3">Free</h3>
              <div className="d-flex align-items-baseline mb-2">
                <h4 className="price mb-0">$0</h4>
                <span className="text-muted">/month</span>
              </div>
              <p className="description mb-3">Individual</p>
              <ul className="list-unstyled mb-4">
                <li className="d-flex mb-2">
                  <i className="bi bi-check mr-2"></i>
                  Access to 12,000+ top courses
                </li>
                <li className="d-flex mb-2">
                  <i className="bi bi-check mr-2"></i>
                  Certification prep
                </li>
                <li className="d-flex mb-2">
                  <i className="bi bi-check mr-2"></i>
                  Goal-focused recommendations
                </li>
              <li className="d-flex mb-2">
                  <i className="bi bi-check mr-2"></i>
                  AI-powered coding exercises
                </li>
              </ul>

              {/* Flex Container for Buttons */}
              <div className="d-flex justify-content-between mt-auto">
                <a href="/auth/login" className="btn get-started w-100">
                  Signup for free
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Basic Plan Card */}
        <div className="col">
          <div className="p-3 border-light shadow rounded-3 h-100 custom-card-size">
            <div className="card-body d-flex flex-column position-relative">
              <h3 className="card-title mb-3">Basic</h3>
              <span className="badge custom-badge position-absolute top-0 start-50 translate-middle badge-sm">
                Most popular
              </span>
              <div className="d-flex align-items-baseline mb-2">
                <h4 className="price mb-0">$12.99</h4>
                <span className="text-muted">/month</span>
              </div>
              <p className="description mb-3">For your team</p>
              <ul className="list-unstyled mb-4">
                <li className="d-flex mb-2">
                  <i className="bi bi-check mr-2"></i>
                  Access to 12,000+ top courses
                </li>
                <li className="d-flex mb-2">
                  <i className="bi bi-check mr-2"></i>
                  Certification prep
                </li>
                <li className="d-flex mb-2">
                  <i className="bi bi-check mr-2"></i>
                  Goal-focused recommendations
                </li>
              <li className="d-flex mb-2">
                  <i className="bi bi-check mr-2"></i>
                  AI-powered coding exercises
                </li>
                <li className="d-flex mb-2">
                  <i className="bi bi-check mr-2"></i>
                  Advanced analytics and insights
                </li>
                <li className="d-flex mb-2">
                  <i className="bi bi-check mr-2"></i>
                  Customizable content
                </li>
                <li className="d-flex mb-2">
                  <i className="bi bi-check mr-2"></i>
                  Dedicated customer success team
                </li>
              </ul>

              {/* Flex Container for Buttons */}
              <div className="d-flex justify-content-between mt-auto">
                <a href="/auth/login" className="btn get-started w-100">
                  Signup for Basic
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="p-3 border-light shadow rounded-3 h-100 custom-card-size">
            <div className="card-body d-flex flex-column position-relative">
              <h3 className="card-title mb-3">Pro</h3>
              <div className="d-flex align-items-baseline mb-2">
                <h4 className="price mb-0">$34.99</h4>
                <span className="text-muted">/month</span>
              </div>
              <p className="description mb-3">For your organization</p>
              <ul className="list-unstyled mb-4">
                <li className="d-flex mb-2">
                  <i className="bi bi-check mr-2"></i>
                  Access to 12,000+ top courses
                </li>
                <li className="d-flex mb-2">
                  <i className="bi bi-check mr-2"></i>
                  Certification prep
                </li>
                <li className="d-flex mb-2">
                  <i className="bi bi-check mr-2"></i>
                  Goal-focused recommendations
                </li>
              <li className="d-flex mb-2">
                  <i className="bi bi-check mr-2"></i>
                  AI-powered coding exercises
                </li>
                <li className="d-flex mb-2">
                  <i className="bi bi-check mr-2"></i>
                  Advanced analytics and insights
                </li>
                <li className="d-flex mb-2">
                  <i className="bi bi-check mr-2"></i>
                  Customizable content
                </li>
                <li className="d-flex mb-2">
                  <i className="bi bi-check mr-2"></i>
                  Dedicated customer success team
                </li>
                <li className="d-flex mb-2">
                  <i className="bi bi-check mr-2"></i>
                  Research-based content curation
                </li>
                <li className="d-flex mb-2">
                  <i className="bi bi-check mr-2"></i>
                  Asynchronous learning with collaborative discussion
                </li>
              </ul>

              {/* Flex Container for Buttons */}
              <div className="d-flex justify-content-between mt-auto">
                <a href="/auth/login" className="btn get-started w-100">
                  Signup for Pro
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default OfferSection;
