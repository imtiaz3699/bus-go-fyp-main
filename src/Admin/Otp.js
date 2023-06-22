import { useEffect, useRef, useState } from "react";
// import {useNavigate} from 'react-router-dom';

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AlbumIcon from "@mui/icons-material/Album";
import { Route, useNavigate } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import { Link } from "react-router-dom";
import { changepassword } from "../Services/ForgetPassword";

const Otp = () => {
  const Code = useRef(null);
  const password = useRef(null);
  const handlesubmit = () => {
    if (Code.current.value === "" && password.current.value === "") {
      alert("Please Fill all the Fields it can't be empty");
      return;
    }
    if (Code.current.value === "") {
      alert("Email can't be empty");
      return;
    }
    if (password.current.value === "") {
      alert("Password can't be empty");
      return;
    }
    changepassword(Code.current.value, password.current.value);
  };
  return (
    <div>
      <form>
        <br></br>
        <Box
          className="heroku"
          display="flex"
          flexDirection={"column"}
          maxWidth={450}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={3}
          padding={6}
          borderRadius={2}
        >
          <SyncLockIcon style={{ width: "20vw", height: "9vh" }} />
          <Typography
            variant="h4"
            textAlign="center"
            margin={1}
            className="mac"
          >
            Change Password
          </Typography>

          <TextField
            margin="normal"
            inputRef={Code}
            id="standard-basic"
            label="Enter OTP code:"
            variant="outlined"
          />

          <TextField
            margin="normal"
            inputRef={password}
            id="standard-basic"
            label="Enter new password:"
            variant="outlined"
          />

          <br></br>
          <Link to="/">
            <Button
              sx={{ "& button": { m: 2 } }}
              size="large"
              variant="contained"
              onClick={() => {
                handlesubmit();
              }}
            >
              Submit
            </Button>
          </Link>
        </Box>
      </form>
    </div>
    // </Scrollbars>
  );
};
export default Otp;
