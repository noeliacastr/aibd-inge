import React, { useState } from 'react';
import axios from 'axios'
import {login} from "../api/login"
import {} from './Login.css';
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

    return(
        <section>
            <div className="color"></div>
            <div className="color"></div>
            <div className="color"></div>
        
                <div className="box">
                    {/* <div class="square" style="--i:0;"></div>
                        <div class="square" style="--i:1;"></div>
                        <div class="square" style="--i:2;"></div>
                        <div class="square" style="--i:3;"></div>
                        <div class="square" style="--i:4;"></div> */}
                    <div className="container">
        
                        <div className="from">
                            <img src={aliciaAvatar} alt="Alicia's Avatar" className="avatar-image"/>
                            <h2>Iniciar</h2>
                        
                
                        </div>
                    </div>
                    <div className="containerRight">
        
                        <div className="from">
                            
                            <h2>Welcome to login system</h2>
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
        

        
    )

}

export default CreateLogin