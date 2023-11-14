import * as React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import CreateEmpleado from './components/CreateEmpleado';
import CreateLogin from './components/CreateLogin';
import ShowAllEmployees from './components/ShowEmpleados'
import Home from './components/Home';
import EditEmpleado from './components/EditEmpleado';
import AuthenticatedComponent from './components/Authenticated';
import { PrivateRoute } from './components/PrivateRoute';


function App() {


  return (
    <>
      <div className="App">
      <BrowserRouter>
  
      <Routes>
        
        <Route path='/'  exact element={<CreateLogin/>}/>
        
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home/>
            </PrivateRoute>
          }
        />
        <Route path='/empleados'element={
            <PrivateRoute>
              <ShowAllEmployees/>
            </PrivateRoute>
          }/>
        <Route path='/empleado' element={
            <PrivateRoute>
              <CreateEmpleado/>
            </PrivateRoute>
          } />
        <Route path='/empleado/edit/:id' element={
            <PrivateRoute>
              <EditEmpleado/>
            </PrivateRoute>
          } />
        
      </Routes>
      </BrowserRouter>
      
    </div>
    </>
  )
}

export default App;
