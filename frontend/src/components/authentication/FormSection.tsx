import React from "react";
import SocialLoginButtons from "./SocialLoginButton";
import RegisterFormFields from "./RegisterFormFields";

interface FormSectionProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showLoginFields: boolean;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  error: string | null;
  handleSubmit: (e: React.FormEvent) => void;
  setShowLoginFields: (show: boolean) => void;
}

const FormSection: React.FC<FormSectionProps> = ({
  formData,
  handleInputChange,
  showLoginFields,
  showPassword,
  setShowPassword,
  error,
  handleSubmit,
  setShowLoginFields,
}) => (
  <div className="col-md-6 d-flex align-items-center justify-content-center">
    <div className="register-form-container text-center">
      <h2 className="mb-4">{showLoginFields ? "Login" : "Create a free account"}</h2>
      <SocialLoginButtons />
      <form onSubmit={handleSubmit}>
        {!showLoginFields && <RegisterFormFields formData={formData} handleInputChange={handleInputChange} />}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <div className="password-input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="password-input"
          />
          <button
            type="button"
            className="btn show-password-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"}></i>
          </button>
        </div>
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="btn btn-primary mb-2 login">
          {showLoginFields ? "Login" : "Sign Up"}
        </button>
      </form>
      <p className="toggle-link" onClick={() => setShowLoginFields(!showLoginFields)}>
        {showLoginFields ? "Need an account? Register" : "Already have an account? Login"}
      </p>
    </div>
  </div>
);

export default FormSection;
