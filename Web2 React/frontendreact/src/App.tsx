import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./user/Login";
import Registration from "./user/Registration";
import Menu from "./Menu";
import RegistrationSeller from "./user/RegistrationSeller";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./user/Home";
import Profile from "./user/Profile";
import CreateArticle from "./article/CreateArticle";
import CreateOrder from "./orders/CreateOrder";

function App() {
  const containerStyles = {
    backgroundColor: "green",
    padding: "20px",
  };

  const router = (
    <Router>
      <div className="App" style={containerStyles}>
        <Menu />
        <Routes>
        <Route path="" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/registrationSeller" element={<RegistrationSeller />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={ <Profile /> }/>
          <Route path="/createArticle" element={<CreateArticle />} />
          <Route path="/createOrder" element={<CreateOrder />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );

  return router;
}

export default App;
