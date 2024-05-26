import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmployee } from "../../api/empleado";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import ArticleIcon from '@mui/icons-material/Article';
import IconButton from '@mui/material/IconButton';


const ShowDetailsEmp = ({ emp }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEmploye({
            cedula: emp.cedula,
            nombre: emp.nombre,
            apellidos: emp.apellidos,
            telefono: emp.telefono,
            email: emp.email,
            domicilio: emp.domicilio,
            rol: emp.rol,
        });

    };

    const queyCLient = useQueryClient();
    const [employe, setEmploye] = useState({
        cedula: emp.cedula,
        nombre: emp.nombre,
        apellidos: emp.apellidos,
        telefono: emp.telefono,
        email: emp.email,
        domicilio: emp.domicilio,
        rol: emp.rol,
    });

    const editEmpleado = useMutation({
        mutationFn: updateEmployee,
        onSuccess: () => {
            queyCLient.invalidateQueries("employee");
            setOpen(false);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "¡Datos actualizados!",
                showConfirmButton: false,
                timer: 1500,
            });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        editEmpleado.mutate({
            ...employe,
        });
        setEmploye({
            cedula: emp.cedula,
            nombre: emp.nombre,
            apellidos: emp.apellidos,
            telefono: emp.telefono,
            email: emp.email,
            domicilio: emp.domicilio,
            rol: emp.rol,
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
                            Mostrar información del empleado
                        </Typography>
                        <form className="col s12" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col s3">
                                    <input
                                        disabled
                                        id="cedula"
                                        type="text"
                                        name="cedula"
                                        className={"validate" + (employe.cedula ? " enabled" : " disabled")}
                                        value={employe.cedula}
                                    />
                                    <label for="disabled">Cedula</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className=" col s3">
                                    <input
                                        disabled
                                        id="nombre"
                                        name="nombre"
                                        type="text"
                                        className={"validate" + (employe.nombre ? " enabled" : " disabled")}
                                        value={employe.nombre}
                                    />
                                    <label for="disabled">Nombre</label>
                                </div>
                                <div className="col s3">
                                    <input
                                        disabled
                                        id="apellidos"
                                        name="apellidos"
                                        type="text"
                                        className={"validate" + (employe.apellidos ? " enabled" : " disabled")}
                                        value={employe.apellidos}
                                    />
                                    <label for="disabled">Apellidos</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s3">
                                    <input
                                        disabled
                                        id="telefono"
                                        name="telefono"
                                        type="number"
                                        className={"validate" + (employe.telefono ? " enabled" : " disabled")}
                                        value={employe.telefono}
                                    />
                                    <label for="disabled">Telefono</label>
                                </div>
                                <div className=" col s3">
                                    <input
                                        disabled
                                        id="domicilio"
                                        name="domicilio"
                                        type="text"
                                        className={"validate" + (employe.domicilio ? " enabled" : " disabled")}
                                        value={employe.domicilio}
                                    />
                                    <label for="disabled">Domicilio</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s3">
                                    <input
                                        disabled
                                        id="rol"
                                        name="rol"
                                        type="text"
                                        className={"validate" + (employe.rol ? " enabled" : " disabled")}
                                        value={employe.rol}
                                    />
                                    <label for="disabled">Rol</label>
                                </div>
                                <div className="col s3">
                                    <input
                                        disabled
                                        id="email"
                                        name="email"
                                        type="email"
                                        className={"validate" + (employe.email ? " enabled" : " disabled")}
                                        value={employe.email}
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
};
export default ShowDetailsEmp;
