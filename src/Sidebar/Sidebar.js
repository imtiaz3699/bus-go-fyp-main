// import React from 'react-dom';
import React, { useState } from "react";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

function ToggleSidebar({ logout }) {
  const [isOpen, setIsopen] = useState(false);

  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  return (
    <>
      <div className="container-fluid mt-3">
        <nav className="navbar navbar-expand-lg navbar-light bg-black shadow-md">
          <div className="container-fluid p-2">
            <a className="navbar-brand text-white mr-0">Admin Dashboard </a>
            <div className="form-inline ml-auto">
              <div className="" onClick={ToggleSidebar}>
                <FontAwesomeIcon
                  icon={faHamburger}
                  style={{ color: "white" }}
                />
              </div>
              <Button
                variant="contained"
                className="text-white"
                onClick={logout}
                sx={{ mt: 3, mb: 2, width: "75%" }}
              >
                Logout
              </Button>
            </div>
          </div>
        </nav>
        <div className={`sidebar ${isOpen == true ? "active" : ""}`}>
          <div className="sd-header">
            <h4 className="mb-0">Menu</h4>
            <div className="btn btn-primary" onClick={ToggleSidebar}>
              <i className="fa fa-times"></i>
            </div>
          </div>
          <div className="sd-body">
            <ul>
              <li>
                <a className="sd-link" href={"/ListDriver"}>
                  Driver Managment
                </a>
              </li>
              <li>
                <a className="sd-link" href={"/ListFleet"}>
                  Fleet Managment
                </a>
              </li>
              <li>
                <a className="sd-link">Client Managment</a>
              </li>
              <li>
                <a className="sd-link">User Managment</a>
              </li>
              <li>
                <a className="sd-link" href={"/trip-management"}>
                  Trip Management
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          className={`sidebar-overlay ${isOpen == true ? "active" : ""}`}
          onClick={ToggleSidebar}
        ></div>
      </div>
    </>
  );
}

export default ToggleSidebar;
