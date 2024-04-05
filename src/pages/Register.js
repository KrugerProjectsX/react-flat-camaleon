import UserForm from "../components/UserForm";
import * as React from 'react';
import { Box, Icon } from "@mui/material";
import LocationCityIcon from '@mui/icons-material/LocationCity';

export default function Register() {
    return (
        <div className="bg-cover bg-center bg-no-repeat min-h-screen">
            <Box className="text-white py-2">
                <div className="max-w-screen-xl mx-auto px-2 flex items-center"> {/* Cambio aquí */}
                    <Icon><LocationCityIcon /></Icon>
                    <h1 className="text-left text-xs font-bold ml-2 uppercase">flat-camaleon</h1> {/* Puedes ajustar el margen izquierdo como prefieras */}
                </div>
            </Box>
            <div className="mt-8 flex flex-col ms-0 items-center bg-gray-100 bg-opacity-10">
                <div className="max-w-md mx-auto p-6 border rounded bg-opacity-40 bg-white rounded-lg">
                    <h1 className="text-center text-2xl font-semibold mb-2 uppercase">Register</h1>
                    <UserForm type={'create'} id={null}/>
                </div>
            </div>
        </div>
    );
}