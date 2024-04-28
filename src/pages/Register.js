import UserForm from "../components/UserForm";
import * as React from 'react';
import { Box, Icon } from "@mui/material";
import LocationCityIcon from '@mui/icons-material/LocationCity';

export default function Register() {
    return (
        <div className="bg-cover bg-center bg-no-repeat min-h-screen">
            <Box className="mt-8 flex flex-col ms-0 items-center bg-gray-100 bg-opacity-10" style={{
          
          margin: "20px auto",
          width: "63%",
          height: "90px",
          backgroundColor: "255, 255, 258, 0.5",
          padding: "0.5px",
          borderRadius: "10px",
          
        }}>
            <Icon><LocationCityIcon /></Icon>
            <h1>flat-camaleon</h1> {/* Puedes ajustar el margen izquierdo como prefieras */}
            </Box>
            <div className="mt-8 flex flex-col ms-0 items-center bg-gray-100 bg-opacity-10" style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          margin: "25px auto",
          width: "60%",
          height: "600px",
          backgroundColor: "255, 255, 258, 0.9",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0 0px 9px rgba(255 250 240)",
        }}>
            <div className="text-center text-2xl font-semibold mb-7">
           
            
            <h2>Welcome back!</h2>
            <h3>Please enter your  information</h3>
            </div>
            
                <div className="max-w-md mx-auto p-6 border rounded bg-opacity-40 bg-white rounded-lg">
                    <h1 className="text-center text-2xl font-semibold mb-2 uppercase">Register</h1>
                    <UserForm type={'create'} id={null}/>
                </div>
            </div>
        </div>
    );
}