import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from "react";
import { getDocs, query, where, collection } from "firebase/firestore";
import { db } from "../firebase";
import {Box, MenuItem, Select, Slider, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function UsersTable() {
    const ref = collection(db, "users");
    const refFlats = collection(db, "flats");
    const [userType,setUserType] = useState('');
    const [flatsCounter,setFlatsCounter] = useState('');
    const [isAdmin,setIsAdmin] = useState('');
    const [valueSlider, setValueSlider] = React.useState([18, 120]);

    const [users, setUsers] = useState([]);

    const getData = async () => {
        
      let arrayWhere= []
        
        if (userType){
            arrayWhere.push(where("role", "==", userType));
        }
        if (isAdmin && isAdmin === "Yes"){
            arrayWhere.push( where("role", "==", "admin"));
            
        }
        if (isAdmin && isAdmin === "No"){
            arrayWhere.push( where("role", "==", "guest"));

        }
        const today = new Date();
        const minBirthDate = new Date(today.getFullYear() - valueSlider[0], today.getMonth(), today.getDate()).toISOString().split('T')[0];
        const maxBirthDate = new Date(today.getFullYear() - valueSlider[1], today.getMonth(), today.getDate()).toISOString().split('T')[0];
        if (valueSlider && valueSlider.length > 1){
            arrayWhere.push(where("birthDate", ">=",maxBirthDate));
            arrayWhere.push( where("birthDate", "<=",minBirthDate));
        }
     
        const searchUser = query(ref, ...arrayWhere);
        
        
        console.log(arrayWhere)
        const data = await getDocs(searchUser);
        const usersSet = []; // Conjunto para almacenar usuarios únicos

        // Iterar sobre los usuarios y agregarlos al conjunto
        for (const item of data.docs) {
            const search = query(refFlats, where("user", "==", item.id));
            const dataFlats = await getDocs(search);
            const userWithFlats = {...item.data(), id: item.id, flats: dataFlats.docs?.length};
            usersSet.push(userWithFlats);
        }
        console.log(usersSet)
        setUsers(usersSet);
    };

    useEffect(() => {
        getData();
    }, [userType,flatsCounter,isAdmin,valueSlider]);

    return (
        <>
            <Box component="form" className="flex space-x-4 mx-auto max-w-screen-md mb-4">
                <div className="flex items-center space-x-4">
                    <TextField
                        select
                        label="User Type"
                        variant="outlined"
                        SelectProps={{ native: true }}
                        className="w-40"
                        value={userType}
                        onChange={(e)=> setUserType(e.target.value)}
                    >
                        <option key="none" value=""></option>
                        <option key="landlords" value="landlords">Landlords</option>
                        <option key="renters" value="renters">Renters</option>
                    </TextField>

                    <TextField
                        select
                        label="Flats Counter"
                        variant="outlined"
                        SelectProps={{ native: true }}
                        className="w-40"
                        value={flatsCounter}
                        onChange={(e)=> setFlatsCounter(e.target.value)}
                    >
                        <option key="none" value=""></option>
                        <option key="0-5" value="0-5">0-5</option>
                        <option key="6-20" value="6-20">6-20</option>
                        <option key="21-60" value="21-60">21-60</option>
                        <option key="61+" value="61+">61+</option>
                    </TextField>

                    <TextField
                        select
                        label="Is Admin"
                        variant="outlined"
                        SelectProps={{ native: true }}
                        className="w-28"
                        value={isAdmin}
                        onChange={(e)=> setIsAdmin(e.target.value)}
                        
                    >
                        <option key="none" value=""></option>
                        <option key="No" value="No">No</option>
                        <option key="Yes" value="Yes">Yes</option>
                    </TextField>
                </div>
                <div className={'w-full'}>
                    <Typography id="input-slider" gutterBottom>
                        Age
                    </Typography>
                    <Slider
                        max={120}
                        min={18}
                        step={10}
                        value={valueSlider}
                        onChange={(e,newValue)=>setValueSlider(newValue)}
                        getAriaLabel={() => 'Age Range'}
                        valueLabelDisplay="auto"
                        className="flex-grow"
                    />
                </div>
                
            </Box>

            <TableContainer>
                <Table className="min-w-full divide-y divide-gray-200" aria-label="simple table">
                    <TableHead className="bg-gray-50">
                        <TableRow>
                            <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</TableCell>
                            <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" align="right">Last Name</TableCell>
                            <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" align="right">Email</TableCell>
                            <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" align="right">Birth Date</TableCell>
                            <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" align="right">is Admin</TableCell>
                            <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" align="right">Flats Count</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="bg-white divide-y divide-gray-200">
                        {users.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className="px-6 py-4 whitespace-nowrap">{row.firstName}</TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap" >{row.lastName}</TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap" >{row.email}</TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap" >{row.birthDate}</TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap" >{row.role ==='admin' ? 'Yes' : 'No'}</TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap" >{row.flats}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
        
    );
}
