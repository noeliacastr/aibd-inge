import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import CreateEmpleado from './components/empleadoComponent/CreateEmpleado';
import CreateLogin from './components/componentLogin/CreateLogin';
import Home from './components/Home';
// import ShowEmpleado from './components/empleadoComponent/ShowEmpleado';
import { CustomersTable } from './components/empleadoComponent/ShowEmpleado';


function App() {
  return (
    <>
      <div className="App">
      <BrowserRouter>
  
      <Routes>
      <Route path='/home' element={<Home/>}/>
        <Route path='/empleado/create' element ={<CreateEmpleado/>} />
        <Route path='/' element={<CreateLogin/>}/>
        <Route path='/empleado/show' element={<CustomersTable/>}/>
      </Routes>
  
      </BrowserRouter>
      
    </div>
    </>
  )
}

export default App
