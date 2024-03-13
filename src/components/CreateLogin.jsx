import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {login} from "../api/login"
import {} from '././StyleHome.css';
import { useNavigate, Link } from 'react-router-dom'
import { useNavigate, Link } from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css';
import aliciaAvatar from './../img/aliciaAvatar.png';
import logoAI from '../img/logoAI.png'
import logoLogin from '../img/logoLogin.png'
import {useQueryClient, useMutation} from "@tanstack/react-query"
import Swal from "sweetalert2";
import CreateUser from './CreateUser';
import CreateUser from './CreateUser';

 const CreateLogin = () => {
    //   const handleEnter = () => {
    //     Swal.fire({
    //         title: "¡Hola! soy Alicia",
    //         html: `<img src="${aliciaAvatar}" alt="Alicia Avatar" class="alicia-img" /> <br/> Cualquier consulta estoy para ayudarte`,
    //   const handleEnter = () => {
    //     Swal.fire({
    //         title: "¡Hola! soy Alicia",
    //         html: `<img src="${aliciaAvatar}" alt="Alicia Avatar" class="alicia-img" /> <br/> Cualquier consulta estoy para ayudarte`,
            
    //     });
    // }
    //     });
    // }
    const [authentications, setAuthentications] = useState(
        {
         "nombreUsuario": '',
         "password": '',
        }
    );
    const navigate = useNavigate()
    const handleCreateUserClick = () => {
        <CreateUser />
      };
    const handleCreateUserClick = () => {
        <CreateUser />
      };
    const queryClient = useQueryClient();
  


    const createLogin = useMutation({
        mutationFn: login,
        
        onSuccess: (response) => {
            localStorage.setItem('token', response.data);
            queryClient.invalidateQueries('users');
            navigate('home')
            Swal.fire({
                title: "¡Hola! soy Alicia",
                html: `<img src="${aliciaAvatar}" alt="Alicia Avatar" class="alicia-img" /> <br/> Cualquier consulta estoy para ayudarte`,
                
            });
            
            Swal.fire({
                title: "¡Hola! soy Alicia",
                html: `<img src="${aliciaAvatar}" alt="Alicia Avatar" class="alicia-img" /> <br/> Cualquier consulta estoy para ayudarte`,
                
            });
            
        },
        onError: (error) => {
            console.log(error.message)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Usuario o contraseña incorrectas",
              });
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
                    <div  className="container">
        
                        <div className="from">
                            <img src={logoLogin} alt="Alicia's Avatar" className="avatar-image"/>
                            <div>
                            <h2>Bienvenido a AIBD</h2>
                                <h1>El sistema se basa en seguridad-detección de amenazas, servicio 
                                al cliente y producción empresarial, 
                                con el apoyo de Inteligencia Artificial, Alicia, por medio de la recolección 
                                de imágenes y cámaras en tiempo real, y así brindar las alertas necesarias. </h1>
                            </div>
                
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
                                    <input type="password" name="password" placeholder="Contraseña" 
                                    value={authentications.password} onChange={handleChange}/> 
                                </div>
                                <p className="forget">
                                <CreateUser />
                                </p>
                                <p className="forget">
                                <CreateUser />
                                </p>
                                <div className="inputBox">
                                    <input type="submit" value="Ingresar" onClick={handleSubmit}/>
                                    <input type="submit" value="Ingresar" onClick={handleSubmit}/>
                                    
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