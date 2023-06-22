import React, { Component } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
// To use routing functionalities
import { Link } from "react-router-dom";
//  import '../index.css';

import EmployeeService from "../../Services/Driver";
var divStyle = {
  margin: "2% 2%",
};

class ListEmployee extends Component {
  constructor(props) {
    super(props);
    this.employeeService = new EmployeeService();
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
      .get("http://localhost:8000/getDriver")
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
    this.employeeService.deleteEmployee(empid);
    this.getEmployeeList();
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
          href="/AddDriver"
        >
          Add Driver
        </a>
        <Table responsive className="mt-5">
          <thead>
            <tr>
              <th>#</th>

              <th>Profile</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              {/* <th>Password</th> */}
              <th>Cnic</th>
              <th>Address</th>
              <th>Phone</th>
              <th>LicenseNumber</th>
              <th>AccountCreated</th>
              <th>VehicleType </th>
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
                    <div className="avatar">
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
                    </div>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    {/* <td>{employee.password}</td> */}
                    <td>{employee.cnic}</td>
                    <td>{employee.address}</td>
                    <td>{employee.phoneNo}</td>
                    {console.log(employee.status)}
                    <td>{employee.licenseNumber}</td>
                    <td>{employee.accountCreated}</td>
                    <td>{employee.vehicleType}</td>
                    <td>{employee.status ? "Active" : "Not Active"}</td>

                    <td>
                      <Link
                        to={"/UpdateDrivers/" + employee._id}
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

export default ListEmployee;
