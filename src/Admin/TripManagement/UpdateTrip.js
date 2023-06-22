import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";

const theme = createTheme();

function UpdateTrip() {
  const [firstName, setFirstName] = useState("");
  const [tripName, setTripName] = useState("");
  const [pickupTime, setPickUpTime] = useState("");
  console.log("time", pickupTime);
  const [dropoffTime, setDropOffTime] = useState("");
  const [fare, setFare] = useState("");
  const [pickupPoint, setPickUpPoint] = useState("");
  const [dropoffPoint, setDropoffPoint] = useState("");
  const [originCity, setOriginCity] = useState("");
  const [destination, setDestination] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [fleetAssignmentId, setFleetAssignmentId] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(null);
  const [cnic, setCnic] = useState("");
  const [accountCreated, setAccountCreated] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [fleetData, setFleetData] = useState();

  const validate = () => {
    let errors = {};
    if (!tripName) {
      errors.tripName = "Required";
      console.log("tripName", errors.tripName);
    }
    if (!pickupTime) {
      errors.pickupTime = "Required";
      console.log("pick up time", errors.pickupTime);
    }
    if (!dropoffTime) {
      errors.dropoffTime = "Required";
      console.log("dropoffTime", errors.dropoffTime);
    }
    if (!fare) {
      errors.fare = "Required";
      console.log("fare", errors.fare);
    }
    if (!pickupPoint) {
      errors.pickupPoint = "Required";
      console.log("pickupPoint", errors.pickupPoint);
    }
    if (!dropoffPoint) {
      errors.dropoffPoint = "Required";
      console.log("dropoffPoint", errors.dropoffPoint);
    }
    if (!originCity) {
      errors.originCity = "Required";
      console.log("originCity", errors.originCity);
    }
    if (!destination) {
      errors.destination = "Required";
      console.log("destination", errors.destination);
    }
    if (!availableSeats) {
      errors.availableSeats = "Required";
    }
    if (!fleetAssignmentId) {
      errors.fleetAssignmentId = "Required";
    }
    return errors;
  };
  const handleBlur = (event) => {
    const { name } = event.target;
    setErrors((prevErrors) => {
      return { ...prevErrors, [name]: validate()[name] };
    });
  };

  const id = useParams();
  console.log(id);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // setIsLoading(true);
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setIsLoading(false);
      return;
    }
    const data = {
      tripName: tripName,
      pickupTime: pickupTime,
      dropoffTime: dropoffTime,
      fare: fare,
      pickupPoint: pickupPoint,
      dropoffPoint: dropoffPoint,
      originCity: originCity,
      destination: destination,
      availableSeats: availableSeats,
      fleetAssignmentId: fleetAssignmentId,
      status: false,
      __v: 10,
    };
    console.log("data", data);
    try {
      const response = await axios.put(
        `http://localhost:8000/Trip/updateTrip/${id.id}`,
        data
      );
      console.log("response-data", response.data);

      Swal.fire("Trip Updated", "", "success");
      navigate("/trip-management");
    } catch (error) {
      console.log("error-message", error.message);
      Swal.fire(error.response.data.error, "", "error");
    } finally {
      setIsLoading(false);
    }
  };
  const getTripById = async () => {
    const response = await axios.get(
      `http://localhost:8000/Trip/getTrip/${id}`
    );
    console.log("final-response", response);
  };
  getTripById();
  const getFleetList = () => {
    axios
      .get("http://localhost:8000/Fleet/getFleet")
      .then((response) => {
        // console.log(response);
        console.log("response-data", response.data);
        setFleetData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  React.useEffect(() => {
    getFleetList();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  };
  function getTrips() {
    fetch(`http://localhost:8000/Trip/getTrip/${id.id}`).then((result) => {
      result.json().then((resp) => {
        // console.warn(resp)
        console.log("data", resp);
        setTripName(resp.tripName);
        setAvailableSeats(resp.availableSeats);
        setDestination(resp.destination);
        setDropoffPoint(resp.dropoffPoint);
        setDropOffTime(resp.dropoffTime);
        setFare(resp.fare);
        setFleetAssignmentId(resp.fleetAssignmentId);
        setOriginCity(resp.originCity);
        setPickUpPoint(resp.pickupPoint);
        setPickUpTime(resp.pickupTime);
        const formattedDate = formatDate(resp.pickupTime);
        console.log("formated-date", formattedDate);
        setPickUpTime("06/09/2025");
        // setFleet(resp.vehicleType);
        // setemployeeId(resp.id)
        // setStatus(resp.status)
      });
    });
  }
  React.useEffect(() => {
    getTrips();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Trip
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="tripName"
                  required
                  fullWidth
                  id="tripName"
                  label="Trip Name"
                  autoFocus
                  value={tripName}
                  onChange={(event) => {
                    setTripName(event.target.value);
                    if (event.target.value) {
                      setErrors((prevState) => ({
                        ...prevState,
                        tripName: "",
                      }));
                    }
                  }}
                  sx={{
                    borderColor: errors.tripName ? "red" : "",
                  }}
                  error={errors.tripName ? true : false}
                  helperText={errors.tripName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="pickupTime"
                  label="Pick Up Time"
                  name="pickupTime"
                  type="date"
                  autoComplete="family-name"
                  value={pickupTime}
                  onChange={(event) => {
                    setPickUpTime(event.target.value);
                    if (event.target.value) {
                      setErrors((prevState) => ({
                        ...prevState,
                        pickupTime: "",
                      }));
                    }
                  }}
                  sx={{
                    borderColor: errors.pickupTime ? "red" : "",
                  }}
                  error={errors.pickupTime ? true : false}
                  helperText={errors.pickupTime}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  //   id="email"
                  label="Drop Of Time"
                  name="dropoffTime"
                  type="date"
                  autoComplete="email"
                  value={dropoffTime}
                  onChange={(event) => setDropOffTime(event.target.value)}
                  sx={{
                    borderColor: errors.dropoffTime ? "red" : "",
                  }}
                  error={errors.dropoffTime ? true : false}
                  helperText={errors.dropoffTime}
                  //   onBlur={handleBlur}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="fare"
                  label="fare"
                  id="fare"
                  autoComplete="new-password"
                  value={fare}
                  onChange={(event) => setFare(event.target.value)}
                  sx={{
                    borderColor: errors.fare ? "red" : "",
                  }}
                  error={errors.fare ? true : false}
                  helperText={errors.fare}
                  //   onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="pickupPoint"
                  label="Pick up point"
                  //   type="tel"
                  id="pickupPoint"
                  autoComplete="tel"
                  value={pickupPoint}
                  onChange={(event) => setPickUpPoint(event.target.value)}
                  sx={{
                    borderColor: errors.pickupPoint ? "red" : "",
                  }}
                  error={errors.pickupPoint ? true : false}
                  helperText={errors.pickupPoint}
                  //   onBlur={handleBlur}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="dropoffPoint"
                  required
                  fullWidth
                  id="dropoffPoint"
                  label="dropoffPoint"
                  value={dropoffPoint}
                  onChange={(event) => setDropoffPoint(event.target.value)}
                  sx={{
                    borderColor: errors.dropoffPoint ? "red" : "",
                  }}
                  error={errors.dropoffPoint ? true : false}
                  helperText={errors.dropoffPoint}
                  //   onBlur={handleBlur}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="availableSeats"
                  required
                  fullWidth
                  id="availableSeats"
                  label="availableSeats"
                  value={availableSeats}
                  onChange={(event) => setAvailableSeats(event.target.value)}
                  sx={{
                    borderColor: errors.availableSeats ? "red" : "",
                  }}
                  error={errors.availableSeats ? true : false}
                  helperText={errors.availableSeats}
                  //   onBlur={handleBlur}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="destination"
                  required
                  fullWidth
                  id="destination"
                  label="Destination"
                  value={destination}
                  onChange={(event) => setDestination(event.target.value)}
                  sx={{
                    borderColor: errors.destination ? "red" : "",
                  }}
                  error={errors.destination ? true : false}
                  helperText={errors.destination}
                  //   onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="originCity"
                  required
                  fullWidth
                  id="originCity"
                  label="Origin City"
                  value={originCity}
                  onChange={(event) => setOriginCity(event.target.value)}
                  sx={{
                    borderColor: errors.originCity ? "red" : "",
                  }}
                  error={errors.originCity ? true : false}
                  helperText={errors.originCity}
                  //   onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <select
                  style={{
                    width: "100%",
                    padding: "10px 20px",
                    margin: "10px 0px",
                  }}
                  onChange={(event) => setFleetAssignmentId(event.target.value)}
                >
                  <option>Select a vehicle</option>;
                  {fleetData?.map((element, idx) => {
                    return (
                      <option key={element?._id} value={element?._id}>
                        {element?.VehicleName}
                      </option>
                    );
                  })}
                </select>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading} // disable the button when loading
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default UpdateTrip;
