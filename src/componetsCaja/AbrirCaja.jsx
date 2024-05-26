import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import { } from "../components/StyleHome.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import moment from 'moment';
import 'moment/locale/es';
import { createCaja, getInformes } from "../api/caja";
import { getUser } from "../api/usurario";

const OpenCash = () => {

    const [caja, setCaja] = useState({
        fecha_hora: "",
        hora: "",
        operacion: "",
        montoInicial: "",
        montoFinal: 0,
        UsuarioEn: "",
    });
    const {
        isLoading,
        data: usuarios,
        isError,
        error,
    } = useQuery({
        queryKey: ["usuarios"],
        queryFn: getUser,
    });
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false);
        setCaja({
        fecha_hora: "",
        hora: "",
        operacion: "",
        montoInicial: "",
        montoFinal: "",
        UsuarioEn: "",
        });
    };

    const queryClient = useQueryClient();
    M.AutoInit();

    const formatDate = (date) => {
        // const formattedDate = moment(date).format('YYYY-MM-DD');
        const formattedDate = moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");
        return formattedDate;
    }
    const create = useMutation({
        mutationFn: createCaja,
        onSuccess: () => {
            queryClient.invalidateQueries("caja");
            setOpen(false);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "¡Appertura de caja exitosa!",
                showConfirmButton: false,
                timer: 1500,
            });
        }, onError: (error) => {
            console.log(error);
        }
    });

    const hanldeSubmit = (event) => {
        console.log(caja);
        event.preventDefault();
        create.mutate({
            ...caja,
        });
        setCaja({
            fecha_hora: "",
            hora: "",
            operacion: "",
            montoInicial: "",
            montoFinal: "",
            UsuarioEn: "",
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCaja((caja) => ({
            ...caja,
            [name]: name === "fecha_hora" ? moment(value).format("YYYY-MM-DD") : value,

        }));
    };
    const handleDateChange = (date) => {
        setVenta((caja) => ({
            ...caja,
            fecha: moment(date).format("YYYY-MM-DD"),
        }));
    };

    const dateRef = useRef(null);
    const estadoRef = useRef(null);

    return (
        <>
            <div>
                <div className=" bottonAgregarCaj border w-full h-40 flex items-center justify-center">
                <a className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group" onClick={handleOpen}>
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">Caja</span>
                    <span className="relative invisible">Caja</span>
                </a>
                </div>
                <Dialog open={open} onClose={handleClose} className="dialogContainer">
                    <DialogTitle className="dialogContentText">Abrir caja</DialogTitle>
                    <IconButton aria-label="close" onClick={handleClose} className="custom-icon-button">
                        <CloseIcon />
                    </IconButton>
                    <DialogContent>
                        <form onSubmit={hanldeSubmit} className="form-dialog">
                            <div className="row">
                                <div className="input-field col s3">
                                    <input
                                        id="fecha_hora"  // Cambiar de "date" a "fecha"
                                        name="fecha_hora"  // Cambiar de "date" a "fecha"
                                        type="date"
                                        className="validate"
                                        value={moment(caja.fecha_hora).format("YYYY-MM-DD")}
                                        onChange={handleChange}
                                        ref={dateRef}
                                    />
                                    <label htmlFor="fecha_hora">Fecha</label>
                                </div>
                                <div className="input-field col s3">
                                    <input
                                        id="hora"  // Cambiar de "date" a "fecha"
                                        name="hora"  // Cambiar de "date" a "fecha"
                                        type="time"
                                        className="validate"
                                        value={caja.hora}
                                        onChange={handleChange}

                                    />
                                    <label htmlFor="hora">Hora</label>
                                </div>

                            </div>
                            <div className="row">
                                <div className="input-field col s3">
                                    <input
                                        id="montoInicial"
                                        name="montoInicial"
                                        type="number"
                                        className="validate"
                                        value={caja.montoInicial}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="montoInicial">Monto Inicial</label>
                                </div>
                                <div className="col s3">
                                    <input
                                    disabled
                                        id="montoFinal"
                                        name="montoFinal"
                                        type="number"
                                        value={caja.montoFinal}
                                        className={"validate" + (caja.montoFinal ? " enabled" : " disabled")}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="montoFinal">Monto Final</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s3">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Operacion</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="operacion"
                                            type="text"
                                            value={caja.operacion}
                                            label="Choose your option"
                                            onChange={handleChange}
                                            name="operacion"
                                        >
                                            <MenuItem value="apertura">Apertura</MenuItem>
                                            {/* <MenuItem value="cierre">Cierre</MenuItem> */}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="input-field col s3">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Usuario</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="UsuarioEn"
                                            type="text"
                                            value={caja.UsuarioEn}
                                            label="Choose your option"
                                            onChange={handleChange}
                                            name="UsuarioEn"
                                        >
                                            <MenuItem value="">Seleccionar usuario</MenuItem>
                                            {usuarios && usuarios.length > 0 ? (
                                                usuarios.map((usuario) => (
                                                    <MenuItem key={usuario.id} value={usuario.id}>
                                                        {usuario.id}-{usuario.nombreUsuario}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem disabled>No hay productos disponibles</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </form>
                        <div className="row">
                            <button type="submit" className="button-primary"
                                onClick={hanldeSubmit}>
                                Guardar
                                <a href="/ventas"></a>
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

}

export default OpenCash;