import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../../redux/slices/authSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import QuoteSection from "../dashboard/QuoteSection";
import FormSection from "./FormSection";
import "../../styles/components/RegisterCard.css";

const RegisterCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    address: "",
    password: "",
    phone: "",
  });

  const [showLoginFields, setShowLoginFields] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user || localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuth = async () => {
    const action = showLoginFields ? loginUser : registerUser;
    const payload = showLoginFields
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const resultAction = await dispatch(action(payload));
      if (action.fulfilled.match(resultAction)) {
        navigate("/dashboard");
      } else {
        setError(getErrorMessage(resultAction.payload));
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAuth();
  };

  return (
    <div>
      <Header onLoginClick={() => setShowLoginFields(true)} />
      <div className="register-container vh-100 d-flex align-items-center">
        <div className="row w-100">
          <QuoteSection />
          <FormSection
            formData={formData}
            handleInputChange={handleInputChange}
            showLoginFields={showLoginFields}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            error={error}
            handleSubmit={handleSubmit}
            setShowLoginFields={setShowLoginFields}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;

const getErrorMessage = (payload: any) => {
  if (payload && typeof payload === "object" && "error" in payload) {
    return payload.error;
  }
  return "An unexpected error occurred. Please try again.";
};
