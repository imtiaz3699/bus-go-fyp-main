import axios from "axios";
import swal from "sweetalert";

class TripService {
  deleteEmployee(id) {
    axios
      .delete("http://localhost:8000/Trip/deleteTrip/" + id)
      .then(() => {
        console.log("Trip deleted !!!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default TripService;
