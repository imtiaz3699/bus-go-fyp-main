import "./App.css";
import Login from "./Admin/Login";
import ToggleSidebar from "./Sidebar/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Footer/Footer";
import Home from "./Sidebar/Home";
import ConfirmEmail from "./Admin/ConfirmEmail";
import Otp from "./Admin/Otp";
import AddEmployee from "./Admin/Drivers/AddDriver";
import ListEmployee from "./Admin/Drivers/ListDriver";
import EditEmployee from "./Admin/Drivers/UpdateDrivers";

import UpdateDrivers from "./Admin/Drivers/ListDriver";

import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import ListFleet from "./Admin/FleetMangmet/ListFleet";
import AddFleet from "./Admin/FleetMangmet/AddFleet";
import EditFleet from "./Admin/FleetMangmet/UpdateFleet";
import Trip from "./Admin/TripManagement/Trip";
import AddDriver from "./Admin/Drivers/AddDriver";
import AddTrip from "./Admin/TripManagement/AddTrip";
import UpdateTrip from "./Admin/TripManagement/UpdateTrip";

function App() {
  const [isAuthenticated, setAuthentic] = useState(false);
  useEffect(() => {
    const data = localStorage.getItem("admintoken");
    if (data != undefined) {
      const setTrue = true;
      setAuthentic(setTrue);
    } else {
      console.log("djdj");
      setAuthentic(false);
    }
  }, [isAuthenticated]);
  const logout = () => {
    localStorage.clear();
    setAuthentic(!isAuthenticated);
  };
  return (
    <div>
      {isAuthenticated ? (
        <BrowserRouter>
          <ToggleSidebar logout={logout} />

          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/AddDriver" element={<AddEmployee />} />
            <Route path="/ListDriver" element={<ListEmployee />} />
            <Route path="/UpdateDrivers/:id" element={<EditEmployee />} />
            <Route path="/AddFleet" element={<AddFleet />} />
            <Route path="/ListFleet" element={<ListFleet />} />
            <Route path="/UpdateFleet/:id" element={<EditFleet />} />
            <Route path="*" element={<Home />} />
            <Route path="/trip-management" element={<Trip />} />
            <Route path="/add-trip" element={<AddTrip />} />
            <Route path="/update-trip/:id" element={<UpdateTrip />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/confirmemail" element={<ConfirmEmail />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="*" element={<Login />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
