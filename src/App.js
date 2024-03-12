import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';


function App() {
  return (
   <Routes>
    <Route path='/' element={<Home></Home>}></Route>
    <Route path='/' element={<Login></Login>}></Route>
    </Routes>
   
  );
}

export default App;
