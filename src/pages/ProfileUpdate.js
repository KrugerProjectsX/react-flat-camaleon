import UserForm from "../components/UserForm";
import Header from "../components/Header";
import {useParams} from "react-router-dom";

export default function ProfileUpdate() {
    let { userId }  = useParams();
    if (userId === undefined) {
        userId = null;
    
    }
    //TODO: verificar si el que actualiza un usuario que no es el mismo sea admin si no mandar null

    return (
        <div>
            <Header/>
            <div className="mt-8 flex flex-col ms-0 items-center bg-gray-100 bg-opacity-10">
            <div className="max-w-md mx-auto p-6 border rounded bg-opacity-40 bg-white rounded-lg">
            <h1 className="text-center text-2xl font-semibold mb-2 uppercase">Profile Update</h1>
            <UserForm type={'update'} userId={userId}/>
            </div>
            </div>
        </div>
    );
}