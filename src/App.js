import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddFlat from "./pages/AddFlat";
function App() {
  return (
   <Routes>
      <Route path={"/"} element={<Login/>}/>
      <Route path={"/dashboard"} element={<Home/>}/>
      <Route path={"/flat/new"} element={<AddFlat/>}/>
   </Routes>
  );
};

export default App;
