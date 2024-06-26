import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import M from "materialize-css/dist/js/materialize.min.js"; // Importa también el JavaScript si es necesario
import "materialize-css/dist/css/materialize.min.css";
import {} from "../components/StyleHome.css";
import { updateVenta } from "../api/venta";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";

const EditVenta = ({ vent }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const queyCLient = useQueryClient();
  const [venta, setVenta] = useState({
    idVenta: vent.idVenta,
    fecha: vent.fecha,
    cantidad: vent.cantidad,
    metodoPago: vent.metodoPago,
    estado: vent.estado,
    totalVenta: vent.totalVenta,
    producto: vent.producto,

  });

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
    console.log(venta);
    editVenta.mutate({
      ...venta,
    });
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    console.log(value);
    console.log(name);
    setVenta((venta) => ({
      ...venta,
      [name]: value,
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

  return (
    <>
      <button
          type="button"
          className="round-button"
          onClick={handleOpen}
        >
          <EditIcon className="delete-icon" />
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
              Editar informacion de la factura
            </Typography>
            <form className="col s12" onSubmit={handleSubmit}>
              <div className="rowCreate">
                <div className=" col s6">
                  <input
                    disabled
                    id="id"
                    type="text"
                    name="numero"
                    className="validate"
                    value={venta.idVenta}
                    onChange={handleChangeEdit}
                  />
                  <label htmlFor="disabled">Número la factura</label>
                </div>
              </div>
              <div className="row">
              <div className="col s3">
              <input
                id="date"
                name="date"
                type="date"
                className="validate"
                value={venta.fecha}
                onChange={handleChangeEdit}
                />
               <label htmlFor="disabled">fecha</label>
              </div>

                <div className="col s3">
                  <input
                    id="estado"
                    name="estado"
                    type="text"
                    className="validate"
                    value={venta.estado}
                    onChange={handleChangeEdit}
                  />
                  <label htmlFor="estado">Estado</label>
                </div>
              </div>
              <div className="row">
                <div className="col s3">
                  <input
                    id="cantidad"
                    name="cantidad"
                    type="text"
                    className="validate"
                    value={venta.cantidad}
                    onChange={handleChangeEdit}
                  />
                  <label htmlFor="cantidad">Cantidad</label>
                </div>
                <div className="col s3">
                  <input
                    id="metodoPago"
                    name="metodoPago"
                    type="text"
                    className="validate"
                    value={venta.metodoPago}
                    onChange={handleChangeEdit}
                  />
                  <label htmlFor="metodoPago">Metodo de pago</label>
                </div>
              </div>

              <div className="row">
                <div className="col s3">
                  <input
                    id="producto"
                    name="producto"
                    type="number"
                    className="validate"
                    value={venta.producto}
                    onChange={handleChangeEdit}
                  />
                  <label htmlFor="cantidad">Cantidad</label>
                </div>
                <div className="col s3">
                  <input
                    id="totalVenta"
                    name="totalVenta"
                    type="text"
                    className="validate"
                    value={venta.totalVenta}
                    onChange={handleChangeEdit}
                  />
                  <label htmlFor="totalVenta">Venta Total</label>
                </div>
              </div>
              <div className="row">
                <a href="/ventas">
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
  );
};
export default EditVenta;
