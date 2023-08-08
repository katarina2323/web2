import configData from "../config.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { GetSellers } from "../models/users.model";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const nav = useNavigate();
  const [pendingUsers, setpendingUsers] = useState<GetSellers[]>();

  useEffect(() => {
    console.log(JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
    .role)
      if(JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
      .role !== "Administrator"){
      nav("/createOrder");}
    getId();
  }, []);

  

  const getHttpHeader = () => {
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    return { headers };
  };

  const getId = async () => {
    try {
      let user = JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]));

      const httpOptions = getHttpHeader();
      if (user.role === "Administrator") {
        const response = await axios.get(
          configData.serverUrl + "/v1/user/sellers",
          httpOptions
        );

        console.log("Registration successful:", response.data);
        setpendingUsers(response.data);
      }
    } catch (error) {
      console.error(" error:", error);
    }
  };
  const handleAccept = async (id: any) => {
    try {
      const response = await axios.patch(
        configData.serverUrl + "/v1/user/verify/" + id,
        null,
        getHttpHeader()
      );
      console.log(" successful:", response.data);

      toast.success("You hired another worker");
    } catch (error) {
      toast.error("Faild to hire a person");
    }
  };
  const handleDeny = async (id: any) => {
    try {
      const response = await axios.patch(
        configData.serverUrl + "/v1/user/deny/" + id,
        null,
        getHttpHeader()
      );
      console.log(" successful:", response.data);

      toast.success("You hired another worker");
    } catch (error) {
      toast.error("Faild to hire a person");
    }
  };
  return (
    <div>
      <h1>Users</h1>
      {pendingUsers !== undefined ? (
        <table className="table"  >
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Address</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers!.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.verificationStatus}</td>
               { user.verificationStatus === "Pending" ? (
                <td>
                  <button type="button" onClick={() => handleAccept(user.id)}  className="accept-button">
                    Accept
                  </button>
                  <button type="button" onClick={() => handleDeny(user.id)} className="deny-button">
                    Deny it
                  </button>
                </td>) : <td></td>
                } 
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Home;
