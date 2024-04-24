import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase";

export async function getUserLogged() {
    const userId = getUserId();
    if (userId) {
        console.log('ddd111',userId)
        const ref = doc(db, "users", userId);
        const dataUser = await getDoc(ref);
        console.log(dataUser)
        return  {...dataUser.data()};

    }
}

export  function getUserId() {
    console.log('ddd','aaa',JSON.parse(localStorage.getItem('user_logged')))
    return JSON.parse(localStorage.getItem('user_logged')) || false;
}