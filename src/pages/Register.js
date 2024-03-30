import UserForm from "../components/UserForm";

export default function Register() {
    return (
        <>
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 ">
            <div className="w-full max-w-3xl bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg ">
                <h1 className="text-center text-2xl font-semibold mb-2 uppercase">Register</h1>
                <UserForm type={'create'}/>
            </div>
        </div>
        </>
    );
}