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

const theme = createTheme();

function AddFleet() {
  const [VehicleName, setVehicleName] = useState("");
  const [VehicleMake, setVehicleMake] = useState("");
  const [VehicleModel, setVehicleModel] = useState("");
  const [VehicleColor, setVehicleColor] = useState("");
  const [VehicleYear, setVehicleYear] = useState("");
  const [VehicleNumberPlate, setVehicleNumberPlate] = useState("");
  const [VehicleType, setVehicleType] = useState("");
  const [IsVehicleAC, setIsVehicleAC] = useState("");
  const [VehicleCapacity, setVehicleCapacity] = useState("");
  //const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errors = {};

    if (!VehicleName.trim()) {
      errors.VehicleName = "First name is required";
    }

    if (!VehicleMake.trim()) {
      errors.VehicleMake = "Last name is required";
    }
    if (!VehicleModel.trim()) {
      errors.VehicleModel = "Model of vehicle is required";
    }

    // if (!VehicleColor.trim()) {
    //   errors.VehicleColor = "Cnic is required";
    // }
    if (!VehicleType.trim()) {
      errors.VehicleType = "Vehicle Type is required";
    }
    if (!IsVehicleAC.trim()) {
      errors.IsVehicleAC = " Vehicle AC or not is required";
    }
    if (!VehicleCapacity.trim()) {
      errors.VehicleCapacity = " Vehicle Capacity is required";
    }

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

    const body = {
      VehicleName: VehicleName,
      VehicleMake: VehicleMake,
      VehicleModel: VehicleModel,
      VehicleYear: VehicleYear,
      VehicleColor: VehicleColor,
      VehicleNumberPlate: VehicleNumberPlate,
      VehicleType: VehicleType,
      IsVehicleAC: IsVehicleAC,
      VehicleCapacity: VehicleCapacity,
    };
    console.log("body ===== >>> ", body);
    try {
      const response = await axios.post(
        "http://localhost:8000/Fleet/addFleet",
        body
      );
      console.log(response.data);
      Swal.fire("Fleet Registered!", "", "success");
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
            Add Fleet
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
                  label="Vehicle Name"
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
                  label="Vehicle Make"
                  name="VehicleMake"
                  autoComplete="family-name"
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
                    borderColor: errors.lastName ? "red" : "",
                  }}
                  error={errors.VehicleMake ? true : false}
                  helperText={errors.VehicleMake}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="VehicleModel"
                  required
                  fullWidth
                  id="VehicleModel"
                  label="Vehicle Model"
                  autoFocus
                  value={VehicleModel}
                  onChange={(event) => {
                    setVehicleModel(event.target.value);
                    if (event.target.value) {
                      setErrors((prevState) => ({
                        ...prevState,
                        VehicleModel: "",
                      }));
                    }
                  }}
                  sx={{
                    borderColor: errors.VehicleModel ? "red" : "",
                  }}
                  error={errors.VehicleModel ? true : false}
                  helperText={errors.VehicleModel}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="VehicleColor"
                  required
                  fullWidth
                  id="VehicleColor"
                  label="VehicleColor"
                  value={VehicleColor}
                  onChange={(event) => setVehicleColor(event.target.value)}
                  sx={{
                    borderColor: errors.address ? "red" : "",
                  }}
                  error={errors.VehicleColor ? true : false}
                  helperText={errors.VehicleColor}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="VehicleNumberPlate"
                  required
                  fullWidth
                  id="VehicleNumberPlate"
                  label="Vehicle Number Plate"
                  autoFocus
                  value={VehicleNumberPlate}
                  onChange={(event) => {
                    setVehicleNumberPlate(event.target.value);
                    if (event.target.value) {
                      setErrors((prevState) => ({
                        ...prevState,
                        VehicleNumberPlate: "",
                      }));
                    }
                  }}
                  sx={{
                    borderColor: errors.VehicleNumberPlate ? "red" : "",
                  }}
                  error={errors.VehicleNumberPlate ? true : false}
                  helperText={errors.VehicleNumberPlate}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="VehicleType"
                  required
                  fullWidth
                  id="VehicleType"
                  label="Vehicle Type"
                  autoFocus
                  value={VehicleType}
                  onChange={(event) => {
                    setVehicleType(event.target.value);
                    if (event.target.value) {
                      setErrors((prevState) => ({
                        ...prevState,
                        VehicleType: "",
                      }));
                    }
                  }}
                  sx={{
                    borderColor: errors.VehicleType ? "red" : "",
                  }}
                  error={errors.VehicleType ? true : false}
                  helperText={errors.VehicleType}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="IsVehicleAC"
                  required
                  fullWidth
                  id="IsVehicleAC"
                  label="Is Vehicle AC"
                  autoFocus
                  value={IsVehicleAC}
                  onChange={(event) => {
                    setIsVehicleAC(event.target.value);
                    if (event.target.value) {
                      setErrors((prevState) => ({
                        ...prevState,
                        IsVehicleAC: "",
                      }));
                    }
                  }}
                  sx={{
                    borderColor: errors.IsVehicleAC ? "red" : "",
                  }}
                  error={errors.IsVehicleAC ? true : false}
                  helperText={errors.IsVehicleAC}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="VehicleCapacity"
                  required
                  fullWidth
                  id="VehicleCapacity"
                  label="Vehicle Capacity"
                  autoFocus
                  value={VehicleCapacity}
                  onChange={(event) => {
                    setVehicleCapacity(event.target.value);
                    if (event.target.value) {
                      setErrors((prevState) => ({
                        ...prevState,
                        VehicleCapacity: "",
                      }));
                    }
                  }}
                  sx={{
                    borderColor: errors.VehicleCapacity ? "red" : "",
                  }}
                  error={errors.VehicleCapacity ? true : false}
                  helperText={errors.VehicleCapacity}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="VehicleYear"
                  required
                  fullWidth
                  id="VehicleYear"
                  label="Vehicle Year"
                  value={VehicleYear}
                  onChange={(event) => setVehicleYear(event.target.value)}
                  sx={{
                    borderColor: errors.VehicleYear ? "red" : "",
                  }}
                  error={errors.VehicleYear ? true : false}
                  helperText={errors.VehicleYear}
                  onBlur={handleBlur}
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
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading} // disable the button when loading
            >
              {isLoading ? "Adding..." : "Add"}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AddFleet;
