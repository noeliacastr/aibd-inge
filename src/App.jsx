import React, { useEffect } from "react";
import './App.css'
import "materialize-css/dist/css/materialize.min.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { getUserData } from './api/login'
import CreateEmpleado from './components/empleado/CreateEmpleado';
import CreateLogin from './components/auth/CreateLogin';
import ShowAllEmployees from './components/empleado/ShowEmpleados';
import Home from './components/layout/Home';
import EditEmpleado from './components/empleado/EditEmpleado';
import CreateProduct from './components/product/CreateProduct';
import EditProduct from './components/product/EditProducts';
import ShowAllProducts from './components/product/ShowProducts';
import ShowAllVentas from './components/sale/ShowSales';
import CreateVenta from './components/sale/CreateSale';
import EditVenta from './components/sale/EditSale';
import ShowAllReports from './components/caja/showInformes';
import OpenCash from './components/caja/AbrirCaja';
import CloseCash from './components/caja/CierreCaja'
import { PrivateRoute } from './components/utils/PrivateRoute';
import Notification from './components/notification/CreateNotification';
import CreateUser from './components/auth/CreateUser';
import WebRTCComponent from './components/notification/createStart';
import ShowDetailsEmp from './components/empleado/ShowDetailsEmployee';
import ShowDetailsSale from './components/sale/ShowDetailsSale';
import ShowAllUsers from "./components/user/ShowUsers";
import { useAuthStore } from "./hooks/useAuthStore";
import ButtonAppBar from "./components/layout/Navbar";


function App() {

  const { isAuth, token, currentUser } = useAuthStore();

  const clearAuth = useAuthStore(
    (state) => state.clearAuth
  );

  const setCurrentUser = useAuthStore(
    (state) => state.setCurrentUser
  );

  const { data: current, isError, isSuccess } = useQuery({
    queryKey: ["current"],
    queryFn: getUserData,
  });

  useEffect(() => {
    if(isError){
      clearAuth();
    }
    if(isSuccess){
      setCurrentUser(current, true);
    }
  }, [current, isSuccess, isError]);
  


  return (
    <div className="App">
      <BrowserRouter>
      <ButtonAppBar />
        {isAuth && !!token ? (
          <div>
            {currentUser.rol === "admin" ? (
              <Routes>
                <Route element={<PrivateRoute isAuth={isAuth} />}>
                  <Route path="/" element={<Home />} />
                  <Route path='/empleados' element={<ShowAllEmployees />} />
                  <Route path='/empleado' element={<CreateEmpleado />} />
                  <Route path='/empleado/edit/:id' element={<EditEmpleado />} />
                  <Route path='/empleado/show/:id' element={<ShowDetailsEmp />} />
                  <Route path='/productos' element={<ShowAllProducts />} />
                  <Route path='/producto' element={<CreateProduct />} />
                  <Route path='/producto/edit/:id' element={<EditProduct />} />
                  <Route path='/ventas' element={<ShowAllVentas />} />
                  <Route path='/venta' element={<CreateVenta />} />
                  <Route path='/venta/edit/:id' element={<EditVenta />} />
                  <Route path='/venta/show/:id' element={<ShowDetailsSale />} />
                  <Route path='/notification' element={<Notification />} />
                  <Route path='/caja' element={<ShowAllReports />} />
                  <Route path='/apertura' element={<OpenCash />} />
                  <Route path='/cierre/edit/:id' element={<CloseCash />} />
                  <Route path='/video' element={<WebRTCComponent />} />
                  <Route path='/users' element={<ShowAllUsers />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Route>
              </Routes>
            ) : (
              <Routes>
                <Route element={<PrivateRoute isAuth={isAuth} />}>
                  <Route path="/" element={<Home />} />
                  <Route path='/ventas' element={<ShowAllVentas />} />
                  <Route path='/venta' element={<CreateVenta />} />
                  <Route path='/venta/edit/:id' element={<EditVenta />} />
                  <Route path='/venta/show/:id' element={<ShowDetailsSale />} />
                  <Route path='/caja' element={<ShowAllReports />} />
                  <Route path='/apertura' element={<OpenCash />} />
                  <Route path='/cierre/edit/:id' element={<CloseCash />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Route>
              </Routes>
            )}
          </div>
        ) : (
          <Routes>
            <Route path='/' element={<CreateLogin />} />
            <Route path='/user' element={<CreateUser />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  )
}
export default App;