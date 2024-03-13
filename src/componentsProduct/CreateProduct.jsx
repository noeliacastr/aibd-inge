import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import {} from "../components/StyleHome.css";
import { createProduct } from "../api/product";
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
import CloseIcon from "@mui/icons-material/Close"; // Asegúrate de importar el icono que necesitas
import Box from "@mui/material/Box";


const CreateProduct = ({}) => {
  const [producto, setProducto] = useState({
    idProducto: 0,
    nombreProducto: "",
    stock: 0,
    descripcion: "",
    precio: 0,
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  M.AutoInit();
  const queyCLient = useQueryClient();

  const create = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queyCLient.invalidateQueries("producto");
      setOpen(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Producto agregado!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    create.mutate({
      ...producto,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((producto) => ({
      ...producto,
      [name]: value,
    }));
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
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
            <span>Agregar</span>
          </button>
        </a>
      </div>
      
      <Dialog open={open} onClose={handleClose} className="dialogContainer">
        <DialogTitle>Agregar Producto</DialogTitle>
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
              <div className="input-field col s3">
                <input
                  id="nombreProducto"
                  name="nombreProducto"
                  type="text"
                  className="validate"
                  value={producto.nombreProducto}
                  onChange={handleChange}
                />
                <label htmlFor="nombreProducto">Nombre del producto</label>
              </div>

              <div className="input-field col s3">
                <input
                  id="descripcion"
                  name="descripcion"
                  type="text"
                  className="validate"
                  value={producto.descripcion}
                  onChange={handleChange}
                />
                <label htmlFor="descripcion">Descripción o categoria</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s3">
                <input
                  id="precio"
                  name="precio"
                  type="number"
                  className="validate"
                  value={producto.precio}
                  onChange={handleChange}
                />
                <label htmlFor="precio">precio</label>
              </div>
              <div className="input-field col s3">
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  className="validate"
                  value={producto.stock}
                  onChange={handleChange}
                />
                <label htmlFor="stock">stock</label>
              </div>
            </div>
          </form>
          
          <div className="row">
            <button type="submit"  className="button-primary"
            onClick={handleSubmit}>
              Guardar
              <a href="/productos"></a>
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
    // <EmployeeForm onSubmit={handleSubmit} initialValue={{}} />
  );
};

export default CreateProduct;