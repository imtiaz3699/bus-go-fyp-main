import axios from "axios";

class EmployeeService {
  deleteEmployee(id) {
    axios
      .delete("http://localhost:8000/employee/deleteEmployee/" + id)
      .then(() => {
        console.log("Employee Deleted !!!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default EmployeeService;
