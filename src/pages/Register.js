import UserForm from "../components/UserForm";
import * as React from 'react';
import { Box, Icon } from "@mui/material";
import LocationCityIcon from '@mui/icons-material/LocationCity';

export default function Register() {
    return (
        <>
            <Box className="bg-blue-500 text-white py-4">
                <div className="max-w-screen-xl mx-auto px-4 flex items-center"> {/* Cambio aquí */}
                    <Icon><LocationCityIcon /></Icon>
                    <h1 className="text-left text-xs font-bold ml-2 uppercase">flat-camaleon</h1> {/* Puedes ajustar el margen izquierdo como prefieras */}
                </div>
            </Box>
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
                <div className="w-full max-w-3xl bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                    <h1 className="text-center text-2xl font-semibold mb-2 uppercase">Register</h1>
                    <UserForm type={'create'} />
                </div>
            </div>
        </>
    );
}