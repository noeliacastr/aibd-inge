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
    stock: "",
    descripcion: "",
    precio: "",
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setProducto({
    nombreProducto: "",
    stock: "",
    descripcion: "",
    precio: "",
    });
  };
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
    setProducto({
      nombreProducto: "",
      stock: "",
      descripcion: "",
      precio: "",
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
      <div className=" bottonAgregarPro border w-full h-40 flex items-center justify-center">
      <a className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group" onClick={handleOpen}>
        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </span>
        <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">Producto</span>
        <span className="relative invisible">Producto</span>
      </a>
    </div>
      
      <Dialog open={open} onClose={handleClose} className="dialogContainer">
        <DialogTitle className="dialogContentText">Agregar Producto</DialogTitle>
        <a href="/productos" >
        <IconButton aria-label="close" onClick={handleClose} className="custom-icon-button">
          <CloseIcon />
        </IconButton>
        </a>
        <DialogContent >
          <DialogContentText className="dialogContentText">
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
                <label htmlFor="precio">Precio</label>
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
                <label htmlFor="stock">Stock</label>
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