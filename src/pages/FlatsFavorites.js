import FlatsTable from "../components/FlatsTable";
import Header from "../components/Header";
export default function FlatsFavorites() {
    return (
        <div>
            <Header/>
            <h1>Flats Favorites</h1>
            <FlatsTable type={'favorite-flats'}/>
        </div>
    );
}