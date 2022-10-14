import logo from './logo.svg';
import './App.css';
import Navbar from './Header/Navbar';
import Projects from './Component/Projects';
import Managers from './Component/Managers';
import Employees from './Component/Employees';
import Departments from './Component/Department';
import { BrowserRouter, Routes, Route,Switch } from "react-router-dom";
import Register from './Component/Register';
import Login from './Component/Login';

function App() {
  return (
      <BrowserRouter>
     <Routes>
     <Route path='/' exact element={<Login />} />
          <Route path='/register' exact element={<Register />} />
          <Route path="projects" element={<Projects />} />
          <Route path="managers" element={<Managers />} />
          <Route path="employees" element={<Employees />} />
          <Route path="departments" element={<Departments />} />
     </Routes>
   </BrowserRouter>
  );
}

export default App;
