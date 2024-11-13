import React, { useEffect } from "react";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { googleLoginUser } from "../../redux/slices/authSlice";

const SocialLoginButtons: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
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
    <div className="d-flex flex-column align-items-center mb-3">
      <button
        className="btn btn-light text-dark border w-100 mb-2 d-flex align-items-center justify-content-center"
        onClick={handleGoogleLogin}
      >
        <FaGoogle size={20} className="me-2" /> Log in with Google
      </button>
      <button className="btn btn-primary w-100 mb-2 d-flex align-items-center justify-content-center">
        <FaFacebookF size={20} className="me-2" /> Log in with Facebook
      </button>
      <button className="btn btn-dark w-100 mb-2 d-flex align-items-center justify-content-center">
        <FaApple size={20} className="me-2" /> Continue with Apple
      </button>
    </div>
  );
};

export default SocialLoginButtons;
