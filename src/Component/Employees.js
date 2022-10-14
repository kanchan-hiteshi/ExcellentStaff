import React from "react";
import Navbar from "../Header/Navbar";
import { Button } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from "react";
import { DeleteAllEmployee, DeleteEmployee, GetAllEmployees } from "../Services/EmployeeServices";
import { EmployeeModal, EmployeePopup } from "../Modals/EmployeePopup";
import { DeleteEmployeeFB, GetAllEmployeeFB, DeleteAllEmployeeFB } from "../Services/EmployeeFBServices";

const Employees = () => {
    const [rows, setRows] = useState([]);
    const [newItem, SetNewitem] = useState(true);
    const [rowData, setRowData] = useState({});
    const [openDeptDialog, setOpenDeptDialog] = React.useState(false);

    useEffect(() => {
        // *********** Get All Employee using Firebase ********
        let array = [];
        GetAllEmployeeFB().then((empRes => {
            if (empRes !== null && empRes !== undefined) {
                empRes.forEach((doc) => {
                    array.push({ "id": doc.id, "name": doc.data().Name, "salary": doc.data().Salary });
                });
            };
            setRows(array);
        }))

        // ********** Get All Employee using WEB API  ********
        // GetAllEmployees().then(result => {
        //     setRows(result);
        // })

    }, []);

    const handleOpenEmployeeModal = () => {
        setRowData(null);
        SetNewitem(true);
        setOpenDeptDialog(true);
    }

    const handleCloseDeptDialog = async () => {
        setOpenDeptDialog(false);

        // ************* Get All Employee using Firebase **********
        let array = [];
        let empRes = await GetAllEmployeeFB();
        if (empRes !== null && empRes !== undefined) {
            empRes.forEach((doc) => {
                array.push({ "id": doc.id, "name": doc.data().Name, "salary": doc.data().Salary });
            });
        };
        setRows(array);

        // ****************** GET AllDepartment using WEB API ***********
        //     GetAllEmployees().then(result => {
        //       setRows(result);
        //   })
    };

    const handleEditAction = (e, row) => {
        setRowData(row);
        SetNewitem(false);
        setOpenDeptDialog(true);
    }

    const handleDeleteAll = async () => {
        // ****************** Delete AllDepartment using WEB API ***********
        //  let deleteRes  = await DeleteAllEmployee();
        // if(deleteRes.isSuccess){
        //referesh table
        //   GetAllEmployees().then(result => {
        //       setRows(result);
        //   })

        // ****************** Delete AllDepartment using Firebase DB ***********
        await DeleteAllEmployeeFB();
        let array = [];
        let empRes = await GetAllEmployeeFB();
        if (empRes !== null && empRes !== undefined) {
            empRes.forEach((doc) => {
                array.push({ "id": doc.id, "name": doc.data().Name, "salary": doc.data().Salary });
            });
        };
        setRows(array);
    }

    const handleDeleteAction = async (e, row) => {

        // ********* Delete By Firebase ********
        await DeleteEmployeeFB(row.id);

        // *** Get All Employee using Firebase ********
        let array = [];
        let empRes = await GetAllEmployeeFB();
        if (empRes !== null && empRes !== undefined) {
            empRes.forEach((doc) => {
                array.push({ "id": doc.id, "name": doc.data().Name, "salary": doc.data().Salary });
            });
        };
        setRows(array);


        // ********* Delete By WEB API ********
        // DeleteEmployee(row.id).then(result =>{
        //     if(result.isSuccess){
        //         //referesh table
        //         GetAllEmployees().then(result => {
        //             setRows(result);
        //         })
        //     }
        // })
    }

    return (
        <div>
            <Navbar />
            <Button variant="contained" className="deptBtn" onClick={handleOpenEmployeeModal}>Create New Employee </Button>
            <Button variant="outlined" color="error" onClick={handleDeleteAll} >Delete All</Button>
            <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Id</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Salary</TableCell>
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
                            <TableCell align="center">{row.salary}</TableCell>
                            <TableCell>
                                <Stack direction="row" spacing={2} style={{ justifyContent: "center" }}>
                                    <IconButton color="primary" onClick={e => handleEditAction(e, row)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" sx={{ color: red[500] }} onClick={e => handleDeleteAction(e, row)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <EmployeePopup open={openDeptDialog} onClose={handleCloseDeptDialog} data={rowData} newItem={newItem} />
        </div>
    );
}

export default Employees;