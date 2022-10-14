import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { CreateNewEmployee, UpdateEmployee } from "../Services/EmployeeServices";
import { GetAllDepartment } from "../Services/DepartmentServices";
import { AddNewEmployeeFB, UpdateEmployeeFB } from "../Services/EmployeeFBServices";


export const EmployeePopup = (props) => {

    const handleSaveEmployee = async () => {
        let name = document.getElementById("dialogName").value;
        let salary = document.getElementById("dialogSalary").value;

        // ***** Save Employee Details using FIREBASE**********

        let res = await AddNewEmployeeFB(name, salary);
        if (res !== null && res !== undefined) {
            props.onClose();
        }

        // ***** Save Employee Details using Web API **********

        // var body = JSON.stringify({
        //     "Name": name,
        //     "Salary": salary,
        //     "DepartmentId":departmentId
        // })
        // CreateNewEmployee(body).then(res => {
        //      if(res.isSuccess){
        //         console.log("new emmployee ",res.data);
        //         props.onClose();
        //      }
        // })
    };

    const handleUpdateEmployee = async () => {
        let name = document.getElementById("dialogName").value;
        let salary = document.getElementById("dialogSalary").value;

        // ***** Update Employee Details using Firebase **********
        await UpdateEmployeeFB(name, salary, props.data.id);
        props.onClose();

        // ***** Update Employee Details using Web API **********
        // var body = JSON.stringify({
        //     "Name": name,
        //     "Salary": salary,
        //     "DepartmentId":props.data.departmentId,
        //     "Id" : props.data.id
        // })
        // UpdateEmployee(body).then(res => {
        //      if(res.isSuccess){
        //         console.log("new emmployee ",res.data);
        //         props.onClose();
        //      }
        // })
    };

    return (
        <div>
            <Dialog open={props.open} onClose={props.onClose}>
                <DialogTitle>New Employee Details</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="dialogName"
                        label="Employee Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={props.newItem ? "" : props.data.name}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="dialogSalary"
                        label="Employee Salalry"
                        type="number"
                        fullWidth
                        variant="standard"
                        defaultValue={props.newItem ? "" : props.data.salary}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>Cancel</Button>
                    {props.newItem ? <Button onClick={handleSaveEmployee}>Save</Button> : <Button onClick={handleUpdateEmployee}>Update</Button>}
                </DialogActions>
            </Dialog>
        </div>
    )
}