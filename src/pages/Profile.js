import UserForm from "../components/UserForm";
import Header from "../components/Header";

export default function Profile() {
    
    return (
        <div>
            <Header/>
            <h1>Profile</h1>
            <UserForm type={'view'}/>
        </div>
    );
}