import React, { useState } from "react";
import { } from "../StyleHome.css";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ArticleIcon from '@mui/icons-material/Article';
import IconButton from '@mui/material/IconButton';

const ShowDetailUser = ({ user }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const [usuario, setUsuario] = useState({
        id: user.id,
        nombreUsuario: user.nombreUsuario,
        empleado: user.empleado.cedula,
        nombreEmpleado: user.empleado.nombre,
        apellidosEmpleado: user.empleado.apellidos,
        emailEmpleado: user.empleado.email,
    });
    const handleClose = () => {
        setOpen(false);
        setUsuario({
            id: user.id,
            nombreUsuario: user.nombreUsuario,
            empleado: user.empleado.cedula,
            nombreEmpleado: user.empleado.nombre,
            apellidosEmpleado: user.empleado.apellidos,
            emailEmpleado: user.empleado.email,
        });
    };
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        height: 450,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <button
                type="button"
                className="round-button"
                onClick={handleOpen}
            >
                <ArticleIcon className="delete-icon" />
            </button>

            <div className="fondo-from-conteiner">
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <IconButton aria-label="close" onClick={handleClose} className="custom-icon-button">
                            <CloseIcon />
                        </IconButton>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className="dialogContentText">
                            Mostrar información del usuario
                        </Typography>
                        <form className="col s12">
                            <div className="row">
                                <div className="col s6">
                                    <input
                                        disabled
                                        id="id"
                                        type="number"
                                        name="id"
                                        className={"validate" + (usuario.id ? " enabled" : " disabled")}
                                        value={usuario.id}
                                    />
                                    <label for="disabled">ID de usuario</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className=" col s3">
                                    <input
                                        disabled
                                        id="nombreUsuario"
                                        name="nombreUsuario"
                                        type="text"
                                        className={"validate" + (usuario.nombreUsuario ? " enabled" : " disabled")}
                                        value={usuario.nombreUsuario}
                                    />
                                    <label for="disabled">Nombre de Usuario</label>
                                </div>
                                <div className="col s3">
                                    <input
                                        disabled
                                        id="cedula"
                                        name="cedula"
                                        type="number"
                                        className={"validate" + (usuario.empleado ? " enabled" : " disabled")}
                                        value={usuario.empleado}
                                    />
                                    <label for="disabled">Cedula Empleado</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className=" col s3">
                                    <input
                                        disabled
                                        id="nombre"
                                        name="nombre"
                                        type="text"
                                        className={"validate" + (usuario.nombreEmpleado ? " enabled" : " disabled")}
                                        value={usuario.nombreEmpleado}
                                    />
                                    <label for="disabled">Nombre</label>
                                </div>
                                <div className="col s3">
                                    <input
                                        disabled
                                        id="apellidos"
                                        name="apellidos"
                                        type="text"
                                        className={"validate" + (usuario.apellidosEmpleado ? " enabled" : " disabled")}
                                        value={usuario.apellidosEmpleado}
                                    />
                                    <label for="disabled">Apellidos</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6">
                                    <input
                                        disabled
                                        id="email"
                                        name="email"
                                        type="email"
                                        className={"validate" + (usuario.emailEmpleado ? " enabled" : " disabled")}
                                        value={usuario.emailEmpleado}
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>
                            </div>
                        </form>
                    </Box>
                </Modal>
            </div>
        </>
    );

}
export default ShowDetailUser;