import React, { Component } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
// To use routing functionalities
import { Link } from "react-router-dom";
//  import '../index.css';

import EmployeeService from "../../Services/Driver";
import TripService from "../../Services/TripService";
import Swal from "sweetalert2";
var divStyle = {
  margin: "2% 2%",
};

class ListTrip extends Component {
  constructor(props) {
    super(props);
    this.employeeService = new TripService();
    this.state = {
      employees: [],
    };
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  componentDidMount = () => {
    this.getEmployeeList();
  };

  // To get all the employees
  getEmployeeList() {
    axios
      .get("http://localhost:8000/Trip/getTrip")
      .then((response) => {
        this.setState({
          employees: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // To delete any driver
  deleteEmployee(empid) {
    // this.TripService.deleteEmployee(empid);
    // this.getEmployeeList();
    axios
      .delete("http://localhost:8000/Trip/deleteTrip/" + empid)
      .then(() => {
        console.log("Trip deleted !!!");
        Swal.fire("Trip Deleted", "", "success");
        this.getEmployeeList();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.employees);
    const { employees } = this.state;
    return (
      <div style={divStyle}>
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
          href="/add-trip"
        >
          Add Trip
        </a>
        <Table responsive className="mt-5">
          <thead>
            <tr>
              <th>#</th>

              <th>Trip Name</th>
              <th>Pick Up Time</th>
              <th>dropoffTime</th>
              <th>fare</th>
              {/* <th>Password</th> */}
              <th>Pick up point</th>
              <th>Drop of point</th>
              <th>Origin/City</th>
              <th>destination</th>
              <th>Available Seats</th>
              <th>Fleet Assignment Id</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {employees &&
              employees.map((employee, i) => {
                return (
                  <tr key={i}>
                    <td>{i}</td>
                    {/* <div className="avatar">
                      <img
                        src={employee.photo}
                        className="card-img-top rounded-circle"
                        alt=""
                        style={{
                          width: "50%",
                          height: "50%",
                          marginLeft: "25%",
                        }}
                      />
                    </div> */}
                    <td>{employee.tripName}</td>
                    <td>{employee.pickupTime}</td>
                    <td>{employee.dropoffTime}</td>
                    <td>{employee.fare * 10}</td>
                    {/* <td>{employee.password}</td> */}
                    <td>{employee.pickupPoint}</td>
                    <td>{employee.dropoffPoint}</td>
                    <td>{employee.originCity}</td>
                    <td>{employee.destination}</td>
                    <td>{employee.availableSeats}</td>
                    <td>{employee.fleetAssignmentId}</td>
                    {/* {console.log(employee.status)} */}
                    <td>
                      {employee.status !== true ? "Active" : "Not active"}
                    </td>
                    {/* <td>{employee.accountCreated}</td>
                    <td>{employee.vehicleType}</td> */}
                    {/* <td>{employee.status ? "Active" : "Not Active"}</td> */}

                    <td>
                      <Link
                        to={"/update-trip/" + employee._id}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <Button
                        onClick={() => this.deleteEmployee(employee._id)}
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
    );
  }
}

export default ListTrip;
