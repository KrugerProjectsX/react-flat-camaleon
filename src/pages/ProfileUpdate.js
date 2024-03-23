import UserForm from "../components/UserForm";
import Header from "../components/Header";

export default function ProfileUpdate() {
    return (
        <div>
            <Header/>
            <h1>Profile Update</h1>
            <UserForm type={'update'}/>
        </div>
    );
}