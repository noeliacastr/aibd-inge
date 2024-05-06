import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {} from "./StyleHome.css";
import { updateEmployee } from "../api/empleado";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";

const EditEmpleado = ({ emp }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const queyCLient = useQueryClient();
  const [employe, setEmploye] = useState({
    cedula: emp.cedula,
    nombre: emp.nombre,
    apellidos: emp.apellidos,
    telefono: emp.telefono,
    domicilio: emp.domicilio,
  });

  const editEmpleado = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queyCLient.invalidateQueries("employee");
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
    console.log(employe);
    editEmpleado.mutate({
      ...employe,
    });
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    console.log(value);
    console.log(name);
    setEmploye((employe) => ({
      ...employe,
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
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" className="dialogContentText">
              Editar información del empleado
            </Typography>
            <form className="col s12" onSubmit={handleSubmit}>
              <div className="row">
                <div className=" col s6">
                  <input
                    disabled
                    id="cedula"
                    type="text"
                    name="cedula"
                    className={"validate" + (employe.cedula ? " enabled" : " disabled")}
                    value={employe.cedula}
                    onChange={handleChangeEdit}
                  />
                  <label for="disabled">Cedula</label>
                </div>
              </div>
              <div className="row">
                <div className=" col s3">
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    className="validate"
                    value={employe.nombre}
                    onChange={handleChangeEdit}
                  />
                  <label htmlFor="nombre">Nombre</label>
                </div>

                <div className="col s3">
                  <input
                    id="apellidos"
                    name="apellidos"
                    type="text"
                    className="validate"
                    value={employe.apellidos}
                    onChange={handleChangeEdit}
                  />
                  <label htmlFor="apellidos">Apellidos</label>
                </div>
              </div>
              <div className="row">
                <div className="col s3">
                  <input
                    id="telefono"
                    name="telefono"
                    type="number"
                    className="validate"
                    value={employe.telefono}
                    onChange={handleChangeEdit}
                  />
                  <label htmlFor="telefono">Telefono</label>
                </div>
                <div className=" col s3">
                  <input
                    id="domicilio"
                    name="domicilio"
                    type="text"
                    className="validate"
                    value={employe.domicilio}
                    onChange={handleChangeEdit}
                  />
                  <label htmlFor="domicilio">Domicilio</label>
                </div>
              </div>
              <div className="row">
                <a href="/empleados">
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
export default EditEmpleado;
