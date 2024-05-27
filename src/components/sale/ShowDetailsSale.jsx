    import React, { useState, useRef  } from "react";
    import { useMutation, useQueryClient } from "@tanstack/react-query"; // Importa también el JavaScript si es necesario
    import "materialize-css/dist/css/materialize.min.css";
    import { updateVenta } from "../../api/venta";
    import Box from "@mui/material/Box";
    import Typography from "@mui/material/Typography";
    import Modal from "@mui/material/Modal";
    import ArticleIcon from '@mui/icons-material/Article';
    import Swal from "sweetalert2";
    import IconButton from '@mui/material/IconButton';
    import CloseIcon from "@mui/icons-material/Close";

    import moment from 'moment';
    import 'moment/locale/es';

    const ShowDetailsSale = ({ vent }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const queyCLient = useQueryClient();
    const [venta, setVenta] = useState({
        idVenta: vent.idVenta,
        fecha: moment().format("YYYY-MM-DD"),
        cantidad: vent.cantidad,
        metodoPago: vent.metodoPago,
        estado: vent.estado,
        totalVenta: vent.totalVenta,
        producto: vent.producto,

    });
    const formatDateE = (date) => {
        // const formattedDate = moment(date).format('YYYY-MM-DD');
        const formattedDate = moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");
        return formattedDate;
    }
    const editVenta = useMutation({
        mutationFn: updateVenta,
        onSuccess: () => {
        queyCLient.invalidateQueries("venta");
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
        editVenta.mutate({
        ...venta,
        });
    };


    const handleDateChange = (date) => {
        setVenta((venta) => ({
        ...venta,
        fecha: moment(date).format("YYYY-MM-DD"),
        }));
    };


    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    const dateRef = useRef(null);
    const estadoRef = useRef(null);

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
                Editar informacion de la factura
                </Typography>
                <form className="col s12" onSubmit={handleSubmit}>
                <div className="row">
                    <div className=" col s6">
                    <input
                        disabled
                        id="id"
                        type="text"
                        name="numero"
                        className={"validate" + (venta.idVenta ? " enabled" : " disabled")}
                        value={venta.idVenta}
                    />
                    <label htmlFor="disabled">Número la factura</label>
                    </div>
                </div>
                <div className="row">
                <div className="col s3">
                <input
                    disabled
                    id="fecha"
                    name="fecha"
                    type="date"
                    className={"validate" + (venta.fecha ? " enabled" : " disabled")}
                    value={moment(venta.fecha).format("YYYY-MM-DD")}
                    
                    ref={dateRef}
                    />
                <label htmlFor="disabled">fecha</label>
                </div>

                    <div className="col s3">
                    <input
                        disabled
                        id="estado"
                        name="estado"
                        type="text"
                        className={"validate" + (venta.estado ? " enabled" : " disabled")}
                        value={venta.estado}
                        
                    />
                    <label htmlFor="estado">Estado</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col s3">
                    <input
                        disabled
                        id="cantidad"
                        name="cantidad"
                        type="text"
                        className={"validate" + (venta.cantidad ? " enabled" : " disabled")}
                        value={venta.cantidad}
                        
                    />
                    <label htmlFor="cantidad">Cantidad</label>
                    </div>
                    <div className="col s3">
                    <input
                        disabled
                        id="metodoPago"
                        name="metodoPago"
                        type="text"
                        className={"validate" + (venta.metodoPago ? " enabled" : " disabled")}
                        value={venta.metodoPago}
                        
                    />
                    <label htmlFor="metodoPago">Metodo de pago</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col s3">
                    <input
                        disabled
                        id="producto"
                        name="producto"
                        type="number"
                        className={"validate" + (venta.producto ? " enabled" : " disabled")}
                        value={venta.producto}
                    
                    />
                    <label htmlFor="cantidad">Cantidad</label>
                    </div>
                    <div className="col s3">
                    <input
                        disabled
                        id="totalVenta"
                        name="totalVenta"
                        type="text"
                        className={"validate" + (venta.totalVenta ? " enabled" : " disabled")}
                        value={venta.totalVenta}
                    
                    />
                    <label htmlFor="totalVenta">Venta Total</label>
                    </div>
                </div>
                </form>
            </Box>
            </Modal>
        </div>
        </>
    );
    };
    export default ShowDetailsSale;
