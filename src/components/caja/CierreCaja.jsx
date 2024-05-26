import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Importa también el JavaScript si es necesario
import "materialize-css/dist/css/materialize.min.css";
import { updateCaja } from "../../api/caja";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import LogoutIcon from '@mui/icons-material/Logout';

const CloseCash = ({ caj }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const queyCLient = useQueryClient();
    const [caja, setCaja] = useState({
        id: caj.id,
        fecha_hora: caj.fecha_hora,
        hora: caj.hora,
        operacion: "Cierre",
        montoInicial: caj.montoInicial,
        montoFinal: caj.montoFinal,
        UsuarioEn: caj.UsuarioEn,
    });

    const editCaja = useMutation({
        mutationFn: updateCaja,
        onSuccess: () => {
            queyCLient.invalidateQueries("caja");
            setOpen(false);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "¡Cierre de caja exitoso!",
                showConfirmButton: false,
                timer: 1500,
            });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        editCaja.mutate({
            ...caja,
        });
    };

    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        setCaja((caja) => ({
            ...caja,
            [name]: value,
        }));
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        height: 500,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            {/* <EditIcon className="delete-icon" /> */}
            <button
                type="button"
                className="round-button"
                onClick={handleOpen}
                >
                <LogoutIcon className="delete-icon" />
            </button>

            <div className="fondo-from-conteiner">
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Cierre de caja
                        </Typography>
                        <form className="col s12" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className=" col s6">
                                    <input
                                        disabled
                                        id="id"
                                        type="text"
                                        name="id"
                                        className="validate"
                                        value={caja.id}
                                        onChange={handleChangeEdit}
                                    />
                                    <label htmlFor="disabled">Apertura:</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s3">
                                    <input
                                        disabled
                                        id="fecha_hora"
                                        name="fecha_hora"
                                        type="date"
                                        className="validate"
                                        value={caja.fecha_hora}
                                        onChange={handleChangeEdit}
                                    />
                                    <label htmlFor="fecha_hora">Fecha</label>
                                </div>
                                <div className="col s3">
                                    <input disabled
                                        id="hora"
                                        name="hora"
                                        type="time"
                                        className="validate"
                                        value={caja.hora}
                                        onChange={handleChangeEdit}
                                    />
                                    <label htmlFor="fecha_hora">Hora</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s3">
                                    <input
                                        disabled
                                        id="montoInicial"
                                        name="montoInicial"
                                        type="number"
                                        className="validate"
                                        value={caja.montoInicial}
                                        onChange={handleChangeEdit}
                                    />
                                    <label htmlFor="montoInicial">Monto Inicial</label>
                                </div>
                                <div className="col s3">
                                    <input
                                        id="montoFinal"
                                        name="montoFinal"
                                        type="number"
                                        className="validate"
                                        value={caja.montoFinal}
                                        onChange={handleChangeEdit}
                                    />
                                    <label htmlFor="montoFinal">Monto Final</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col s3">
                                    <input
                                        disabled
                                        id="operacion"
                                        name="operacion"
                                        type="text"
                                        className="validate"
                                        value={caja.operacion}
                                        onChange={handleChangeEdit}
                                    />
                                    <label htmlFor="operacion">Operacion</label>
                                </div>
                                <div className="col s3">
                                    <input
                                        disabled
                                        id="UsuarioEn"
                                        name="UsuarioEn"
                                        type="number"
                                        className="validate"
                                        value={caja.UsuarioEn}
                                        onChange={handleChangeEdit}
                                    />
                                    <label htmlFor="UsuarioEn">Usuario Encargado</label>
                                </div>
                            </div>
                            <div className="row">
                                <a href="/caja">
                                    <button type="submit" className="btn-primary">
                                        Guardar
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-secondary"
                                        onClick={handleClose}
                                    >
                                        Cancelar
                                    </button>
                                </a>
                            </div>
                        </form>
                    </Box>
                </Modal>
            </div>
        </>

    )

}
export default CloseCash;


