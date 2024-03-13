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

const CreateUser = ({}) => {
    const [user, setUser] = useState({
        cedulaEmpleado: 0,
        nombreUsuario: "",
        password: "",
    });

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
      <a onClick={handleOpen}>¿No tienes una cuenta?</a>
        <div>
            <Dialog open={open} onClose={handleClose} className="dialogContainer">
                <DialogTitle>Crea tu usuario</DialogTitle>
                    <DialogContent>
                    <form onSubmit={handleSubmit} className="form-dialog">
          <div className="row">
            <div className="input-field col s6">
              <input
                id="cedulaEmpleado"
                type="text"
                name="cedulaEmpleado"
                className="validate"
                value={user.cedulaEmpleado}
                onChange={handleChange}
              />
              <label htmlFor="cedula">Cedula</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s3">
              <input
                id="nombreUsuario"
                name="nombreUsuario"
                type="text"
                className="validate"
                value={user.nombreUsuario}
                onChange={handleChange}
              />
              <label htmlFor="nombre">Nombre de Usuario</label>
            </div>

            <div className="input-field col s3">
              <input
                id="password"
                name="password"
                type="password"
                className="validate"
                value={user.password}
                onChange={handleChange}
              />
              <label htmlFor="apellidos">Contraseña</label>
            </div>
          </div>
        </form>
        <div className="row">
          <button type="submit"  className="button-primary"
          onClick={handleSubmit}>
            Guardar
          </button>

          <button
            type="button"
            className="button-secondary"
            onClick={handleClose}
          >
            Cancelar
          </button>
        </div>
                    </DialogContent>
            </Dialog>
        </div>
        </>
    );
};
export default CreateUser;
