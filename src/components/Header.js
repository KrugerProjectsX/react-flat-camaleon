import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuTransitions from "./MenuTransitions";
import { getUserLogged } from "../services/users";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { Box, Icon } from "@mui/material";

export default function Header() {
    const [user, setUser] = useState(null);

    const getUserData = async () => {
        const responseUser = await getUserLogged();
        console.log(responseUser);
        setUser(responseUser);
    }

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className="bg-opacity-30 bg-white backdrop-filter backdrop-blur-sm">
            <AppBar position="static" sx={{
                backgroundColor: 'transparent', // Makes the background transparent
                boxShadow: 'none'// Removes the AppBar shadow for a cleaner design
            }}>
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
                        <Icon><LocationCityIcon /></Icon>
                        <h1 className="text-left text-xs font-bold ml-2 uppercase">flat-camaleon</h1>   
                    </Box>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2 }}>
                        <Button sx={{ color: 'text.secondary' }}>Home</Button>
                        {user && (user.role === 'landlord' || user.role === 'admin') && <Button sx={{ color: 'text.secondary' }}>My Flats</Button>}
                        <Button sx={{ color: 'text.secondary' }}>Favourites</Button>
                        {user && user.role === 'admin' && <Button sx={{ color: 'text.secondary' }}>Users</Button>}
                    </Box>
                    <MenuTransitions user={user} setUser={setUser} />
                </Toolbar>
            </AppBar>
        </div>
    );
}
