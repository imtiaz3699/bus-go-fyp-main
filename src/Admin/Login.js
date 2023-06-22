import React, { useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Scrollbars } from "react-custom-scrollbars-2";
import LoginforAdmin from "../Services/Login";
import { useNavigate } from "react-router-dom";
// import Image from '../Images/a.jfif';
import Image from "../Images/welcome.jpg";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import swal from "sweetalert";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);
  const [emailerror, setemailerror] = useState("");
  const theme = createTheme();

  const handlesubmit = (e) => {
    if (email.current.value === "" && password.current.value === "") {
      alert("Please Fill all the Fields it can't be empty");
      return;
    }
    if (email.current.value === "") {
      alert("Email can't be empty");
      return;
    }
    if (password.current.value === "") {
      alert("Password can't be empty");
      return;
    }
    LoginforAdmin(email.current.value, password.current.value).then(
      (result) => {
        if (!result) {
          // alert("User not found");
          swal("User not found!", "Failed to Authenticate", "error");
        } else {
          Swal.fire(
            "Welcome " + "Admin",
            "Logged in Successfully",
            "success"
          ).then(function () {
            window.location.href = "/home";
          });
        }
      }
    );
  };

  const emailvalidation = (e) => {
    const reg = /^[A-Z0-9_%+-].+@[A-Z0-9-]+.\.[A-Z]{2,4}$/i;
    if (reg.test(e) === false) {
      setemailerror("Enter Valid Email Please");
    } else {
      setemailerror("");
    }
  };
  return (
    <Scrollbars style={{ height: 730 }}>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            className="pic"
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              // https://source.unsplash.com/700x400/?user,login
              //height: 700,

              backgroundImage: `url(${Image})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "dark"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "right",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 7,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, width: "10%", bgcolor: "secondary.main" }}>
                <LockOpenTwoToneIcon />
              </Avatar>
              <Typography component="h2" variant="h5">
                Admin Login
              </Typography>
              <Box sx={{ mt: 2 }}>
                <TextField
                  margin="normal"
                  required
                  sx={{ width: "75%" }}
                  inputRef={email}
                  onBlur={(e) => emailvalidation(e.target.value)}
                  id="email"
                  label="Enter your email address"
                  name="email"
                  autoComplete="email"
                />
                <br></br>
                {emailerror ? (
                  <span className="text-danger">{emailerror}</span>
                ) : null}
                <br></br>
                <TextField
                  margin="normal"
                  inputRef={password}
                  required
                  sx={{ width: "75%" }}
                  name="password"
                  label="Enter your password"
                  type="password"
                  id="password"
                />

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  onClick={() => {
                    // LoginforAdmin(email.current.value,password.current.value);
                    handlesubmit();
                  }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, width: "75%" }}
                >
                  Login
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/confirmemail" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Scrollbars>
  );
};

export default Login;
