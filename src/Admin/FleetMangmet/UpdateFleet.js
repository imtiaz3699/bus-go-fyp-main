import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";

const theme = createTheme();
const customStyle = {
  width: "300px",
  margin: "0 auto",
};
function EditFleet() {
  const [FleetId, setFleetId] = useState("");
  const [Fleet, setFleet] = useState("");
  const [VehicleName, setVehicleName] = useState("");
  const [VehicleMake, setVehicleMake] = useState("");
  const [VehicleModel, setVehicleModel] = useState("");
  const [VehicleColor, setVehicleColor] = useState("");
  const [VehicleNumberPlate, setVehicleNumberPlate] = useState("");
  const [VehicleType, setVehicleType] = useState("");
  const [IsVehicleAC, setIsVehicleAC] = useState(false);
  const [VehicleCapacity, setVehicleCapacity] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getFleet();
  }, []);
  const id = useParams();
  console.log(id);
  function getFleet() {
    fetch(`http://localhost:8000/Fleet/getFleet/${id.id}`).then((result) => {
      result.json().then((resp) => {
        // console.warn(resp)

        setVehicleName(resp.VehicleName);
        setVehicleMake(resp.VehicleMake);
        setVehicleModel(resp.VehicleModel);
        setVehicleColor(resp.VehicleColor);
        setVehicleNumberPlate(resp.VehicleNumberPlate);
        setVehicleType(resp.VehicleType);
        setIsVehicleAC(resp.IsVehicleAC);
        setVehicleCapacity(resp.VehicleCapacity);
        // setEmail (resp.email)
        // setPassword  (resp.password)

        //  (resp.photo)
        //          setCnic  (resp.cnic)
        //         setLicenseNumber (resp.licenseNumber)
        //         setAccountCreated(resp.accountCreated)
        //         setVehicleType(resp.vehicleType)
        //         setFleetId(resp.id)
        //         setStatus(resp.status)
      });
    });
  }

  function deleteFleet(id) {
    fetch(`http://localhost:8000/Fleet/delteFleet/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        getFleet();
      });
    });
  }

  function selectFleet(id) {
    let item = Fleet[id - 1];
    setVehicleName(item.vehicleName);
    setVehicleMake(item.vehicleMake);
    setVehicleModel(item.vehicleModel);
    setVehicleColor(item.vehicleColor);
    setVehicleNumberPlate(item.vehicleNumberPlate);
    setVehicleType(item.vehicleType);
    setIsVehicleAC(item.isVehicleAC);
    setVehicleCapacity(item.VehicleCapacity);
    // setEmail (item.email)
    // setPassword (item.password)
  }
  function UpdateFleet() {
    let item = {
      VehicleName,
      VehicleMake,
      VehicleModel,
      VehicleColor,
      VehicleNumberPlate,
      VehicleType,
      IsVehicleAC,
      VehicleCapacity,
    };
    console.warn("item", item);
    fetch(`http://localhost:8000/Fleet/updateFleet/${id.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        getFleet();
      });
    });
  }
  const validate = () => {
    let errors = {};

    if (!VehicleName) {
      errors.VehicleName = "Vehicle Name is required";
    }

    if (!VehicleMake) {
      errors.VehicleMake = "Making of Vehicle is required";
    }

    if (!VehicleModel) {
      errors.VehicleModel = "Vehicle Model is required";
    }

    if (!VehicleNumberPlate) {
      errors.VehicleNumberPlate = "Color of Vehicle is required";
    }

    if (!VehicleColor) {
      errors.VehicleColor = "Color of Vehicle is required";
    }
    if (!VehicleType) {
      errors.VehicleType = "Vehicle Type is required";
    }
    if (!IsVehicleAC) {
      errors.IsVehicleAC = "Is Vehicle AC or not is required";
    }
    if (VehicleCapacity) {
      errors.VehicleCapacity = "Vehicle Capacity is required";
    }

    // if (!email.trim()) {
    //   errors.email = "Email is required";
    // } else if (
    //   !/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z]$/.test(email)
    // ) {
    //   errors.email = "Email is invalid";
    // }

    // if (!password.trim()) {
    //   errors.password = "Password is required";
    // } else if (
    //   !/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{5,}$/.test(
    //     password
    //   )
    // ) {
    //   errors.password =
    //     "Password must contain at least 5 characters, Min 1 number, Min 1 upper and 1 lowercase, Min 1 special character!";
    // }

    return errors;
  };
  const handleBlur = (event) => {
    const { name } = event.target;
    setErrors((prevErrors) => {
      return { ...prevErrors, [name]: validate()[name] };
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setIsLoading(false);
      return;
    }
    // const errors = validate();

    try {
      const response = await axios.post("http://localhost:8000/updateFleet");
      console.log(response.data);
      Swal.fire("Fleet Added!", "", "success");
    } catch (error) {
      console.log(error.response.data.error);
      Swal.fire(error.response.data.error, "", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // const handlePhotoChange = (event) => {
  //   setPhoto(event.target.files[0]);
  // };

  console.log(status);
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
            Edit Fleet
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
                  name="VehicleName"
                  required
                  fullWidth
                  id="VehicleName"
                  label="Enter your Vehicle Name"
                  autoFocus
                  value={VehicleName}
                  onChange={(event) => {
                    setVehicleName(event.target.value);
                    if (event.target.value) {
                      setErrors((prevState) => ({
                        ...prevState,
                        VehicleName: "",
                      }));
                    }
                  }}
                  sx={{
                    borderColor: errors.VehicleName ? "red" : "",
                  }}
                  error={errors.VehicleName ? true : false}
                  helperText={errors.VehicleName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="VehicleMake"
                  label="Enter your Vehicle Make"
                  name="VehicleMake"
                  //autoComplete="family-name"
                  value={VehicleMake}
                  onChange={(event) => {
                    setVehicleMake(event.target.value);
                    if (event.target.value) {
                      setErrors((prevState) => ({
                        ...prevState,
                        VehicleMake: "",
                      }));
                    }
                  }}
                  sx={{
                    borderColor: errors.VehicleMake ? "red" : "",
                  }}
                  error={errors.VehicleMake ? true : false}
                  helperText={errors.VehicleMake}
                />
              </Grid>

              {/* <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    sx={{
                      borderColor: errors.email ? "red" : "",
                    }}
                    error={errors.email ? true : false}
                    helperText={errors.email}
                    onBlur={handleBlur}
                  />
                </Grid> */}

              {/* <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    sx={{
                      borderColor: errors.password ? "red" : "",
                    }}
                    error={errors.password ? true : false}
                    helperText={errors.password}
                    onBlur={handleBlur}
                  />
                </Grid> */}
              {/* <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phoneNo"
                    label="Phone Number"
                    type="tel"
                    id="phoneNo"
                    autoComplete="tel"
                    value={phoneNo}
                    onChange={(event) => setPhoneNo(event.target.value)}
                    sx={{
                      borderColor: errors.phoneNo ? "red" : "",
                    }}
                    error={errors.phoneNo ? true : false}
                    helperText={errors.phoneNo}
                    onBlur={handleBlur}
                  />
                </Grid> */}

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="VehicleModel"
                  required
                  fullWidth
                  id="VehicleModel"
                  label="Enter your Vehicle Model"
                  value={VehicleModel}
                  onChange={(event) => setVehicleModel(event.target.value)}
                  sx={{
                    borderColor: errors.VehicleModel ? "red" : "",
                  }}
                  error={errors.VehicleModel ? true : false}
                  helperText={errors.VehicleModel}
                  onBlur={handleBlur}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="VehicleColor"
                  required
                  fullWidth
                  id="VehicleColor"
                  label="Enter your Vehicle Color"
                  value={VehicleColor}
                  onChange={(event) => setVehicleColor(event.target.value)}
                  sx={{
                    borderColor: errors.VehicleColor ? "red" : "",
                  }}
                  error={errors.VehicleColor ? true : false}
                  helperText={errors.VehicleColor}
                  onBlur={handleBlur}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="VehicleNumberPlate"
                  required
                  fullWidth
                  id="VehicleNumberPlate"
                  label="Enter your Vehicle Plate Number"
                  value={VehicleNumberPlate}
                  onChange={(event) =>
                    setVehicleNumberPlate(event.target.value)
                  }
                  sx={{
                    borderColor: errors.VehicleNumberPlate ? "red" : "",
                  }}
                  error={errors.VehicleNumberPlate ? true : false}
                  helperText={errors.VehicleNumberPlate}
                  onBlur={handleBlur}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="VehicleType"
                  required
                  fullWidth
                  id="VehicleType"
                  label="Enter your Vehicle Type"
                  value={VehicleType}
                  onChange={(event) => setVehicleType(event.target.value)}
                  sx={{
                    borderColor: errors.VehicleType ? "red" : "",
                  }}
                  error={errors.VehicleType ? true : false}
                  helperText={errors.VehicleType}
                  onBlur={handleBlur}
                />
              </Grid>

              <Grid item xs={12}>
                {/* <TextField
                  autoComplete="given-name"
                  name="IsVehicleAC"
                  required
                  fullWidth
                  id="IsVehicleAC"
                  label="Enter if your Vehicle AC or Non AC"
                  value={IsVehicleAC}
                  onChange={(event) => setIsVehicleAC(event.target.value)}
                  sx={{
                    borderColor: errors.IsVehicleAC ? "red" : "",
                  }}
                  error={errors.IsVehicleAC ? true : false}
                  helperText={errors.IsVehicleAC}
                  onBlur={handleBlur}
                /> */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={IsVehicleAC}
                      onChange={(event) => setIsVehicleAC(event.target.checked)}
                    />
                  }
                  label="IsVehicleAC"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="VehicleCapacity"
                  required
                  fullWidth
                  id="VehicleCapacity"
                  label="Enter the Vehicle Capacity"
                  value={VehicleCapacity}
                  onChange={(event) => setVehicleCapacity(event.target.value)}
                  sx={{
                    borderColor: errors.VehicleCapacity ? "red" : "",
                  }}
                  error={errors.VehicleCapacity ? true : false}
                  helperText={errors.VehicleCapacity}
                  onBlur={handleBlur}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={status}
                      onChange={(event) => setStatus(event.target.checked)}
                    />
                  }
                  label="Status"
                />
              </Grid>

              {/* <Grid item xs={12}>
                  <label
                    htmlFor="photo"
                    style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}
                  >
                    Profile photo:
                  </label>
                  <input
                    type="file"
                    name="photo"
                    id="photo"
                    accept="image/*"
                    required
                    style={{
                      border: "1px solid #ccc",
                      padding: "0.5rem",
                      borderRadius: "0.25rem",
                    }}
                    onChange={handlePhotoChange}
                    onBlur={handleBlur}
                  />
                  {errors.photo && <p style={{ color: "red" }}>{errors.photo}</p>}
                </Grid> */}
            </Grid>

            <Button
              type="button"
              onClick={UpdateFleet}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading} // disable the button when loading
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default EditFleet;
