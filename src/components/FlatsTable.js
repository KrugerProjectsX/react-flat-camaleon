import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import {
  getDocs,
  query,
  where,
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Button, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// @Params: type: "my-flats" | "all-flats" | "favorite-flats"
export default function FlatsTable({ type }) {
  const ref = collection(db, "flats");
  const refFav = collection(db, "favorites");

  const userId = JSON.parse(localStorage.getItem("user_logged"));
  const [flats, setFlats] = useState([]);
  const [flag, setFlag] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [minArea, setMinArea] = useState(""); // Estado para almacenar el área mínima del rango
  const [maxArea, setMaxArea] = useState(""); // Estado para almacenar el área máxima del rango
  const [rentPriceRange, setRentPriceRange] = useState([0, 1000]); // Rango de precios de alquiler
  // Nuevo estado para almacenar los nombres de usuario
  const [userMap, setUserMap] = useState({});

  const getData = async () => {
    if (type === "my-flats") {
      const search = query(ref, where("user", "==", userId));
      const data = await getDocs(search);
      const rows = data.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });

      setFlats(rows);
    }

    if (type === "all-flats") {
      const data = await getDocs(ref);
      const allFlats = [];
      for (const item of data.docs) {
        const search = query(
          refFav,
          where("userId", "==", userId),
          where("flatId", "==", item.id)
        );
        const dataFav = await getDocs(search);
        let favorite = false;
        if (dataFav.docs.length > 0) {
          favorite = dataFav.docs[0].id;
        }
        const flatsWithFav = {
          ...item.data(),
          id: item.id,
          favorite: favorite,
        };
        allFlats.push(flatsWithFav);
      }
      setFlats(allFlats);
    }

    if (type === "favorite-flats") {
      const search = query(refFav, where("userId", "==", userId));
      const data = await getDocs(search);
      const allFlats = [];
      for (const item of data.docs) {
        const refFlat = doc(db, "flats", item.data().flatId);
        const dataFlat = await getDoc(refFlat);
        allFlats.push({
          ...dataFlat.data(),
          id: dataFlat.id,
          favorite: item.id,
        });
      }

      setFlats(allFlats);
    }
  };

  const addFavorite = async (id) => {
    //TODO:  verificar si ya existe esta relacion entre el flat id y userId
    const data = { userId: userId, flatId: id };
    await addDoc(refFav, data);
    setFlag(!flag);
  };
  const removeFavorite = async (id) => {
    const refRemoveFav = doc(db, "favorites", id);
    await deleteDoc(refRemoveFav);
    setFlag(!flag);
  };

  useEffect(() => {
    getData();
  }, [flag]);

  // Función para manejar la búsqueda por ciudad
  const handleCitySearch = async () => {
    const searchQuery = query(ref, where("city", "==", citySearch));
    const data = await getDocs(searchQuery);
    const rows = data.docs.map((item) => {
      return { ...item.data(), id: item.id };
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
      const searchQuery = query(
        ref,
        where("areaSize", ">=", minAreaNumber),
        where("areaSize", "<=", maxAreaNumber)
      );
      const data = await getDocs(searchQuery);
      const rows = data.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      setFlats(rows);
    } else {
      // Mostrar un mensaje de error si los valores no son válidos
      alert("Please enter valid area size range.");
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

    const searchQuery = query(
      ref,
      where("rentPrice", ">=", minPrice),
      where("rentPrice", "<=", maxPrice)
    );
    const data = await getDocs(searchQuery);
    const rows = data.docs.map((item) => {
      return { ...item.data(), id: item.id };
    });
    setFlats(rows);
  };

  // Función para cargar los nombres de usuario correspondientes a los userIds
  const loadUserNames = async () => {
    // Obtener la referencia a la colección de usuarios
    const usersRef = collection(db, "users");
    // Obtener todos los documentos de la colección de usuarios
    const usersData = await getDocs(usersRef);
    // Inicializar un objeto para almacenar los nombres de usuario
    const users = {};
    // Iterar sobre los documentos y almacenar los nombres de usuario en el objeto
    usersData.forEach((doc) => {
      users[doc.id] = doc.data().firstName + " " + doc.data().lastName;
    });
    // Establecer el estado con el objeto de nombres de usuario
    setUserMap(users);
  };

  // Cargar los nombres de usuario al montar el componente
  useEffect(() => {
    loadUserNames();
  }, []);

  // Función para eliminar un flat
  const deleteFlat = async (flatId) => {
    const flatDoc = doc(db, "flats", flatId);
    const flatData = await getDoc(flatDoc);
    const flatUserId = flatData.data().user;

    if (flatUserId === userId) {
      await deleteDoc(flatDoc);
      setFlag(!flag);
    } else {
      alert("You can only delete your own flats.");
    }
  };

  const itemsPerPage = 3; // Número de elementos por página
const [page, setPage] = useState(0);
const handleChangePage = (event, newPage) => {
  setPage(newPage);
};
  return (
    <TableContainer
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "10px",
        margin: "0px auto",
        width: "80%",
        height: "650px",
        backgroundColor: "255, 255, 255, 0.8",
        padding: "5px",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(255 250 240)",
      }}
    >
      {/* <div >
                <Slider
                    value={rentPriceRange}
                    onChange={handleRentPriceChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={900}
                    style={{ width: '100%' }}
                />
            
                <Button variant="contained" onClick={searchByRentPriceRange} style={{ marginTop: '10px' }}>Search by Rent Price</Button>
            </div> */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          alignItems: "center",
          margin: "30px auto",
        }}
      >
        <h1 className="uppercase">Find where you are going to live</h1>
        <TextField
          label="Search by City"
          variant="outlined"
          value={citySearch}
          onChange={(e) => setCitySearch(e.target.value)}
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "5px ",
            padding: "1px",
            width: "10%",
            minWidth: "300px",
            backgroundColor: "lightgrey",
          }}
          // Agregar un botón de búsqueda para iniciar la búsqueda
          InputProps={{
            endAdornment: (
              <Button
                variant="contained"
                onClick={handleCitySearch}
                style={{
                  margin: "5px",
                  width: "100%",
                  backgroundColor: "rgba(255, 200, 150, 0.8)",
                }}
              >
                Search
              </Button>
            ),
          }}
        />
        <div style={{
            padding: "1px",
            margin: "5px ",
            color: "black",
            maxWidth: "130px",
            backgroundColor: "lightgrey",
          }}>
        <TextField
          label="Min Area Size"
          variant="outlined"
          value={minArea}
          onChange={(e) => setMinArea(e.target.value)}
          
        />
        <TextField
          label="Max Area Size"
          variant="outlined"
          value={maxArea}
          onChange={(e) => setMaxArea(e.target.value)}
          
        />
        {/* Agregar un botón de búsqueda para iniciar la búsqueda por área */}
        <Button
          variant="contained"
          onClick={handleAreaSearch}
          style={{
          backgroundColor: "rgba(255, 200, 150, 0.8)",
            
          }}
        >
          Search by Area
        </Button>
        </div>
        
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "5px",
          width: "50%",
          height: "600px",
          margin: "5px 70px 10px",
          borderRadius: "40px",
        }}
      >
        <p className="uppercase" style={{ textAlign: "center", margin:"70px 80px 10px" }}>
          Options
        </p>
        <Table
          className="min-w-full divide-y divide-gray-200"
          aria-label="simple table"
          sx={{
            width: "100%",
            margin: "0px auto",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.9)",
          }}
        >
          <TableHead
            className="bg-gray-60 "
            sx={{ backgroundColor: "rgba(255, 255, 250, 0.9)" }}
          >
            <TableRow>
              <TableCell align="center">City</TableCell>
              <TableCell align="center">Area size</TableCell>
              <TableCell align="center">Rent price</TableCell>
              <TableCell align="center">Has AC</TableCell>
              <TableCell align="center">Date available</TableCell>
              {type === "all-flats" && (
                <TableCell align="center">Usuario</TableCell>
              )}
              {(type === "all-flats" || type === "favorite-flats") && (
                <TableCell align="center"></TableCell>
              )}
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            className="bg-gray-60 "
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
          >
            
            {flats.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.city}</TableCell>
                <TableCell align="center">{row.areaSize}</TableCell>
                <TableCell align="center">{row.rentPrice}</TableCell>
                <TableCell align="center">{row.hasAc ? "Yes" : "No"}</TableCell>
                <TableCell align="center">{row.dateAvailable}</TableCell>
                {type === "all-flats" && (
                  <TableCell>
                    {userMap[row.user]}{" "}
                    {/* Muestra el nombre de usuario en lugar del userId */}
                  </TableCell>
                )}
                {(type === "all-flats" || type === "favorite-flats") && (
                  <TableCell className="px-4 py-2 whitespace-nowrap">
                    {row.favorite ? (
                      <ThumbUpIcon
                        style={{ color: "#29b6f6" }}
                        onClick={() => removeFavorite(row.favorite)}
                      />
                    ) : (
                      <ThumbUpOffAltIcon onClick={() => addFavorite(row.id)} />
                    )}
                  </TableCell>
                )}
                <TableCell className="px-2 py-2 whitespace-nowrap">
                  <Button href={`/flat/${row.id}`}>
                    <VisibilityIcon />
                  </Button>
                  {type === "my-flats" && (
                    <Button
                      href={`/flats/edit/${row.id}`}
                      style={{ color: "#00e676" }}
                    >
                      <EditIcon />
                    </Button>
                  )}
                  {type === "my-flats" && (
                    <Button
                      onClick={() => deleteFlat(row.id)}
                      style={{ color: "red" }}
                    >
                      <DeleteForeverIcon />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {flats.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((row) => (
      <TableRow key={row.id}>
        {/* Contenido de cada fila de la tabla */}
      </TableRow>
    ))}
    {flats.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((row) => (
      <TableRow key={row.id}>
        {/* Contenido de cada fila de la tabla */}
      </TableRow>
    ))}
    <TableRow>
      <TableCell colSpan={8}>
      <Button onClick={() => setPage(page - 1)} disabled={page === 0}>Anterior</Button>
    <Button onClick={() => setPage(page + 1)} disabled={(page + 1) * itemsPerPage >= flats.length}>Siguiente</Button>
      </TableCell>
    </TableRow>
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
}
