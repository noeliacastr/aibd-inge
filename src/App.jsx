import * as React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import CreateEmpleado from './components/CreateEmpleado';
import CreateLogin from './components/CreateLogin';
import ShowEmpleado from './components/ShowEmpleado'
import Home from './components/Home';
import EditEmpleado from './components/EditEmpleado';
import AuthenticatedComponent from './components/Authenticated';


function App() {
  // const navigate = useNavigate() 
  // const PrivateRoute = ({ element, ...props }) => {
  //   // Aquí va la lógica de autenticación
  //   const isAuthenticated = localStorage.getItem('token');
  
  //   // Dependiendo de la autenticación, se redirige o se permite el acceso a la ruta
  //   if (isAuthenticated) {
  //     return <Route {...props} element={element} />;
  //   } else {
  //     // Puedes redirigir a la página de inicio de sesión u otra página de acceso denegado
  //     return navigate('/');
  //   }
  // }

  return (
    <>
      <div className="App">
      <BrowserRouter>
  
      <Routes>
        <Route path='/'  exact element={<CreateLogin/>}/>
        
        <Route path='/home' element={<Home/>}/> 
        <Route path='/empleados' element={<ShowEmpleado/>}/>
        <Route path='/empleado' element ={<CreateEmpleado/>} />
        <Route path='/empleado/edit/:id' element={<EditEmpleado/>} />
        
      </Routes>
      </BrowserRouter>
      
    </div>
    </>
  )
}

export default App;
