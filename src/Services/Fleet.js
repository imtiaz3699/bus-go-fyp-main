import axios from "axios";

class FleetService {
  deleteFleet(id) {
    axios
      .delete("http://localhost:8000/Fleet/deleteFleet/" + id)
      .then(() => {
        console.log("Fleet Deleted !!!");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  assignFleet(fleet_id, driver_id) {
    console.log(fleet_id, driver_id);
    axios
      .put("http://localhost:8000/Fleet/assignFleet/", {
        fleet_id,
        driver_id,
      })
      .then((response) => {
        console.log("response", response);
        console.log("Fleet Assigned !!!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default FleetService;
