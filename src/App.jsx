import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import CreateEmpleado from './components/empleadoComponent/CreateEmpleado';
import CreateLogin from './components/componentLogin/CreateLogin';
import Home from './components/Home';

function App() {
  return (
    <>
      <div className="App">
      <BrowserRouter>
  
      <Routes>
      <Route path='/home' element={<Home/>}/>
        <Route path='/empleado' element ={<CreateEmpleado/>} />
        <Route path='/' element={<CreateLogin/>}/>
      </Routes>
  
      </BrowserRouter>
      
    </div>
    </>
  )
}

export default App
