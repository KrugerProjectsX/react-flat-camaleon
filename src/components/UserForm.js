import { Box, Button, TextField, Icon, Grid, Snackbar,Alert } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { doc, updateDoc, getDoc, collection, addDoc, where, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined as LockOutlinedIcon, Visibility, VisibilityOff } from "@mui/icons-material";
import { EmailOutlined as EmailOutlinedIcon } from '@mui/icons-material';
import { AccountBoxOutlined as AccountBoxOutlinedIcon } from "@mui/icons-material";

export default function UserForm({ type }) {
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const currentDate = new Date().toJSON().slice(0, 10);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: currentDate
    });

    const [userLoaded, setUserLoaded] = useState(false);
    const firstNameRef = useRef('');
    const lastNameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const birthDateRef = useRef('');
    const userTypeRef = useRef('landlords');
    const id = JSON.parse(localStorage.getItem('user_logged'));
    const refCreate = collection(db, "users");
    const [showPassword, setShowPassword] = useState(false);

    let ref = null;
    if (id) {
        ref = doc(db, "users", id);
    }

    const today = new Date();
    const minBirthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0];
    const maxBirthDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate()).toISOString().split('T')[0];
    let nameButton = 'Create';
    if (type === 'update') {
        nameButton = 'Update'
    }
    const getUserData = async () => {
        const dataUser = await getDoc(ref);
        const responseUser = { ...dataUser.data() };
        setUser(responseUser);
        setUserLoaded(true);
    };

    const processData = async () => {
        if (type === 'view' || type === 'update') {
            await getUserData();
        } else {
            setUserLoaded(true);
        }
    };

    useEffect(() => {
        processData();
    }, [])

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowAlert(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let userSend = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            birthDate: birthDateRef.current.value,
            role: userTypeRef.current.value
        }

        // Validar la contraseña
        const password = passwordRef.current.value;
        const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
        if (!passwordRegex.test(password)) {
            setAlertMessage("La contraseña debe contener al menos un número, una letra y un símbolo y tener al menos 8 caracteres.");
            setShowAlert(true);
            return;
        }

        // Validar el correo electrónico
        const email = userSend.email;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setAlertMessage("Por favor ingresa un correo electrónico válido.");
            setShowAlert(true);
            return;
        }

        // Resto del código para crear o actualizar el usuario

        // Verificar si el tipo de acción es "create"
        if (type === 'create') {
            try {
                // Consulta para buscar usuarios con el mismo correo electrónico
                const querySnapshot = await getDocs(query(refCreate, where('email', '==', userSend.email)));

                // Si hay un documento encontrado en la consulta, significa que el correo ya existe
                if (!querySnapshot.empty) {
                    setAlertMessage('El correo electrónico ya está registrado');
                    setShowAlert(true);
                    return;
                } else {
                    // Si no se encuentra ningún documento, el correo no existe, entonces puedes crear el usuario
                    userSend = { ...userSend, password: passwordRef.current.value };
                    await addDoc(refCreate, userSend);
                    setAlertMessage('Usuario creado exitosamente');
                    setShowAlert(true);

                    //Login
                    const userId = querySnapshot.docs[0].id;
                    localStorage.setItem('user_logged', JSON.stringify(userId));
                    navigate('../pages/dashboard', { replace: true });
                    return;
                }
            } catch (error) {
                console.error('Error al verificar el correo electrónico:', error);
            }
        }
        //actualziar de usaurio 
        if (type === 'update') {
            await updateDoc(ref, userSend);
        }
    }

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <Box className="max-w-screen-xl mx-auto p-4">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} className="flex justify-center items-center">
                        <Box component={'form'} onSubmit={handleSubmit} >
                            {userLoaded ? (
                                <>
                                    <TextField required disabled={type === 'view'} label="First Name" inputRef={firstNameRef} defaultValue={user.firstName} variant='outlined' className="mb-4 w-full " InputProps={{ startAdornment: (<Icon><AccountBoxOutlinedIcon /></Icon>) }} />
                                    <TextField required disabled={type === 'view'} label="Last Name" inputRef={lastNameRef} defaultValue={user.lastName} variant='outlined' className="mb-4 w-full" InputProps={{ startAdornment: (<Icon><AccountBoxOutlinedIcon /></Icon>) }} />
                                    <TextField required disabled={type === 'view'} type='email' label='Email' inputRef={emailRef} defaultValue={user.email} variant='outlined' className="mb-4 w-full" InputProps={{ startAdornment: (<Icon><EmailOutlinedIcon /></Icon>) }} />
                                    {type === 'create' && <TextField type={showPassword ? "text" : "password"} label='Password' inputRef={passwordRef} variant='outlined' className="mb-4 w-full" InputProps={{ startAdornment: (<Icon><LockOutlinedIcon /></Icon>), endAdornment: (<Icon onClick={handleTogglePasswordVisibility}> {showPassword ? <VisibilityOff /> : <Visibility />}</Icon>) }} />}
                                    <TextField required disabled={type === 'view'} label='Birth Date' type='date' inputRef={birthDateRef} inputProps={{ min: maxBirthDate, max: minBirthDate }} defaultValue={user.birthDate} variant='outlined' className="mb-4 w-full" />
                                    <TextField select label="User Type" variant="outlined" SelectProps={{ native: true }} className="w-full mb-5" inputRef={userTypeRef}>
                                        <option key="landlord" value="landlord">landlord</option>
                                        <option key="renter" value="renter">renter</option>
                                    </TextField>
                                    {type !== 'view' && <Button type='submit' className="bg-blue-500 text-white px-8 w-48 py-2 rounded hover:bg-blue-600">{nameButton}</Button>}
                                </>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error">
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    );
}