import React, { useState } from 'react';
import { login } from "../../api/login"
import { useNavigate } from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css'
import aliciaAvatar from '../../assets/img/aliciaAvatar.png';
import logoLogin from '../../assets/img/logoLogin.png'
import { useMutation } from "@tanstack/react-query"
import Swal from "sweetalert2";
import { useAuthStore } from '../../hooks/useAuthStore';

const CreateLogin = () => {

    const [authentications, setAuthentications] = useState({
        "nombreUsuario": '',
        "password": '',
    });

    const navigate = useNavigate();

    const setTokenState = useAuthStore(
        (state) => state.setToken
    )

    const createLogin = useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            setTokenState(response.data);
            Swal.fire({
                title: "¡Hola! soy Alicia",
                html: `<img src="${aliciaAvatar}" alt="Alicia Avatar" class="alicia-img" /> <br/> Cualquier consulta estoy para ayudarte`,
            });
            navigate('/');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        },
        onError: (error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Usuario o contraseña incorrectas",
            });
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        createLogin.mutate({
            ...authentications,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthentications((prevAuthentications) => ({
            ...prevAuthentications,
            [name]: value,
        }));
    };


    return (
        <>
            <section className="fondo-from">
                {/* className="fondo-from" */}
                <div className="box">
                    <div className="container">

                        <div className="from">
                            <h2>Inicio de Sesión </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="input-field col s6">
                                    <input name='nombreUsuario' type='text' placeholder="Usuario"
                                        value={authentications.nombreUsuario} onChange={handleChange} />
                                </div>
                                <div className="input-field col s6">
                                    <input type="password" name="password" placeholder="Contraseña"
                                        value={authentications.password} onChange={handleChange} />
                                </div>
                                <p className="forget">
                                    {/* <CreateUser /> */}
                                    <a href="/user">¿No tienes una cuenta? </a>
                                </p>
                                <div className="inputBox">

                                    <input type="submit" value="Ingresar" onClick={handleSubmit} />

                                </div>

                                {/* <p Link to="" class="forget"><a Link to="/create-user">¿No tienes una cuenta? </a></p> */}
                            </form>

                        </div>
                    </div>
                    <div className="containerRight">

                        <div className="from">
                            <img src={logoLogin} alt="Alicia's Avatar" className="avatar-image" />
                            <div>
                                <h2>Bienvenido a AIBD</h2>
                                <h1>Te estamos vigilando</h1>

                            </div>


                        </div>
                    </div>

                </div>

            </section>
        </>


    )

}

export default CreateLogin