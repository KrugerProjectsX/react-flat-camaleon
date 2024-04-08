import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from "react";
import {getDocs, query, where, collection, addDoc, doc, deleteDoc, getDoc} from "firebase/firestore";
import { db } from "../firebase";
import {Button,TextField,Slider} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

// @Params: type: "my-flats" | "all-flats" | "favorite-flats"
export default function FlatsTable({ type }) {
    const ref = collection(db, "flats");
    const refFav = collection(db, "favorites");

    const userId = JSON.parse(localStorage.getItem('user_logged'));
    const [flats, setFlats] = useState([]);
    const [flag, setFlag ] = useState(false);
    const [citySearch, setCitySearch] = useState('');
    const [minArea, setMinArea] = useState(''); // Estado para almacenar el área mínima del rango
    const [maxArea, setMaxArea] = useState(''); // Estado para almacenar el área máxima del rango
    const [rentPriceRange, setRentPriceRange] = useState([0, 1000]); // Rango de precios de alquiler


    const getData = async () => {
        if (type === 'my-flats') {
            const search = query(ref, where("user", "==", userId));
            const data = await getDocs(search);
            const rows = data.docs.map((item) => {
                return { ...item.data(), id: item.id }
            });

            setFlats(rows);
        }
        if (type === 'all-flats') {
            const data = await getDocs(ref);
            const allFlats = [];
            for(const item of data.docs){
                
                const search = query(refFav, where("userId", "==",userId ), where('flatId','==',item.id));
                const dataFav = await getDocs(search);
                let favorite =false;
                if(dataFav.docs.length > 0){
                    favorite = dataFav.docs[0].id;
                }
                const flatsWithFav = {...item.data(), id: item.id, favorite: favorite};
                allFlats.push(flatsWithFav)
            }
            setFlats(allFlats);
        }
        
        if (type === 'favorite-flats') {
            const search = query(refFav, where("userId", "==",userId ) );
            const data = await getDocs(search);
            const allFlats = [];
            for (const item of data.docs){
                const refFlat = doc(db, "flats", item.data().flatId);
                const dataFlat = await getDoc(refFlat);
                allFlats.push({...dataFlat.data(), id: dataFlat.id, favorite: item.id});
            }

            setFlats(allFlats);
            
        }
        
        
    }
    
    const addFavorite = async (id) => {
        //TODO:  verificar si ya existe esta relacion entre el flat id y userId
        const data = {userId: userId, flatId:id}
        await addDoc(refFav, data);
        setFlag(!flag);
    }
    const removeFavorite = async (id) => {
        
        const refRemoveFav = doc(db,"favorites",id)
        await deleteDoc(refRemoveFav);
        setFlag(!flag);
        
    }

    useEffect(() => {
        getData();
    }, [flag]);

     // Función para manejar la búsqueda por ciudad
     const handleCitySearch = async () => {
        const searchQuery = query(ref, where("city", "==", citySearch));
        const data = await getDocs(searchQuery);
        const rows = data.docs.map((item) => {
            return { ...item.data(), id: item.id }
        });
        setFlats(rows);
    };
    // Función para manejar la búsqueda por rango de área
    const handleAreaSearch = async () => {
        // Convertir los valores de minArea y maxArea a números
        const minAreaNumber = parseFloat(minArea);
        const maxAreaNumber = parseFloat(maxArea);

        // Verificar si los valores son válidos y realizar la búsqueda
        if (!isNaN(minAreaNumber) && !isNaN(maxAreaNumber)) {
            const searchQuery = query(ref, where("areaSize", ">=", minAreaNumber), where("areaSize", "<=", maxAreaNumber));
            const data = await getDocs(searchQuery);
            const rows = data.docs.map((item) => {
                return { ...item.data(), id: item.id }
            });
            setFlats(rows);
        } else {
            // Mostrar un mensaje de error si los valores no son válidos
            alert('Please enter valid area size range.');
        }
    };
    // Función para manejar el cambio en el rango de precios de alquiler
    const handleRentPriceChange = (event, newValue) => {
        setRentPriceRange(newValue);
    };

    // Función para realizar la búsqueda por rango de precios de alquiler
    const searchByRentPriceRange = async () => {
        const minPrice = rentPriceRange[0];
        const maxPrice = rentPriceRange[1];
        
        const searchQuery = query(ref, where("rentPrice", ">=", minPrice), where("rentPrice", "<=", maxPrice));
        const data = await getDocs(searchQuery);
        const rows = data.docs.map((item) => {
            return { ...item.data(), id: item.id }
        });
        setFlats(rows);
    };

    return (
        <TableContainer>
            <div style={{ margin: '20px' }}>
                <Slider
                    value={rentPriceRange}
                    onChange={handleRentPriceChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={900}
                />
                {/* Botón para iniciar la búsqueda por rango de precios */}
                <Button variant="contained" onClick={searchByRentPriceRange} style={{ marginTop: '10px' }}>Search by Rent Price</Button>
            </div>
            <TextField
                label="Search by City"
                variant="outlined"
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                style={{ margin: '20px 0' }}
                // Agregar un botón de búsqueda para iniciar la búsqueda
                InputProps={{
                    endAdornment: (
                        <Button variant="contained" onClick={handleCitySearch}>Search</Button>
                    )
                }}
            />
            <TextField
                label="Min Area Size"
                variant="outlined"
                value={minArea}
                onChange={(e) => setMinArea(e.target.value)}
                style={{ margin: '10px' }}
            />
            <TextField
                label="Max Area Size"
                variant="outlined"
                value={maxArea}
                onChange={(e) => setMaxArea(e.target.value)}
                style={{ margin: '10px' }}
            />
            {/* Agregar un botón de búsqueda para iniciar la búsqueda por área */}
            <Button variant="contained" onClick={handleAreaSearch} style={{ margin: '10px' }}>Search by Area</Button>
            <Table className="min-w-full divide-y divide-gray-200" aria-label="simple table">
                <TableHead className="bg-gray-50">
                    <TableRow>
                        <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</TableCell>
                        <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" align="right">Area size</TableCell>
                        <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" align="right">Rent price</TableCell>
                        <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" align="right">Has AC</TableCell>
                        <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" align="right">Date available</TableCell>
                        {(type === 'all-flats'|| type=== 'favorite-flats') && <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" align="right"></TableCell>}
                        <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" align="right"></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody className="bg-white divide-y divide-gray-200">
                    {flats.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className="px-6 py-4 whitespace-nowrap">{row.city}</TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap" >{row.areaSize}</TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap" >{row.rentPrice}</TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap" >{row.hasAc ? 'Yes' : 'No'}</TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap" >{row.dateAvailable}</TableCell>
                            {(type === 'all-flats' || type === 'favorite-flats') &&
                                <TableCell className="px-6 py-4 whitespace-nowrap">
                                    {row.favorite ? <ThumbUpIcon style={{ color: '#29b6f6' }} onClick={() => removeFavorite(row.favorite)} /> : <ThumbUpOffAltIcon onClick={() => addFavorite(row.id)} />}
                                </TableCell>
                            }
                            <TableCell className="px-6 py-4 whitespace-nowrap">
                                <Button href={`/flat/${row.id}`} ><VisibilityIcon /></Button>
                                {type === 'my-flats' && <Button href={`/flats/edit/${row.id}`} ><EditIcon /></Button>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}