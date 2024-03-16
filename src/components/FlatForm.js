import {Box, Button, Switch, TextField} from "@mui/material";
import {useRef} from "react";
import {db} from "../firebase";
import {collection, addDoc} from "firebase/firestore";
import { useNavigate } from "react-router-dom";


export default function FlatForm() {

    const currentDate = new Date().toJSON().slice(0, 10);
    const navigate = useNavigate();
    
    const city = useRef('');
    const streetName = useRef('');
    const streetNumber = useRef(0);
    const areaSize = useRef(0);
    const hasAc = useRef(false);
    const yearBuilt = useRef(0);
    const rentPrice = useRef(0);
    const dateAvailable = useRef('');
    const ref = collection(db, "flats");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const flat = {
            city: city.current.value,
            streetName: streetName.current.value,
            streetNumber: streetNumber.current.value,
            areaSize: areaSize.current.value,
            hasAc: hasAc.current.checked,
            yearBuilt: yearBuilt.current.value,
            rentPrice: rentPrice.current.value,
            dateAvailable: dateAvailable.current.value,
        }
        await addDoc(ref, flat);
        navigate('/flats', { replace: false });
        
        
        
    }
    return (
        <Box component="form" onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <TextField label="City" inputRef={city} variant="outlined" fullWidth className="mb-4" />
            <TextField label="Street name" inputRef={streetName} variant="outlined" fullWidth className="mb-4" />
            <TextField label="Street number" inputRef={streetNumber} variant="outlined" fullWidth className="mb-4" />
            <TextField label="Area size" type="number" inputRef={areaSize} variant="outlined" fullWidth className="mb-4" />
            <Box className="flex items-center mb-4">
                <Switch inputRef={hasAc} color="primary" />
                <label>Has AC</label>
            </Box>
            <TextField label="Year built" type={'number'} inputProps={{ min: 1900, max: 2050 }}  inputRef={yearBuilt} variant="outlined" fullWidth className="mb-4" />
            <TextField label="Rent price" type={'number'} inputRef={rentPrice} variant="outlined" fullWidth className="mb-4" />
            <TextField label="Date Available" type={'date'} defaultValue={currentDate} inputRef={dateAvailable} variant="outlined" fullWidth className="mb-4" />
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Flat
            </Button>
        </Box>

    )
}