import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "materialize-css/dist/css/materialize.min.css";
import { updateProduct } from "../../api/product";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";

const EditProduct = ({ prod }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const queyCLient = useQueryClient();
  const [producto, setProducto] = useState({
    id: prod.id,
    nombreProducto: prod.nombreProducto,
    stock: prod.stock,
    precio: prod.precio,
    descripcion: prod.descripcion,
  });

  const editProduct = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queyCLient.invalidateQueries("productos");
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
    editProduct.mutate({
      ...producto,
    });
  };

  const handleChangeEdit = (e) => {
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
      <div className="fondo-from-conteiner">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" className="dialogContentText">
              Editar informacion del producto
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
                    value={producto.id}
                    onChange={handleChangeEdit}
                  />
                  <label htmlFor="disabled">Número</label>
                </div>
              </div>
              <div className="row">
              <div className="col s3">
              <input
                id="nombreProducto"
                name="nombreProducto"
                type="text"
                className="validate"
                value={producto.nombreProducto}
                onChange={handleChangeEdit}
                />
              <label htmlFor="nombreProducto">Nombre del producto</label>
              </div>

                <div className="col s3">
                  <input
                    id="descripcion"
                    name="descripcion"
                    type="text"
                    className="validate"
                    value={producto.descripcion}
                    onChange={handleChangeEdit}
                  />
                  <label htmlFor="descripcion">Descripción</label>
                </div>
              </div>
              <div className="row">
                <div className="col s3">
                  <input
                    id="precio"
                    name="precio"
                    type="number"
                    className="validate"
                    value={producto.precio}
                    onChange={handleChangeEdit}
                  />
                  <label htmlFor="precio">Precio</label>
                </div>
                <div className="col s3">
                  <input
                    id="stock"
                    name="stock"
                    type="number"
                    className="validate"
                    value={producto.stock}
                    onChange={handleChangeEdit}
                  />
                  <label htmlFor="stock">stock</label>
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
export default EditProduct;