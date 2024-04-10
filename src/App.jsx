import * as React from 'react';
import './App.css'
import "materialize-css/dist/css/materialize.min.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateEmpleado from './components/CreateEmpleado';
import CreateLogin from './components/CreateLogin';
import ShowAllEmployees from './components/ShowEmpleados';
import Home from './components/Home';
import EditEmpleado from './components/EditEmpleado';
import Detecion from './api/prueba';
import CreateProduct from './componentsProduct/CreateProduct';
import EditProduct from './componentsProduct/EditProducts';
import ShowAllProducts from './componentsProduct/ShowProducts';
import ShowAllVentas from './componentsSale/ShowSales';
import CreateVenta from './componentsSale/CreateSale';
import EditVenta from './componentsSale/EditSale';
import ShowAllReports from './componetsCaja/showInformes';
import OpenCash from './componetsCaja/AbrirCaja';
import CloseCash from './componetsCaja/CierreCaja'
import { PrivateRoute } from './components/PrivateRoute';
import AlegraTest from './componentsProduct/pruebaAlegra';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CreateLogin />} />
          <Route path='/alegra' element={<AlegraTest />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path='/empleados' element={<PrivateRoute><ShowAllEmployees /></PrivateRoute>} />
          <Route path='/empleado' element={<PrivateRoute><CreateEmpleado /></PrivateRoute>} />
          <Route path='/empleado/edit/:id' element={<PrivateRoute><EditEmpleado /></PrivateRoute>} />
          <Route path='/prueba' element={<Detecion />} />
          <Route path='/productos' element={<PrivateRoute><ShowAllProducts /></PrivateRoute>} />
          <Route path='/producto' element={<PrivateRoute><CreateProduct /></PrivateRoute>} />
          <Route path='/producto/edit/:id' element={<PrivateRoute><EditProduct /></PrivateRoute>} />
          <Route path='/ventas' element={<PrivateRoute><ShowAllVentas /></PrivateRoute>} />
          <Route path='/venta' element={<PrivateRoute><CreateVenta /></PrivateRoute>} />
          <Route path='/venta/edit/:id' element={<PrivateRoute><EditVenta /></PrivateRoute>} />
          <Route path='/caja' element={<PrivateRoute><ShowAllReports /></PrivateRoute>} />
          <Route path='/apertura' element={<PrivateRoute><OpenCash /></PrivateRoute>} />
          <Route path='/cierre/edit/:id' element={<PrivateRoute><CloseCash /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;