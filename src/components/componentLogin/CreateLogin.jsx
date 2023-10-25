import React, { useState } from 'react';
import axios from 'axios'
import {} from './Login.css';
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
                <form onSubmit={handleSubmit}>
                <div className="input-field col s6">
                <input name='text' type='name' placeholder="Usuario" 
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
        

        
    )


}
export default CreateLogin