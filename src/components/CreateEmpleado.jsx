import React, { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import "materialize-css/dist/css/materialize.min.css";
// import "./StyleHome.css";
import { createEmployee } from "../api/empleado";
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


const CreateEmpleado = ({}) => {
  const [employee, setEmployee] = useState({
    cedula: 0,
    nombre: "",
    apellidos: "",
    telefono: "",
    email: "",
    domicilio: "",
    rol: "",
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Verificar si window está definido antes de llamar a M.AutoInit()
      import("materialize-css").then((M) => {
        M.AutoInit();
      });
    }
  }, []);

  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries("employee");
      setOpen(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Empleado agregado!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    create.mutate({
      ...employee,
      
    });
    if (formRef.current) {
      formRef.current.reset();
  }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((employee) => ({
      ...employee,
      [name]: value,
    }));
  };
  

  return (
    <div>
      <div className="bottonAgregar">
        <a>
          <Button
            className="button"
            style={{ verticalAlign: "middle" }}
            onClick={handleOpen}
          >
            <span>Agregar</span>
          </Button>
        </a>
      </div>
      
      <Dialog open={open} onClose={handleClose} className="dialogContainer">
        <DialogTitle>Agregar empleado</DialogTitle>
        <a href="/empleados" >
        <IconButton aria-label="close" onClick={handleClose} className="custom-icon-button">
          <CloseIcon />
        </IconButton>
        </a>
        <DialogContent >
          <DialogContentText>
            Agregue un nuevo empleado al sistema, llenando los siguientes
            campos.
          </DialogContentText>
          
          <form onSubmit={handleSubmit} className="form-dialog">
          <div className="row">
            <div className="input-field col s6">
              <input
                id="cedula"
                type="text"
                name="cedula"
                className="validate"
                value={employee.cedula}
                onChange={handleChange}
              />
              <label htmlFor="cedula">Cedula</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s3">
              <input
                id="nombre"
                name="nombre"
                type="text"
                className="validate"
                value={employee.nombre}
                onChange={handleChange}
              />
              <label htmlFor="nombre">Nombre</label>
            </div>

            <div className="input-field col s3">
              <input
                id="apellidos"
                name="apellidos"
                type="text"
                className="validate"
                value={employee.apellidos}
                onChange={handleChange}
              />
              <label htmlFor="apellidos">Apellidos</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s3">
              <input
                id="telefono"
                name="telefono"
                type="number"
                className="validate"
                value={employee.telefono}
                onChange={handleChange}
              />
              <label htmlFor="telefono">Telefono</label>
            </div>

            <div className="input-field col s3">
              <input
                id="domicilio"
                name="domicilio"
                type="text"
                className="validate"
                value={employee.domicilio}
                onChange={handleChange}
              />
              <label htmlFor="domicilio">Domicilio</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s3">
              <input
                id="rol"
                name="rol"
                type="text"
                className="validate"
                value={employee.rol}
                onChange={handleChange}
              />
              <label htmlFor="rol">Rol</label>
            </div>

              <div className="input-field col s3">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="validate"
                  value={employee.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s3">
                <input
                  id="usuario"
                  name="nombreUsuario"
                  type="text"
                  className="validate"
                  value={employee.nombreUsuario}
                  onChange={handleChange}
                />
                <label htmlFor="usuario">Nombre de usuario</label>
              </div>

              <div className="input-field col s3">
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="validate"
                  value={employee.password}
                  onChange={handleChange}
                />
                <label htmlFor="password">Contraseña</label>
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
    // <EmployeeForm onSubmit={handleSubmit} initialValue={{}} />
  );
};

export default CreateEmpleado;