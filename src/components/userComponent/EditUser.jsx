import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { } from "../StyleHome.css";
import { updateUser } from "../../api/usuario";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";

const EditUser = ({ user }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const queyCLient = useQueryClient();
    const [usuario, setUsuario] = useState({
        id: user.id,
        nombreUsuario: user.nombreUsuario,
        password: user.password,
    });

    const editUsuario = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queyCLient.invalidateQueries("users");
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
        editUsuario.mutate({
            ...usuario,
        });
    };

    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        setUsuario((usuario) => ({
            ...usuario,
            [name]: value,
        }));
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        height: 400,
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
                <EditIcon className="delete-icon" />
            </button>
            <div>
                <Modal open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className="dialogContentText">
                            Editar perfil
                        </Typography>
                        <form className="col s12" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className=" col s6">
                                    <input
                                        disabled
                                        id="id"
                                        type="text"
                                        name="id"
                                        className={"validate" + (user.id ? " enabled" : " disabled")}
                                        value={user.id}
                                        onChange={handleChangeEdit}
                                    />
                                    <label for="disabled">ID</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className=" col s3">
                                    <input
                                        id="nombre"
                                        name="nombre"
                                        type="text"
                                        className="validate"
                                        value={user.nombreUsuario}
                                        onChange={handleChangeEdit}
                                    />
                                    <label htmlFor="nombre">Nombre</label>
                                </div>

                            </div>
                        </form>
                    </Box>

                </Modal>
            </div>
        </>
    )
}
export default EditUser;

