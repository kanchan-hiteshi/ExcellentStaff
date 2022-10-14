import React from "react";
import { Button, Dialog, DialogTitle, DialogContent,DialogContentText, DialogActions } from "@mui/material";
import { LoginService } from "../Services/AccountServices";
import { LoginByFB } from "../Services/AccountFBS";
import ImgSrc from "../assests/Images/login.jpg";
import { AlignHorizontalCenter } from "@mui/icons-material";

const Login = () => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const redirectToProjects = () => {
    window.location.href = "/employees";
  };

  const handleSubmit = async(event) => {  
    event.preventDefault();

    var raw = JSON.stringify({
      "userName": event.target[0].value,
      "password": event.target[1].value
    });

    // ************* LOGIN VIA WEBAPI ***********
    // LoginService(raw).then(result => {
    //   console.log("login : ",result.data.token);
    //   localStorage.setItem("token",result.data.token);
    //   setOpen(true);
    // })

     // ************* LOGIN VIA Firebase  ***********
    let loginRes = await LoginByFB(event.target[0].value, event.target[1].value);
    console.log("login response => ",loginRes);
    if(loginRes != null && loginRes != undefined){
      console.log("token => ",loginRes._tokenResponse.idToken);
      localStorage.setItem("token",loginRes._tokenResponse.idToken);
      setOpen(true);
    }
    
  };
   
    return (
      <div>
      <div className="row">     
      <div  className="col-6 loginHalfSection1">
        <img src={ImgSrc} alt="Login Image" /> 
       </div>
      <div  className="col-6">
      <form onSubmit={handleSubmit} className="form-group loginHalfSection2">  
      <h1>Sign In </h1>  
      <label className="loginFields">Username: </label>
      <input type="text" id="username" className="form-control loginFields"/>
      <label className="loginFields"> Password:</label>  
      <input type="password" id="password" className="form-control loginFields"/>
      {/* <input type="submit" value="Submit" className="form-control loginFields"/> */}
      <Button type="submit" variant="contained" className="loginFields" >SIGN IN </Button>
      <div className="loginFields"> New User ? <a href="/register">Sign UP</a></div>   
    </form>  
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        You Are Sucesfully Login !!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Move to Next Screen ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={redirectToProjects} autoFocus>
            Sure :) 
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>
    </div>
    );
  }

  export default Login;
  
  