import * as React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import CreateEmpleado from './components/CreateEmpleado';
import CreateLogin from './components/CreateLogin';
import ShowAllEmployees from './components/ShowEmpleados'
import Home from './components/Home';
import EditEmpleado from './components/EditEmpleado';
import { PrivateRoute } from './components/PrivateRoute';
import Detection from './api/detection';
import CreateUser from './components/CreateUser';
import ShowAllVentas from './components/showVentas'
import ShowAllProducts from './components/showProductos';
import CreateProducto from './components/CreateProducto';
import EditProducto from './components/EditProduct';

function App() {
  
  return (
    <>
      <div className="App">
      <BrowserRouter>
  
      <Routes>
        
        <Route path='/'  exact element={<CreateLogin/>}/>
        <Route path='/create-user'  exact element={<CreateUser/>}/>
        <Route path='/polling' element={<Detection/>}/>
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
                <Route path='/venta'element={
            <PrivateRoute>
              <ShowAllVentas/>
            </PrivateRoute>
          }/>
          <Route path='/productos'element={
            <PrivateRoute>
              <ShowAllProducts/>
            </PrivateRoute>
          }/>
          <Route path='/producto'element={
            <PrivateRoute>
              <CreateProducto/>
            </PrivateRoute>
          }/>
          <Route path='/producto/edit/{id}'element={
            <PrivateRoute>
              <EditProducto/>
            </PrivateRoute>
          }/>
      </Routes>
      </BrowserRouter>
      
    </div>
    </>
  )
}

export default App;
