import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { loginUser, googleLoginUser, fetchUserData } from "../../redux/slices/authSlice";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa"; // Import icons
import "../../styles/components/LoginCard.css";
import SocialLoginButtons from "./SocialLoginButton";

declare global {
  interface Window {
    google: any;
  }
}

interface LoginCardProps {
  onClose?: () => void; // Optional prop for conditional rendering
}

const LoginCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.onload = () => {
        if (window.google) {
          window.google.accounts.id.initialize({
            client_id: "116124329202503263209",
            callback: (response: any) => handleGoogleResponse(response),
          });
        }
      };
      document.body.appendChild(script);
    };

    loadGoogleScript();

    if (user || localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/dashboard"); // Redirect to dashboard or another page
      } else if (loginUser.rejected.match(resultAction)) {
        // Check if payload has an `error` property
        const errorMessage = resultAction.payload && typeof resultAction.payload === "object" && "error" in resultAction.payload 
          ? (resultAction.payload as { error: string }).error
          : "An unexpected error occurred. Please try again.";
        setError(errorMessage);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };


  const handleGoogleResponse = async (response: any) => {
    try {
      const { credential: idToken } = response;
      // Pass the token to your backend or store it for authentication
      await dispatch(googleLoginUser(idToken)).unwrap();
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login failed", error);
    }
  };
  

  const handleGoogleLogin = () => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.prompt();
    } else {
      console.error("Google API not loaded");
    }
  };

  return (
    <div className="login-card-container">

    <div className="login-card  align-items-center justify-content-center min-vh-300 col-lg-26 col-md-26 col-35">
   
    <div className="d-flex flex-column align-items-center mb-3">
    <h2 className="mb-4">Login</h2>
    <SocialLoginButtons />
</div>
<div className="or-separator">OR</div>
    <form onSubmit={handleSubmit} className="form-container" >
      <div className="mb-3">
        <label htmlFor="email" className="form-label fw-semibold">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label fw-semibold">Password</label>
        <div className="input-group">
           <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
  <button
      type="button"
      className="btn show-password-btn"
      onClick={() => setShowPassword(!showPassword)}
    >
      <i className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"}></i>
    </button>
            </div>
      </div>
      {error && <div className="custom-error-message">{error}</div>}
      <button type="submit" className="btn btn-primary w-100 mb-2">
        Log in with Email
      </button>
    </form>

    <button
  className="btn btn-link mt-3 d-flex justify-content-center w-100"
  onClick={() => navigate("/register")}
>
  New user? Sign up
</button>
  </div>
  </div>
);
};

export default LoginCard;
