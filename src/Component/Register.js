import React from "react";
import { Button, Dialog, DialogTitle, DialogContent,DialogContentText, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RegisterService } from "../Services/AccountServices";
import { RegisterByFB } from "../Services/AccountFBS";
import ImgSrc from "../assests/Images/login.jpg";

    

const Register = () => {
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
      "password": event.target[1].value,
      "userType" : event.target[2].value
    });
    
    // ************Register via No Sql Firebase********
    let registerRes = await RegisterByFB(event.target[0].value,event.target[1].value,event.target[2].value);
    console.log('---> ',registerRes);
    if(registerRes != null && registerRes != undefined){
      setOpen(true);
    }
    
    // ************Register via dot net api********
    // RegisterService(raw).then(result => {
    //   console.log(result);
    //   setOpen(true);
    // })

    
  };
   
    return (
      <div>
        <div className="row">
        <div  className="col-6 loginHalfSection1">
        <img src={ImgSrc} alt="Login Image" /> 
       </div>
          <div className="col-6">
          <form onSubmit={handleSubmit} className="form-group loginHalfSection2">  
              <h1>Sign UP</h1>  
              <label className="loginFields">UserName or Email : </label>  
              <input type="text" id="username" className="form-control loginFields"/>
              <label className="loginFields"> Password : </label>  
              <input type="password" id="password" className="form-control loginFields"/> 
              <div>Select User Type : </div>
              <input type="radio" id="admin" name="user_type" value="Admin" />
              <label for="html">Admin </label>
              <input type="radio" id="user" name="user_type" value="User"/>
              <label for="css">User</label><br></br> 
              {/* <input type="submit" value="Submit" className="loginFields"/>  */}
              <Button type="submit" variant="contained">Register</Button>
              <div className="loginFields">Already Have Account ? <a href="/">Sign In</a></div>   
            </form> 
          </div>
        </div>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        You Are Sucesfully Register !!
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
    );
  }

  export default Register;
  
  