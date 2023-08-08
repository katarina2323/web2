import React, { useState } from "react";
import axios from "axios";
import configData from "../config.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

interface Register {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: string;
  address: string;
  picture: string;
  role: string;
}

const Registration = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState<Register>({
    username: "a",
    email: "a@a",
    password: "11111111",
    firstName: "a",
    lastName: "a",
    birthday: "",
    address: "a",
    picture: "",
    role: "Customer",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      setSelectedFileName(file.name);
      setFormData((prevData) => ({ ...prevData, file }));
    }
  };

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validacija
    const validationErrors: Record<string, string> = {};
    if (!formData.username) validationErrors.username = "Username is required";
    if (!formData.email) validationErrors.email = "Email is required";
    if (!formData.password) validationErrors.password = "Password is required";

    if (formData.password.length < 6)
      validationErrors.password = "Password must be at least 6 characters";
    if (!formData.firstName)
      validationErrors.firstName = "First Name is required";
    if (!formData.lastName) validationErrors.lastName = "Last Name is required";
    if (!formData.birthday) validationErrors.birthday = "Birthday is required";
    if (!formData.address) validationErrors.address = "Address is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        configData.serverUrl + "/v1/user/register",
        formData
      );
      toast.success("Registration successful");
      console.log("Registration successful:", response.data);
      nav("/login");
    } catch (error) {
      toast.error("Registration error");
      console.error("Registration error:", error);
    }

    try {
      const dataToSend: FormData = new FormData();

      dataToSend.append("file", selectedFile as File);
      const response = await axios.post(
        configData.serverUrl + "/v1/user/photo/" + formData.email,
        dataToSend,
        getHttpHeaderNoToken()
      );

      console.log("Registration successful:", response.data);
      nav("/login");
    } catch (error) {
      toast.error("Registration error");
      console.error("Registration error:", error);
    }
  };

  const getHttpHeaderNoToken = () => {
    const headers = {
      Accept: "application/json",
    };

    return { headers };
  };

  return (
    <div className="container mt-5">
      <h2> Registration Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3" style={{ width: "30%" }}>
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
        </div>

        <div className="mb-3" style={{ width: "30%" }}>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div className="mb-3" style={{ width: "30%" }}>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        <div className="mb-3" style={{ width: "30%" }}>
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <div className="invalid-feedback">{errors.firstName}</div>
          )}
        </div>

        <div className="mb-3" style={{ width: "30%" }}>
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && (
            <div className="invalid-feedback">{errors.lastName}</div>
          )}
        </div>

        <div className="mb-3" style={{ width: "30%" }}>
          <label htmlFor="birthday" className="form-label">
            Birthday
          </label>
          <input
            type="date"
            className={`form-control ${errors.birthday ? "is-invalid" : ""}`}
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
          />
          {errors.birthday && (
            <div className="invalid-feedback">{errors.birthday}</div>
          )}
        </div>

        <div className="mb-3" style={{ width: "30%" }}>
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && (
            <div className="invalid-feedback">{errors.address}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <div className="mb-3" style={{ width: "30%" }}>
        <label htmlFor="file" className="form-label">
          Picture
        </label>
        <input
          type="file"
          className={`form-control ${errors.file ? "is-invalid" : ""}`}
          id="file"
          name="file"
          onChange={handleFileChange}
        />
        {selectedFileName && <div>{selectedFileName}</div>}

        {errors.file && <div className="invalid-feedback">{errors.file}</div>}
      </div>
    </div>
  );
};

export default Registration;
