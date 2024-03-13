import {Box, Button, TexFiel} from "@miu/material";
import { useRef } from "react";
import { db } from "firebase";
import {collection,query,where,getDocs} from "firebase/firestore"



export default function Login () {
    const email = useRef();
    const password = useRef();
    const usersRef = collection(db,'users');


const Login = async (e) =>{
    e.preventDefaul();
    console.log(email.currrent.value, password.current.value)
    const search = query(usersRef, where("email", "==", email.current.value ))

    const result = await getDocs(search);
    console.log(result.docs.length)
    if (result.docs.length > 0) {
        const user =result.docs[0].data()
        if (user.password === password.current.value) {
            console.log("login success")
            console.log("Redirect")

        }else{
            console.log("User not found")
        }
    }

}
    return (
        <>
        <div>
            <h1>Login</h1>
        </div>
        < Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
        <TexFiel label="Email" className={"w-full my-4"}variant="outlined" type="email"/>
        <TexFiel label="Password" className={"w-full my-4"} variant="outlined" type="password"/>
        <Button type="submit" variant="contained">Login</Button>
        </Box>
        </>
        

    );
}