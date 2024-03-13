import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {} from "./StyleHome.css";
import { updateProducto } from "../api/producto";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";

const EditProducto = ({ pro }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const queyCLient = useQueryClient();
  const [product, setProduct] = useState({
    id: pro.id,
    nombreProducto: pro.nombreProducto,
    stock: pro.stock,
    precio: pro.precio,
    descripcion: pro.descripcion,
  });

  const editProducto = useMutation({
    mutationFn: updateProducto,
    onSuccess: () => {
      queyCLient.invalidateQueries("product");
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
    console.log(product);
    editProducto.mutate({
      ...product
    });
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    console.log(value);
    console.log(name);
    setProduct((product) => ({
      ...product,
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
              Editar informacion del producto
            </Typography>
            <form className="col s12" onSubmit={handleSubmit}>
              <div className="rowCreate">
                <div className=" col s6">
                  <input
                    disabled
                    id="id"
                    type="number"
                    name="id"
                    className="validate"
                    value={product.id}
                    onChange={handleChangeEdit}
                  />
                  <label for="disabled">Codigo del producto:</label>
                </div>
              </div>
              <div className="row">
                <div className=" col s3">
                  <input
                    id="nombreProducto"
                    name="nombreProducto"
                    type="text"
                    className="validate"
                    value={product.nombreProducto}
                    onChange={handleChangeEdit}
                  />
                  <label htmlFor="nombre">Nombre del Producto:</label>
                </div>

                <div className="col s3">
                  <input
                    id="stock"
                    name="stock"
                    type="number"
                    className="validate"
                    value={product.stock}
                    onChange={handleChangeEdit}
                  />
                  <label htmlFor="apellidos">Stock del producto:</label>
                </div>
              </div>
              <div className="row">
                <div className="col s3">
                  <input
                    id="precio"
                    name="precio"
                    type="number"
                    className="validate"
                    value={product.precio}
                    onChange={handleChangeEdit}
                  />
                  <label htmlFor="telefono">Precio del producto:</label>
                </div>

                <div className=" col s3">
                  <input
                    id="descripcion"
                    name="descripcion"
                    type="text"
                    className="validate"
                    value={product.descripcion}
                    onChange={handleChangeEdit}
                  />
                  <label htmlFor="domicilio">Descripcion:</label>
                </div>
              </div>
              <div className="row">
                <a href="/productos">
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
export default EditProducto;
