import axios from "axios";
import { useEffect, useState } from "react";
import configData from "../config.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "../models/users.model";

const token = localStorage.getItem("token");

const Profile = () => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    getId();
  }, []);

  const getHttpHeader = () => {
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    return { headers };
  };

  const getId = async () => {
    try {
      let user = JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]));

      const httpOptions = getHttpHeader();
      if (user) {
        const response = await axios.get(
          configData.serverUrl + "/v1/user/" + user.nameid,
          httpOptions
        );

        console.log("Registration successful:", response.data);
        setUser(response.data);
        setFormData(response.data);
      }
    } catch (error) {
      toast.error("Registration error");
      console.error("Registration error:", error);
    }
  };

  interface FormData {
    username: string;
    email: string;
    newpassword: string;
    oldpassword: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    address: string;
    picture: string;
    role: string;
  }

  const [formData, setFormData] = useState<FormData>({
    username: user?.username!,
    email: user?.email!,
    newpassword: "",
    oldpassword: "",
    firstName: user?.firstName!,
    lastName: user?.lastName!,
    birthday: user?.birthday!,
    address: user?.address!,
    picture: user?.picture!,
    role: user?.role!,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: Record<string, string> = {};
    if (!formData.username) validationErrors.username = "Username is required";
    if (!formData.email) validationErrors.email = "Email is required";
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
      const httpOptions = getHttpHeader();
      const response = await axios.patch(
        configData.serverUrl + "/v1/user/update",
        formData,
        httpOptions
      );
      toast.success("Update successful");
      console.log("Update successful:", response.data);
    } catch (error) {
      toast.error("Update error");
      console.error("Update error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="right-aligned">Profile Information</h2>
      <h2> User Status: {user?.verificationStatus}</h2>
      <img
        src={formData.picture}
        alt="Opis slike"
        style={{ width: "100px", height: "100px" }}
      />
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
            value={
              formData.birthday
                ? new Date(formData.birthday).toISOString().split("T")[0]
                : ""
            }
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

        <div className="mb-3" style={{ width: "30%" }}>
          <label htmlFor="oldpassword" className="form-label">
            old password
          </label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            id="oldpassword"
            name="oldpassword"
            value={formData.oldpassword}
            onChange={handleChange}
          />
          {errors.oldpassword && (
            <div className="invalid-feedback">{errors.oldpassword}</div>
          )}
        </div>

        <div className="mb-3" style={{ width: "30%" }}>
          <label htmlFor="newpassword" className="form-label">
            new password
          </label>
          <input
            type="text"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            id="newpassword"
            name="newpassword"
            value={formData.newpassword}
            onChange={handleChange}
          />
          {errors.newpassword && (
            <div className="invalid-feedback">{errors.newpassword}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
