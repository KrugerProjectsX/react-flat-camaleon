import { useParams } from "react-router-dom";
import Header from "../components/Header";
import FlatForm from "../components/FlatForm";
import Messages from "../components/Messages";

export default function Flat() {
    let { id } = useParams();

    return (
        <div>
            <Header />
            <div>
                <div className="mt-8 flex flex-col ms-0 items-center bg-gray-100 bg-opacity-10">
                    <div className="max-w-md mx-auto p-6 border rounded bg-opacity-40 bg-white rounded-lg">

                        <h1 className="text-center text-2xl font-semibold mb-2 uppercase">View Flat</h1>
                        <FlatForm type={'view'} id={id} />
                    </div>
                </div>
            </div>
            <div>
                <div className="mt-8 flex flex-col ms-0 items-center bg-gray-100 bg-opacity-10">
                    <div className="max-w-md mx-auto p-6 border rounded bg-opacity-40 bg-white rounded-lg">

            <Messages flatId={id} />
            </div>
                </div>
            </div>
        </div>
    );
}