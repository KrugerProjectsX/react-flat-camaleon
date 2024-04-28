import React from "react";
import Header from "../components/Header";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import FlatsTable from "../components/FlatsTable"; // Importante: Asegúrate de que la ruta del archivo sea correcta

export default function MyFlats() {
    const navigate = useNavigate();

    const createHandleMenuClick = () => {
        navigate('/flats/new'); // No es necesario retornar aquí, simplemente llama a navigate
    }

    return (
        <div >
            <Header />
            <h1 style={{margin:"5px 30px 10px"}}>My Flats</h1>
            <Button onClick={createHandleMenuClick} variant="text" style={{ backgroundColor: 'green', color: 'white', margin:"5px 60px 10px" }}>New Flats</Button>
            <FlatsTable type={'my-flats'} />
        </div>
    );
}
