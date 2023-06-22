import axios from "axios";
import React from "react";
import ListTrip from "./TripList";

function Trip() {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  return (
    <div>
      <ListTrip />
    </div>
  );
}

export default Trip;
