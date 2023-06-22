import React, { Component } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
// To use routing functionalities
import { Link } from "react-router-dom";
//  import '../index.css';

import FleetService from "../../Services/Fleet";
import Modal from "../../components/Modal/Modal";
var divStyle = {
  margin: "2% 2%",
};

class ListFleet extends Component {
  constructor(props) {
    super(props);
    this.FleetService = new FleetService();
    this.state = {
      Fleet: [],
      Drivers: [],
      fleetToAssignId: null,
      selectedFleetId: null,
      selectedDriverId: null,
      selectedDriverName: "",
      displayFleetAssignmentModal: false,
    };
    this.deleteFleet = this.deleteFleet.bind(this);
  }

  componentDidMount = () => {
    this.getFleetList();
    this.fetchAllDrivers();
  };

  // To get all the Fleets
  getFleetList() {
    axios
      .get("http://localhost:8000/Fleet/getFleet")
      .then((response) => {
        // console.log(response);
        this.setState({
          ...this.state,
          Fleet: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // To get all the Drivers
  fetchAllDrivers() {
    axios
      .get("http://localhost:8000/getDriver")
      .then((response) => {
        this.setState({
          ...this.state,
          Drivers: response?.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // To delete any Fleet
  deleteFleet(Fleetid) {
    this.FleetService.deleteFleet(Fleetid);
    this.getFleetList();
  }

  // Toggle Fleet Assignment Modal
  fleetAssignmentModalHandler(fleetId) {
    this.setState({
      ...this.state,
      fleetToAssignId: fleetId,
      displayFleetAssignmentModal: true,
    });
  }

  handleCloseModal() {
    this.setState({
      ...this.state,
      fleetToAssignId: null,
      selectedDriverId: null,
      selectedDriverName: "",
      displayFleetAssignmentModal: false,
    });
  }

  // Assign fleet
  assignFleetToDriver(e) {
    e.preventDefault();
    this.FleetService.assignFleet(
      this.state.fleetToAssignId,
      this.state.selectedDriverId
    );
    this.setState({
      ...this.state,
      displayFleetAssignmentModal: false,
    });
  }

  // Selected Driver
  handleDriverChange(e) {
    const { value, options } = e.target;
    const selectedDriver = options[options.selectedIndex];
    const selectedDriverName = selectedDriver.textContent;

    this.setState({
      ...this.state,
      selectedDriverId: value,
      selectedDriverName: selectedDriverName,
    });
  }

  render() {
    const { Fleet } = this.state;
    return (
      <>
        <div style={divStyle}>
          <h1>Fleet List</h1>
          <a
            style={{
              border: "1px solid",
              padding: "1rem",
              background: "dodgerblue",
              marginBottom: "1rem",
              color: "white",
              textDecoration: "none",
              float: "right",
            }}
            href="/AddFleet"
          >
            Add Fleet
          </a>
          <Table responsive className="mt-5">
            <thead>
              <tr>
                <th>#</th>

                <th>Name</th>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Color</th>
                <th>Number Plate</th>
                <th>Type</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>AC or Not</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Fleet &&
                Fleet.map((Fleet, i) => {
                  return (
                    <tr key={i}>
                      <td>{i}</td>
                      {/* <div className="avatar">
                        <img
                          src={Fleet.photo}
                          className="card-img-top rounded-circle"
                          alt=""
                          style={{
                            width: "50%",
                            height: "50%",
                            marginLeft: "25%",
                          }}
                        />
                      </div> */}
                      <td>{Fleet.VehicleName}</td>
                      <td>{Fleet.VehicleMake}</td>
                      <td>{Fleet.VehicleModel}</td>
                      <td>{Fleet.VehicleYear}</td>
                      <td>{Fleet.VehicleColor}</td>
                      <td>{Fleet.VehicleNumberPlate}</td>
                      <td>{Fleet.VehicleType}</td>
                      <td>{Fleet.VehicleCapacity}</td>
                      <td>{Fleet.status ? "Active" : "Not Active"}</td>
                      <td>{Fleet.assignedDriverId}</td>
                      <td>{Fleet.IsVehicleAC ? "Yes" : "No"}</td>

                      <td>
                        <button
                          onClick={() =>
                            this.fleetAssignmentModalHandler(Fleet._id)
                          }
                          className="btn btn-primary"
                        >
                          Assign
                        </button>
                      </td>
                      <td>
                        <Link
                          to={"/UpdateFleet/" + Fleet._id}
                          className="btn btn-primary"
                        >
                          Edit
                        </Link>
                      </td>
                      <td>
                        <Button
                          onClick={() => this.deleteFleet(Fleet._id)}
                          bsStyle="danger"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>

        <Modal show={this.state.displayFleetAssignmentModal}>
          <div>
            <h5>Assign Driver To The Fleet</h5>
            <p>
              Here you can select the driver you would like to assign to your
              fleet
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <select
              id="driver"
              name="driver"
              value={this.state.selectedDriverId}
              onChange={(e) => this.handleDriverChange(e)}
            >
              {this.state.Drivers.map((driver) => (
                <option key={driver._id} value={driver._id}>
                  {`${driver.firstName} ${driver.lastName}`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <form onSubmit={(e) => this.assignFleetToDriver(e)}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit">Submit</button> &nbsp;
                <button onClick={() => this.handleCloseModal()}>Close</button>
              </div>
            </form>
          </div>
        </Modal>
      </>
    );
  }
}

export default ListFleet;
