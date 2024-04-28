import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import {} from "../components/StyleHome.css";
import { createVenta } from "../api/venta";
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
import moment from 'moment';
import 'moment/locale/es';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";



const CreateVenta = ({}) => {
  const [venta, setVenta] = useState({
    idVenta: "",
    fecha: moment().format("YYYY-MM-DD"),
    cantidad: '',
    metodoPago: "",
    estado: "",
    totalVenta: "",
    producto: "",
  });
  const [currentDate, setCurrentData] = useState(new Date());
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);

    setVenta({
      idVenta: "",
      fecha: moment().format("YYYY-MM-DD"),
      cantidad: "",
      metodoPago: "",
      estado: "",
      totalVenta: "",
      producto: "",
    });

  };

  M.AutoInit();
  const queryClient = useQueryClient();

  const formatDate = (date) => {
    // const formattedDate = moment(date).format('YYYY-MM-DD');
    const formattedDate = moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");
    return formattedDate;
  }

  const create = useMutation({
    mutationFn: createVenta,
    onSuccess: () => {
      queryClient.invalidateQueries("venta");
      setOpen(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Venta agregado!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    create.mutate({
      ...venta,
    });
    setVenta({
      idVenta: "",
      fecha: moment().format("YYYY-MM-DD"),
      cantidad: "",
      metodoPago: "",
      estado: "",
      totalVenta: "",
      producto: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenta((venta) => ({
      ...venta,
      // [name]: name === "fecha" ? moment(value, "DD-MM-YYYY").format("YYYY-MM-DD") : value,
      [name]: name === "fecha" ? moment(value).format("YYYY-MM-DD") : value,
    }));
  };
  const handleDateChange = (date) => {
    setVenta((venta) => ({
      ...venta,
      fecha: moment(date).format("YYYY-MM-DD"),
    }));
  };

  const dateRef = useRef(null);
  const estadoRef = useRef(null);


  return (
    <div>
      <div className="bottonAgregar">
        <a>
          <button
            className="button"
            style={{ verticalAlign: "middle" }}
            onClick={handleOpen}
          >
            <span>Agregar</span>
          </button>
        </a>
      </div>
      
      <Dialog open={open} onClose={handleClose} className="dialogContainer">
        <DialogTitle>Agregar Factura de venta</DialogTitle>
        <a href="/ventas" >
        <IconButton aria-label="close" onClick={handleClose} className="custom-icon-button">
          <CloseIcon />
        </IconButton>
        </a>
        <DialogContent >
          <DialogContentText>
            Agregue una nueva factura al sistema, llenando los siguientes
            campos.
          </DialogContentText>
          
          <form onSubmit={handleSubmit} className="form-dialog">
            <div className="row">
              <div className="input-field col s3">
                <input
                  id="fecha"  // Cambiar de "date" a "fecha"
                  name="fecha"  // Cambiar de "date" a "fecha"
                  type="date"
                  className="validate"
                  value={moment(venta.fecha).format("YYYY-MM-DD")}
                onChange={handleChange}
                ref={dateRef}
                />
                <label htmlFor="fecha">Fecha</label>
              </div>
              <div className="input-field col s3">
              <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="estado"
                  name="estado"
                  type="text"
                  className="validate"
                  value={venta.estado}
                  onChange={handleChange}
                  ref={estadoRef}
                >
                <MenuItem value="estado">Pago</MenuItem>
                <MenuItem value="estado">Sin Pagar</MenuItem>
                </Select>
              </FormControl>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s3">
                <input
                  id="producto"
                  name="producto"
                  type="number"
                  className="validate"
                  value={venta.producto}
                  onChange={handleChange}
                />
                <label htmlFor="producto">Número de producto </label>
              </div>
              <div className="input-field col s3">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Metodo de pago</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="metodoPago"
                    type="text"
                    value={venta.metodoPago}
                    label="Choose your option"
                    onChange={handleChange}
                    name="metodoPago"
                  >
                  <MenuItem value="metodoPago">Tajerta</MenuItem>
                  <MenuItem value="metodoPago">Efectivo</MenuItem>
                  </Select>
                </FormControl>
              </div>
              
            </div>
            <div className="row">
              <div className="input-field col s3">
                <input
                  id="cantidad"
                  name="cantidad"
                  type="number"
                  className="validate"
                  value={venta.cantidad}
                  onChange={handleChange}
                />
                <label htmlFor="cantidad">Cantidad </label>
              </div>
              <div className="input-field col s3">
                <input
                  id="totalVenta"
                  name="totalVenta"
                  type="text"
                  className="validate"
                  value={venta.totalVenta}
                  onChange={handleChange}
                />
                <label htmlFor="totalVenta">Total de venta</label>
              </div>
            </div>
          </form>
          
          <div className="row">
            <button type="submit"  className="button-primary"
            onClick={handleSubmit}>
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
    
  );
};

export default CreateVenta;
