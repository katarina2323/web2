import configData from "../config.json";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Article } from "../models/article.model";
import { Createorder } from "../models/order.model";

const CreateOrder = () => {
  const [articles, setArticles] = useState<Article[]>();
  const [activeOrders, setActiveOrders] = useState<Createorder[]>();
  const [historyOrders, sethistoryOrders] = useState<Createorder[]>();
  const [allOrders, setallOrders] = useState<Createorder[]>();
  const [acceptedQuantity, setAcceptedQuantity] = useState<number>();
  const [acceptedAddress, setAcceptedAddress] = useState<string>("");
  const [acceptedComment, setAcceptedComment] = useState<string>("");
  const [editName, setEditName] = useState<string>("");
  const [editPrice, setEditPrice] = useState<number>();
  const [editDescription, setEditDescription] = useState<string>("");
  const [editQuantity, setEditQuantity] = useState<number>();

  useEffect(() => {
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

      if (user.role === "Customer") {
        const response = await axios.get(
          configData.serverUrl + "/v1/article",
          getHttpHeader()
        );

        console.log(" successful:", response.data);
        setArticles(response.data);
      }
    } catch (error) {
      console.error(" error:", error);
    }
    try {
      let user = JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]));

      if (user.role === "Seller") {
        const response = await axios.get(
          configData.serverUrl + "/v1/article/" + user.nameid,
          getHttpHeader()
        );

        console.log(" successful:", response.data);
        setArticles(response.data);
      }
    } catch (error) {
      console.error(" error:", error);
    }

    try {
      let user = JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]));

      if (user.role === "Customer" || user.role === "Seller") {
        const response = await axios.get(
          configData.serverUrl + "/v1/order/active/" + user.nameid,
          getHttpHeader()
        );

        console.log(" successful:", response.data);
        setActiveOrders(response.data);
      }
    } catch (error) {
      console.error(" error:", error);
    }
    try {
      let user = JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]));

      if (user.role === "Customer" || user.role === "Seller") {
        const response = await axios.get(
          configData.serverUrl + "/v1/order/history/" + user.nameid,
          getHttpHeader()
        );

        console.log(" successful:", response.data);
        sethistoryOrders(response.data);
      }
    } catch (error) {
      console.error(" error:", error);
    }
    try {
      let user = JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]));

      if (user.role === "Administrator") {
        const response = await axios.get(
          configData.serverUrl + "/v1/order",
          getHttpHeader()
        );

        console.log(" successful:", response.data);
        setallOrders(response.data);
      }
    } catch (error) {
      console.error(" error:", error);
    }
  };
  const handleAccept = async (sellerId: number, articleId: number) => {
    let user = JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]));

    const updatedOrderData = {
      sellerId: sellerId,
      item: {
        articleId: articleId,
        quantity: acceptedQuantity,
      },
      address: acceptedAddress,
      comment: acceptedComment,
      userId: user.nameid,
    };

    console.log(updatedOrderData);

    try {
      const response = await axios.post(
        configData.serverUrl + "/v1/order/create",
        updatedOrderData,
        getHttpHeader()
      );
      console.log(" successful:", response.data);

      toast.success("successful");
    } catch (error) {
      toast.error("Faild ");
    }
  };
  const handleCancel = async (orederId: string) => {
    let user = JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]));

    const cancelOredr = {
      orderId: orederId,
      userId: user.nameid,
    };
    console.log(cancelOredr);
    try {
      const response = await axios.patch(
        configData.serverUrl + "/v1/order/cancel",
        cancelOredr,
        getHttpHeader()
      );
      console.log(" successful:", response.data);

      toast.success("successful");
    } catch (error) {
      toast.error("Faild ");
    }
  };

  const handleDelete = async (sellerId: number, articleId: number) => {
    try {
      const response = await axios.delete(
        configData.serverUrl +
          "/v1/article/delete/" +
          articleId +
          "/" +
          sellerId,
        getHttpHeader()
      );
      console.log(" successful:", response.data);

      toast.success("successful");
    } catch (error) {
      toast.error("Faild ");
    }
  };
  const handleEdit = async (
    sellerId: number,
    articleId: number,
    picture: string,
    file: File
  ) => {
    const formData: FormData = new FormData();
    formData.append("id", articleId.toString());
    formData.append("name", editName);
    formData.append("price", editPrice!.toString());
    formData.append("quantity", editQuantity!.toString());
    formData.append("description", editDescription);
    formData.append("picture", picture);
    formData.append("userId", sellerId.toString());
    formData.append("file", file);

    try {
      const response = await axios.patch(
        configData.serverUrl + "/v1/article/update",
        formData,
        getHttpHeader()
      );
      console.log(" successful:", response.data);

      toast.success("successful");
    } catch (error) {
      toast.error("Faild ");
    }
  };

  return (
    <div>
      {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1])).role ===
        "Customer" ||
      JSON.parse(atob(localStorage.getItem("token")!.split(".")[1])).role ===
        "Seller" ? (
        <h1>Articles</h1>
      ) : null}

      {articles !== undefined ? (
        <table className="table">
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
                .role === "Seller" ? (
                <th>Edit Name</th>
              ) : null}
              <th>Price</th>
              {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
                .role === "Seller" ? (
                <th>Edit Price</th>
              ) : null}
              <th>Description</th>
              {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
                .role === "Seller" ? (
                <th>Edit Description</th>
              ) : null}
              <th>Available quantity</th>
              {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
                .role === "Seller" ? (
                <th>Edit Quantity</th>
              ) : null}
              {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
                .role === "Customer" ? (
                <th>Quantity</th>
              ) : null}
              {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
                .role === "Customer" ? (
                <th>Address</th>
              ) : null}
              {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
                .role === "Customer" ? (
                <th>Comment</th>
              ) : null}
              {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
                .role === "Customer" ? (
                <th>Actions</th>
              ) : null}
              {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
                .role === "Seller" ? (
                <th>Edit</th>
              ) : null}
              {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
                .role === "Seller" ? (
                <th>Delete</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td>
                  <img
                    src={article.picture}
                    alt="Opis slike"
                    style={{ width: "100px", height: "100px" }}
                  />
                </td>
                <td>{article.name}</td>
                {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
                  .role === "Seller" ? (
                  <td>
                    <input
                      type="text"
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </td>
                ) : null}
                <td>{article.price}</td>
                {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
                  .role === "Seller" ? (
                  <td>
                    <input
                      type="number"
                      onChange={(e) => setEditPrice(Number(e.target.value))}
                    />
                  </td>
                ) : null}
                <td>{article.description}</td>
                {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
                  .role === "Seller" ? (
                  <td>
                    <input
                      type="text"
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                  </td>
                ) : null}
                <td>{article.quantity}</td>
                {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
                  .role === "Seller" ? (
                  <td>
                    <input
                      type="number"
                      onChange={(e) => setEditQuantity(Number(e.target.value))}
                    />
                  </td>
                ) : null}
                {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
                  .role === "Customer" ? (
                  <td>
                    <input
                      type="number"
                      onChange={(e) =>
                        setAcceptedQuantity(Number(e.target.value))
                      }
                    />
                  </td>
                ) : null}
                {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
                  .role === "Customer" ? (
                  <td>
                    <input
                      type="text"
                      onChange={(e) => setAcceptedAddress(e.target.value)}
                    />
                  </td>
                ) : null}
                {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
                  .role === "Customer" ? (
                  <td>
                    <input
                      type="text"
                      onChange={(e) => setAcceptedComment(e.target.value)}
                    />
                  </td>
                ) : null}
                {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
                  .role === "Customer" ? (
                  <td>
                    <button
                      type="button"
                      onClick={() => handleAccept(article.userId, article.id)}
                      className="accept-button"
                    >
                      Accept
                    </button>
                  </td>
                ) : null}
                {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
                  .role === "Seller" ? (
                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(
                          article.userId,
                          article.id,
                          article.picture,
                          article.file
                        )
                      }
                      className="accept-button"
                    >
                      Edit
                    </button>
                  </td>
                ) : null}
                {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
                  .role === "Seller" ? (
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDelete(article.userId, article.id)}
                      className="deny-button"
                    >
                      Delete
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1])).role ===
        "Customer" ||
      JSON.parse(atob(localStorage.getItem("token")!.split(".")[1])).role ===
        "Seller" ? (
        <h1>Active orders</h1>
      ) : null}
      {activeOrders !== undefined ? (
        <table className="table">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Comment</th>
              <th>Address</th>
              <th>Price</th>
              <th>Status</th>
              <th>Article Name</th>

              <th>Quantity</th>
              <th>Time left</th>

              {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
                .role === "Customer" ? (
                <th>Cancel</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {activeOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.comment}</td>
                <td>{order.address}</td>
                <td>{order.price}</td>
                <td>{order.status}</td>
                <td>{order.item.articleName}</td>
                <td>{order.item.quantity}</td>
                <td>
                  {Math.round(
                    (new Date(order.deliveryTime).getTime() -
                      new Date().getTime()) /
                      (1000 * 60)
                  )}{" "}
                  minutes
                </td>

                {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
                  .role === "Customer" ? (
                  <td>
                    <button
                      type="button"
                      onClick={() => handleCancel(order.id)}
                      className="accept-button"
                    >
                      Cancel
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1])).role ===
        "Customer" ||
      JSON.parse(atob(localStorage.getItem("token")!.split(".")[1])).role ===
        "Seller" ? (
        <h1>History orders</h1>
      ) : null}
      {historyOrders !== undefined ? (
        <table className="table">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Comment</th>
              <th>Address</th>
              <th>Price</th>
              <th>Status</th>
              <th>Article Name</th>
              {/* <th>	Article Price</th> */}
              <th>Quantity</th>
              {/* <th>Time left</th> */}
            </tr>
          </thead>
          <tbody>
            {historyOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.comment}</td>
                <td>{order.address}</td>
                <td>{order.price}</td>
                <td>{order.status}</td>
                <td>{order.item.articleName}</td>
                <td>{order.item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      {JSON.parse(atob(localStorage.getItem("token")!.split(".")[1])).role ===
      "Administrator" ? (
        <h1>All orders</h1>
      ) : null}
      {allOrders !== undefined &&
      JSON.parse(atob(localStorage.getItem("token")!.split(".")[1])).role ===
        "Administrator" ? (
        <table className="table">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Comment</th>
              <th>Address</th>
              <th>Price</th>
              <th>Status</th>
              <th>Article Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.comment}</td>
                <td>{order.address}</td>
                <td>{order.price}</td>
                <td>{order.status}</td>
                <td>{order.item.articleName}</td>
                <td>{order.item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default CreateOrder;
