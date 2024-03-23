import Header from "../components/Header";
import checkUserLogged from "../services/actions";

export default function Home() {
    checkUserLogged();
    
    return (
        <div>
            <Header/>
            <h1>Home</h1>
        </div>
    );
}