import { Box, Button, Snackbar, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const usersRef = collection(db, 'users');
    const navigate = useNavigate();
    const [isProgress, setIsProgress] = useState(false);
    const [errorAlert, setErrorAlert] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsProgress(true);
        const emailValue = emailRef.current.value;
        const passwordValue = passwordRef.current.value;
        try {
            const querySnapshot = await getDocs(query(usersRef, where("email", "==", emailValue)));
            if (!querySnapshot.empty) {
                const user = querySnapshot.docs[0].data();
                const userId = querySnapshot.docs[0].id;

                if (user.password === passwordValue) {
                    console.log("Login success");
                    localStorage.setItem('user_logged', JSON.stringify(userId));
                    setIsProgress(false);
                    navigate('/dashboard', { replace: true });
                    return;
                } else {
                    setErrorAlert("Contraseña incorrecta");
                }
            } else {
                setErrorAlert("Usuario no encontrado");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setErrorAlert("Ocurrió un error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.");
        }

        setIsProgress(false);
    }

    const handleCloseAlert = () => {
        setErrorAlert(null);
    };

    return (

        <>

            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <Box
                    component="form"
                    onSubmit={handleLogin}
                    sx={{
                        p: 2,
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        maxWidth: '300px',
                        backgroundColor: 'white'
                    }}
                >
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">Login</h1>
                    </div>
                    <TextField
                        label="Email"
                        inputRef={emailRef}
                        fullWidth
                        variant="outlined"
                        type="email"
                        className="mb-4"
                    />
                    <TextField
                        label="Password"
                        inputRef={passwordRef}
                        fullWidth
                        variant="outlined"
                        type="password"
                        className="mb-4"
                    />
                    <Button
                        type="submit"
                        disabled={isProgress}
                        fullWidth
                        variant="contained"
                        className="mb-4"
                        sx={{ backgroundColor: '#4CAF50', color: 'white' }}
                    >
                        {isProgress ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </Button>
                </Box>
                <Snackbar
                    open={Boolean(errorAlert)}
                    autoHideDuration={6000}
                    onClose={handleCloseAlert}
                    message={errorAlert}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                />
            </div>
        </>

    );
}