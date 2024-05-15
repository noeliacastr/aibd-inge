
import React, { useState } from "react";
import './App.css'
import "materialize-css/dist/css/materialize.min.css";
import { BrowserRouter, Routes, Route, Navigate, redirect } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { getUserData } from '../src/api/login'
import CreateEmpleado from './components/CreateEmpleado';
import CreateLogin from './components/CreateLogin';
import ShowAllEmployees from './components/ShowEmpleados';
import Home from './components/Home';
import EditEmpleado from './components/EditEmpleado';
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
import Notification from './componentsNotification/CreateNotification';
import CreateUser from './components/CreateUser';
import WebRTCComponent from './componentsNotification/createStart';
import ShowDetailsEmp from './components/ShowDetailsEmployee';
import ShowDetailsSale from './componentsSale/ShowDetailsSale';
import DrawerAppBar from './components/Navbar2';
import ShowAllUsers from "./components/userComponent/ShowUsers";


function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState();

  const { data: current, isError, isSuccess } = useQuery({
    queryKey: ["current"],
    queryFn: getUserData,
    onSuccess: (current) => {
      setUser(current.data);
      setToken(localStorage.getItem("useer_rol"));

    },
    onError: (er) => {
      setUser(null)
      localStorage.clear();
    }
  });

  return (
    <div className="App">
      <BrowserRouter>
        {localStorage.getItem('useer_rol') === 'admin' ? (
          <Routes>
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path='/nav' element={<PrivateRoute><DrawerAppBar /></PrivateRoute>} />
            <Route path='/empleados' element={<PrivateRoute><ShowAllEmployees /></PrivateRoute>} />
            <Route path='/empleado' element={<PrivateRoute><CreateEmpleado /></PrivateRoute>} />
            <Route path='/empleado/edit/:id' element={<PrivateRoute><EditEmpleado /></PrivateRoute>} />
            <Route path='/empleado/show/:id' element={<PrivateRoute><ShowDetailsEmp /></PrivateRoute>} />
            <Route path='/productos' element={<PrivateRoute><ShowAllProducts /></PrivateRoute>} />
            <Route path='/producto' element={<PrivateRoute><CreateProduct /></PrivateRoute>} />
            <Route path='/producto/edit/:id' element={<PrivateRoute><EditProduct /></PrivateRoute>} />
            <Route path='/ventas' element={<PrivateRoute><ShowAllVentas /></PrivateRoute>} />
            <Route path='/venta' element={<PrivateRoute ><CreateVenta /></PrivateRoute>} />
            <Route path='/venta/edit/:id' element={<PrivateRoute><EditVenta /></PrivateRoute>} />
            <Route path='/venta/show/:id' element={<PrivateRoute><ShowDetailsSale /></PrivateRoute>} />
            <Route path='/notification' element={<Notification />} />
            <Route path='/caja' element={<PrivateRoute><ShowAllReports /></PrivateRoute>} />
            <Route path='/apertura' element={<PrivateRoute><OpenCash /></PrivateRoute>} />
            <Route path='/cierre/edit/:id' element={<PrivateRoute><CloseCash /></PrivateRoute>} />
            <Route path='/video' element={<PrivateRoute><WebRTCComponent /></PrivateRoute>} />
            <Route path='/users' element={<PrivateRoute><ShowAllUsers /></PrivateRoute>} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path='/nav' element={<PrivateRoute><DrawerAppBar /></PrivateRoute>} />
            <Route path='/ventas' element={<PrivateRoute><ShowAllVentas /></PrivateRoute>} />
            <Route path='/venta' element={<PrivateRoute ><CreateVenta /></PrivateRoute>} />
            <Route path='/venta/edit/:id' element={<PrivateRoute><EditVenta /></PrivateRoute>} />
            <Route path='/venta/show/:id' element={<PrivateRoute><ShowDetailsSale /></PrivateRoute>} />
            <Route path='/caja' element={<PrivateRoute><ShowAllReports /></PrivateRoute>} />
            <Route path='/apertura' element={<PrivateRoute><OpenCash /></PrivateRoute>} />
            <Route path='/cierre/edit/:id' element={<PrivateRoute><CloseCash /></PrivateRoute>} />
            
          </Routes>

        )}

        <Routes>

          <Route path='/' element={<CreateLogin />} />
          <Route path='/user' element={<CreateUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;