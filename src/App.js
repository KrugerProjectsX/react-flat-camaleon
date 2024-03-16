import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddFlat from "./pages/AddFlat";
import Profile from "./pages/Profile";
function App() {
  return (
   <Routes>
      <Route path={"/"} element={<Login/>}/>
      <Route path={"/dashboard"} element={<Home/>}/>
      <Route path={"/flat/new"} element={<AddFlat/>}/>
      <Route path={"/profile"} element={<Profile/>}/>
   </Routes>
  );
};

export default App;
