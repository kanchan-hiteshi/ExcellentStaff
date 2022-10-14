import React from "react";
import Login from "../Component/Login";
import style from "./Auth.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Grid} from "@mui/material";
import { Container } from "@mui/system";

const Auth = () => {

    return (
        <Container className="row">
        <div className="col-4 bgImage">
        </div>
        <div className="col-8">
          <Card>
            <Login/>
            </Card>
        </div>
      </Container>
    );
  }
export default Auth;
  
  