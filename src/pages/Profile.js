import React from 'react';
import UserForm from "../components/UserForm";
import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import Button from '@mui/material/Button'; // Asegúrate de tener @mui/material instalado

export default function Profile() {
    let { userId } = useParams();
    let navigate = useNavigate(); // Hook para navegar programáticamente

    // Función para manejar el clic en el botón, redirigirá al usuario a la pantalla de edición
    const handleEditClick = () => {
        navigate(`/profile/edit`); // Asegúrate de que esta ruta coincida con tu configuración de rutas para editar
    };

    return (
        <div>
            <Header />
            <h1>Profile</h1>
            {/* Botón para editar el perfil */}
            
            <UserForm type={'view'} id={userId}/>
            <Button variant="contained" color="primary" onClick={handleEditClick}>Edit</Button>
        </div>
    );
}
