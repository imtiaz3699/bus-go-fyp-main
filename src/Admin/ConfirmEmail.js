import { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AlbumIcon from "@mui/icons-material/Album";
import { Route, useNavigate } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { Link } from "react-router-dom";
import { sendEmail } from "../Services/ForgetPassword";
import swal from 'sweetalert';
import Swal from 'sweetalert2';
const ConfirmEmail=()=>
{
  
  const email=useRef(null);
  const handlesubmit=()=>
  {
    if (email.current.value == "" ) {
      alert("Email can't be empty");
      return;
    }
    
       sendEmail(email.current.value);
       alert("Email Send")
   }
    return (
        
        <div >
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
              // marginTop={3}
              padding={6}
              borderRadius={2}
              
             
            >
            <MarkEmailReadIcon style={{  width: '22vw', height: '9vh',}}/>
              <Typography
                variant="h4"
                textAlign="center"
                margin={1}
                className="mac"
              >
            Email Confirmation
                
              </Typography>
    
              <TextField
                margin="normal"
                inputRef={email}
                sx={{ width: '75%' }}
                id="standard-basic"
                label="Enter Email:"
                variant="outlined"
              />
            
           
    
              <br></br>
              <Link to="/otp">
              <Button
                sx={{ "& button": { m: 2 } }}
                size="large"
                variant="contained"
                onClick={() => {

            handlesubmit();
                }}
               
              >
                Send OTP
              </Button>
              </Link>
            </Box>
          </form>
        </div>
      
      );

}
export default ConfirmEmail;