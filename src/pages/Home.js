import Header from "../components/Header";
import checkUserLogged from "../services/actions";
import FlatsTable from "../components/FlatsTable";

export default function Home() {
    checkUserLogged();
    
    return (
        <div>
            <Header/>
            <h1 className="uppercase" style={{ margin: '30px auto', height: '1px', width: '90%', fontSize: "30px", color: "white" }}>HOME</h1>
            
            <FlatsTable type={'all-flats'}/>
        
        </div>
    );
}