import {Box, Button, TextField} from  "@mui/material"
import { where, query,collection,getDocs,  } from "firebase/firestore";
import { useRef } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const email = useRef("");
    const password = useRef("")
    const usersRef = collection(db, 'users ');
    const navigate = useNavigate();
    const login = async (e) => {
        e.preventDefault();
        const search = query(usersRef, where('email', '==', email.current.value))
        const result = await getDocs(search);
        if (result.docs.lenght > 0 ){
            const user = result.docs[0].data()
            const user_id = result.docs[0].id
            if (user.password === password.current.value){
                console.log("login success")
                console.log("redirect")
                
                localStorage.setItem('user_loged', JSON.stringify(user_id));
                navigate('/dashboard', {replace: true});
                
            }else{
                console.log("login failure")
            }
        } else {
            alert("No User Found! Please Sign")
            }
            }
        
    ;

    return(
        <>
            <h2>Login</h2>
       
        <Box component="form" onSubmit={login} sx= {{p:2, border:'1px dashed grey'}}>
                <TextField label="Email" inputRef={email} className="my-custom-class" ></TextField>
                <TextField label="Password" inputRef={password}></TextField>
                <Button type="submit" variant="contained">Login</Button>
                
        </Box>
        </>
    )
};