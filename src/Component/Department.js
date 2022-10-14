import { Button, Card, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Header/Navbar";
import { GetAllDepartment, GetDepartment, CreateNewDepartment, DeleteDepartment, DeleteAll } from "../Services/DepartmentServices";
import { GetAllDepartmentFB, AddNewDepartmentFB, GetDepartmentFB } from "../Services/DepartmentFBServices";

const Departments = () => {
    const [rows, setRows] = useState([]);
    const [rowData, setRowData] = useState({ name: "", id: "" });
    const [openDeptDialog, setOpenDeptDialog] = React.useState(false);
    const [deprtmentName, setDepartmentName] = useState("");
    const columns = [
        { field: 'id', headerName: 'Id', width: 70 },
        { field: 'name', headerName: 'Department Name', width: 70 },
    ]

    useEffect(() => {
        // ****************** GetAllDepartment using Firebase ***********
        let array = [];
        GetAllDepartmentFB().then((res => {
            if (res !== null && res !== undefined) {
                res.forEach((doc) => {
                    array.push({ "id": doc.id, "name": doc.data().Name });
                });
            };
            setRows(array);
        }))
        /// upto here
    }, []);

    const handleOpenDeptDialog = () => {
        setOpenDeptDialog(true);
    };

    const handleCloseDeptDialog = () => {
        setOpenDeptDialog(false);
    };

    const handleSaveDeprtment = (e) => {
        setDepartmentName(document.getElementById("dialogName").value);
        var raw = JSON.stringify({
            "name": document.getElementById("dialogName").value,
        });

        // *********** Save Department Firebase **********
        let res = AddNewDepartmentFB(document.getElementById("dialogName").value);
        if (res !== null && res !== undefined) {
            setOpenDeptDialog(false);
        }

        //  ******* Save New Department via WEB API **********
        // let data = CreateNewDepartment(raw).then(result => { return result.isSuccess});
        // if(data){
        //     setOpenDeptDialog(false);
        // }
    }

    const handleEditAction = async (e, row) => {
        // ********* Get Depertment using Firebase *******
        let res = await GetDepartmentFB(row.id);
        console.log("res on get by id => ", res.data());

        // ********* Get Depertmen using WEBAPI *******
        // GetDepartment(row.id).then(result => {
        //     console.log("edit row data = >  ",result);
        // })
    }

    const handleDeleteAction = (e, row) => {
        DeleteDepartment(row.id).then(result => {
            if (result.isSuccess) {
                // ******************GetAllDepartment using Firebase DB***********
                let array = [];
                GetAllDepartmentFB().then((res => {
                    if (res !== null && res !== undefined) {
                        res.forEach((doc) => {
                            array.push({ "id": doc.id, "name": doc.data().Name });
                        });
                    };
                    setRows(array);
                }))

                // ****************** GetAllDepartment using WEB API***********
                // GetAllDepartment().then(result => {
                //     setRows(result);
                // })
            }
        })
    }

    const handleDeleteAll = (e) => {
        DeleteAll().then(result => {
            if (result.isSuccess) {
                // ****************** GetAllDepartment using WEB API***********
                // GetAllDepartment().then(result => {
                //     setRows(result);
                // })

                // ******************GetAllDepartment using Firebase DB***********
                let array = [];
                GetAllDepartmentFB().then((res => {
                    if (res !== null && res !== undefined) {
                        res.forEach((doc) => {
                            array.push({ "id": doc.id, "name": doc.data().Name });
                        });
                    };
                    setRows(array);
                }))
            }
        })
    }


    return (
        <div>
            <Navbar />
            <Button variant="contained" className="deptBtn" onClick={handleOpenDeptDialog} >Create New Department </Button>
            <Button variant="outlined" color="error" onClick={handleDeleteAll} >Delete All</Button>

            <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Id</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" align="center">{row.id}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell>
                                <Stack direction="row" spacing={2} style={{ justifyContent: "center" }}>
                                    <IconButton color="primary" onClick={e => handleEditAction(e, row)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" sx={{ color: red[500] }} onClick={e => handleDeleteAction(e, row)} >
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={openDeptDialog} onClose={handleCloseDeptDialog} >
                <DialogTitle>New Department</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="dialogName"
                        label="Department Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeptDialog}>Cancel</Button>
                    <Button onClick={handleSaveDeprtment}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Departments;

