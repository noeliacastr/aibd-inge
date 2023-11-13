import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {login} from "../api/login"
import {} from '././StyleHome.css';
import { useNavigate } from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css';
import aliciaAvatar from '../img/aliciaAvatar.png';
import {useQueryClient, useMutation} from "@tanstack/react-query"


 const CreateLogin = () => {
    const [authentications, setAuthentications] = useState(
        {
         "nombreUsuario": '',
         "password": '',
        }
    );
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const createLogin = useMutation({
        mutationFn: login,
        
        onSuccess: (response) => {
            localStorage.setItem('token', response.data);
            queryClient.invalidateQueries('users');
            navigate('home')
        },
        onError: (error) => {
            console.log(error.message)
        },
    });

    const handleSubmit = async (e) =>{
        e.preventDefault();
        createLogin.mutate({
            ...authentications,
        }
        );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthentications((prevAuthentications) => ({
          ...prevAuthentications,
          [name]: value,
        }));
    };
    useEffect(()=>{
    const authenticated = localStorage.getItem('token');;
    if (authenticated) {
        navigate('home')
    }
    },[])
   

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
                                    <input name='nombreUsuario' type='text' placeholder="Usuario" 
                                    value={authentications.nombreUsuario} onChange={handleChange}/>
                                </div>
                                <div className="input-field col s6">
                                    <input type="password" name="password" placeholder="Contrasena" 
                                    value={authentications.password} onChange={handleChange}/> 
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