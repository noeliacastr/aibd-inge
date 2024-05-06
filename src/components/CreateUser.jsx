import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import {} from "././StyleHome.css";
import { create } from "../api/login";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close"; 
import Box from "@mui/material/Box";
import logoLogin from '../img/logoLogin.png'

const CreateUser = ({}) => {
    const [user, setUser] = useState({
        cedulaEmpleado: "",
        nombreUsuario: "",
        password: "",
    });

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      setUser({
        cedulaEmpleado: "",
        nombreUsuario: "",
        password: "",
      });
    };
    const queyCLient = useQueryClient();

    const createUser = useMutation({
        mutationFn: create, 
        onSuccess: () => {
            queyCLient.invalidateQueries("user");
            setOpen(false);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "¡Usuario creado!",
                showConfirmButton: false,
                timer: 1500,
              });
        },
        onError: () => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Empleado ya posee un usuario",
          });
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault()
        createUser.mutate({
            ...user,
        });
        setUser({
          cedulaEmpleado: "",
          nombreUsuario: "",
          password: "",
        });
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser((user) => ({
            ...user,
            [name]: value,
        }));
    };


return (
<>
{/* <a onClick ={handleOpen}>¿No tienes una cuenta?</a> */}
<div>
  <section  className="fondo-user">
    <div className="box">
      <div  className="containeir">
        <div className="from">
          <img src={logoLogin} alt="Alicia's Avatar" className="avatar-imageU"/>
            <div>
              <h2>Bienvenido a AIBD</h2>
              <h1>El sistema se basa en seguridad-detección de amenazas, servicio 
                  al cliente y producción empresarial, 
                  con el apoyo de Inteligencia Artificial, Alicia, por medio de la recolección 
                  de imágenes y cámaras en tiempo real, y así brindar las alertas necesarias. </h1>
            </div>
        </div>
      </div>
                    {/* <form> */}
      <div className="containerRightU">
        <div className="from">
          <h2>Crea tu usuario</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="input-field col s3">
                  <input
                    type="text" name="cedulaEmpleado" placeholder="Cédula" 
                    value={user.cedulaEmpleado} onChange={handleChange}/>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s3">
                  <input
                    
                    name="nombreUsuario" type="text" placeholder="Nombre de usuario"
                    value={user.nombreUsuario} onChange={handleChange}/>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s3">
                  <input
                    name="password" type="password" placeholder="Contraseña"
                    value={user.password} onChange={handleChange}/>
                </div>
              </div>
              <p className="forget">
              {/* <CreateUser /> */}
              <a href="/">¿Ya tienes cuenta? </a>
              </p>
              <div className="inputBoxU">
                <input type="submit" value="Guardar" onClick={handleSubmit}/>
              </div>
          </form>
      </div>
    </div>
                    {/* </form> */}
    </div>
  </section>
            {/* </Dialog> */}
  </div>
</>
);
};
export default CreateUser;
