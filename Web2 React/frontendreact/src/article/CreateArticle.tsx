import React, { useEffect, useState } from "react";
import axios from "axios";
import configData from "../config.json";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CreateArticleModel {
  name: string;
  price: number;
  quantity: number;
  description: string;
  picture: string;
  userId: number;
}

const CreateArticle = () => {
  const nav = useNavigate();

  useEffect(() => {
    console.log(
      JSON.parse(atob(localStorage.getItem("token")!.split(".")[1])).role
    );
    if (
      JSON.parse(atob(localStorage.getItem("token")!.split(".")[1])).role !==
      "Seller"
    ) {
      nav("/createOrder");
    }
  }, []);

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

  const [formData, setFormData] = useState<CreateArticleModel>({
    name: "b",
    price: 1,
    quantity: 1,
    description: "b",
    picture: "empty",
    userId: 0,
  });

  const getHttpHeader = () => {
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    return { headers };
  };

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: Record<string, string> = {};

    if (!formData.name) validationErrors.name = "name is required";
    if (!formData.price) validationErrors.price = "price is required";
    if (!formData.quantity) validationErrors.quantity = "quantity is required";
    if (!formData.description)
      validationErrors.description = "description is required";
    if (!formData.picture) validationErrors.picture = "picture is required";
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      let user = JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]));
      formData.userId = Number(user.nameid);

      console.log(formData);
      const dataToSend: FormData = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("price", formData.price.toString());
      dataToSend.append("quantity", formData.quantity.toString());
      dataToSend.append("description", formData.description);
      dataToSend.append("picture", "empty");
      dataToSend.append("userId", formData.userId.toString());
      dataToSend.append("file", selectedFile as File);

      const response = await axios.post(
        configData.serverUrl + "/v1/article/create",
        dataToSend,
        getHttpHeader()
      );
      console.log(response.data);
      toast.success("Successful");
      nav("/home");
    } catch (error) {
      toast.error("Error");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Article</h2>
      {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1])).role ===
      "Seller" ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3" style={{ width: "30%" }}>
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div className="mb-3" style={{ width: "30%" }}>
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && (
              <div className="invalid-feedback">{errors.price}</div>
            )}
          </div>
          <div className="mb-3" style={{ width: "30%" }}>
            <label htmlFor="quantity" className="form-label">
              Quantity
            </label>
            <input
              type="number"
              className={`form-control ${errors.quantity ? "is-invalid" : ""}`}
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
            {errors.quantity && (
              <div className="invalid-feedback">{errors.quantity}</div>
            )}
          </div>
          <div className="mb-3" style={{ width: "30%" }}>
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.description ? "is-invalid" : ""
              }`}
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>
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

            {errors.file && (
              <div className="invalid-feedback">{errors.file}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default CreateArticle;
