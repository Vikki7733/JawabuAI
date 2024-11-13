import React from "react";

interface WelcomeCardProps {
  user: { firstName?: string } | null;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ user }) => (
  <div className="welcome-card">
    <div className="welcome-header">
      <div className="welcome-title">Welcome, {user?.firstName}!</div>
    </div>
    <div className="welcome-progress">
      <span>Overall Progress:</span>
      <div className="progress-bar-container">
        <div className="progress-bar">
          {/* <div className="progress-bar-fill" style={{ width: `${calculateProgress()}%` }} ></div> */}
        </div>
        {/* <span>{calculateProgress()}%</span> */}
      </div>
    </div>
  </div>
);

export default WelcomeCard;
