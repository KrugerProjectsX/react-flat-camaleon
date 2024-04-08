import FlatForm from "../components/FlatForm";
import Header from "../components/Header";
import { useParams } from "react-router-dom";

export default function FlatEdit() {
    let { id } = useParams();
    if (id === undefined) {
        id = null;

    }
    return (
        <div>
            <Header />
            <div className="mt-3 flex flex-col ms-0 items-center bg-gray-100 bg-opacity-10">
                <div className="max-w-md mx-auto p-5 border rounded bg-opacity-40 bg-white rounded-lg">
                    <h1 className="text-center text-2xl font-semibold mb-2 uppercase">Flat Edit</h1>
                    {/* Botón para editar el perfil */}


                    <FlatForm type={'update'} id={id} />

                </div>
            </div>
        </div>
    );
}