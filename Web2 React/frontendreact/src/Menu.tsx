import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const nav = useNavigate();
  const singOut = () => {
    localStorage.setItem("token", "");
    nav("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/registration" className="nav-link">
                Registration Customer
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/registrationSeller" className="nav-link">
                Registration Seller
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            {
              localStorage.getItem("token") !=="" ?
            <li className="nav-item">
              <Link to="/home" className="nav-link">
                Home
              </Link>
              </li> : null
            }
            {
              localStorage.getItem("token") !=="" ?
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
               </li> : null
            }
              {
              localStorage.getItem("token") !=="" ?
            <li className="nav-item">
              <Link to="/createArticle" className="nav-link">
                Create Article
              </Link>
              </li> : null
            }
             {
              localStorage.getItem("token") !=="" ?
            <li className="nav-item">
              <Link to="/createOrder" className="nav-link">
                Orders
              </Link>
              </li> : null
            }

              {/* { 
               JSON.parse(atob(localStorage.getItem("token")!.split(".")[1])).role ===
               "Seller" ?
            <li className="nav-item">
              <Link to="/createOrder" className="nav-link">
                Orders
              </Link>
              </li> : null
            }  */}
            <div className="d-flex">
              <button
                type="button"
                onClick={() => singOut()}
                className="accept-button"
                style={{ marginLeft: "500px" }}
              >
                Sing out
              </button>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
