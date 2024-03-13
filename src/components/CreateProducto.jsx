import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import {} from "././StyleHome.css";
import { createProducto } from "../api/producto";
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
import CloseIcon from "@mui/icons-material/Close"; // Asegúrate de importar el icono que necesitas



const CreateProducto = () => {
  const [product, setProduct] = useState({
    nombreProducto: "",
    stock: 0,
    precio: 0,
    descripcion: "",
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  M.AutoInit();
  const queyCLient = useQueryClient();

  const create = useMutation({
    mutationFn: createProducto,
    onSuccess: () => {
      queyCLient.invalidateQueries("product");
      setOpen(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "!Producto agregado!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    create.mutate({
      ...product,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((product) => ({
      ...product,
      [name]: value,
    }));
  };

  return (
    <div>
    <div className="bottonAgregar">
      <a>
        <button
          className="button"
          style={{ verticalAlign: "middle" }}
          onClick={handleOpen}
        >
          <span>Agregar un nuevo producto</span>
        </button>
      </a>
    </div>
    
    <Dialog open={open} onClose={handleClose} className="dialogContainer">
      <DialogTitle>Agregar producto</DialogTitle>
      <a href="/productos" >
      <IconButton aria-label="close" onClick={handleClose} className="custom-icon-button">
        <CloseIcon />
      </IconButton>
      </a>
      <DialogContent >
        <DialogContentText>
          Agregue un nuevo producto al sistema, llenando los siguientes
          campos.
        </DialogContentText>
        
        <form onSubmit={handleSubmit} className="form-dialog">
          <div className="row">
            <div className="input-field col s6">
              <input
                id="nombreProducto"
                type="text"
                name="nombreProducto"
                className="validate"
                value={product.nombreProducto}
                onChange={handleChange}
              />
              <label htmlFor="nombreProducto">Nombre del Producto:</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s3">
              <input
                id="stock"
                name="stock"
                type="number"
                className="validate"
                value={product.stock}
                onChange={handleChange}
              />
              <label htmlFor="nombre">Cantidad del producto:</label>
            </div>

            <div className="input-field col s3">
              <input
                id="precio"
                name="precio"
                type="number"
                className="validate"
                value={product.precio}
                onChange={handleChange}
              />
              <label htmlFor="apellidos">Precio del producto:</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s3">
              <input
                id="descripcion"
                name="descripcion"
                type="text"
                className="validate"
                value={product.descripcion}
                onChange={handleChange}
              />
              <label htmlFor="telefono">Descripcion:</label>
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
  );
};

export default CreateProducto;