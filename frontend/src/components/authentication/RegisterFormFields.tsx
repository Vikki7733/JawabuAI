import React from "react";

interface RegisterFormFieldsProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RegisterFormFields: React.FC<RegisterFormFieldsProps> = ({ formData, handleInputChange }) => (
  <>
    <div className="form-row">
      <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} required />
      <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} required />
    </div>
    <div className="form-row">
      <input type="text" name="age" placeholder="Age" value={formData.age} onChange={handleInputChange} required />
      <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required />
    </div>
    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} required />
  </>
);

export default RegisterFormFields;
