import React, { useState } from 'react';
import axios from 'axios'
import {} from '../StyleHome.css';
import { useNavigate } from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css';
import aliciaAvatar from './../../img/aliciaAvatar.png';



const endpoint = 'http://localhost:8000/aibd/empleado/login'

const CreateLogin = () => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    M.AutoInit();

    const handleEmpleUsu = (e) => {
        setNombreUsuario(e.target.value)
    };
    const handleEmplePassword = (e) =>{
        setPassword(e.target.value)
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post(endpoint, {nombreUsuario, password});
            console.log(response.data);
            localStorage.setItem('token',JSON.stringify(response.data));
            navigate('/home')
        }catch (error){
            console.log(error);
        }
    };

    

    return(
        <>
        <section  className="fondo-from">
        {/* className="fondo-from" */}
                <div className="box">
                    <div className="container">
        
                        <div className="from">
                            <img src={aliciaAvatar} alt="Alicia's Avatar" className="avatar-image"/>
                            <h2>Welcome to AIBD</h2>
                                <h1>El sistema se basa en seguridad-detección de amenazas, servicio 
                                al cliente y producción empresarial, 
                                con el apoyo de Inteligencia Artificial, Alicia, por medio de la recolección 
                                de imágenes y cámaras en tiempo real, y así brindar las alertas necesarias. </h1>
                        
                
                        </div>
                    </div>
                    <div className="containerRight">
        
                        <div className="from">
                            
                            <h2>Inicio de Sesión </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="input-field col s6">
                                    <input name='name' type='text' placeholder="Usuario" 
                                    value={nombreUsuario} onChange={ handleEmpleUsu}/>
                                </div>
                                <div className="input-field col s6">
                                    <input type="password" name="password" placeholder="Contrasena" 
                                    value={password} onChange={handleEmplePassword}/> 
                                </div>
                                <div className="inputBox">
                                    <input type="submit" value="Iniciar"/>
                                </div>
                                {/* <p Link to="" class="forget"><a Link to="/create-user">¿No tienes una cuenta? </a></p> */}
                            </form>
                
                        </div>
                    </div>
        
                </div>
                
        </section>
        </>

        
    )


}
export default CreateLogin