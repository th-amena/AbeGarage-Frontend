

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Markup/Pages/Home/Home'
import Login from './Markup/Pages/Login/Login';
import Employee from './Markup/Pages/Admin/Employee/Employee';

function App() {
 

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-employee" element={<Employee />} />
    </Routes>
  );
}

export default App
