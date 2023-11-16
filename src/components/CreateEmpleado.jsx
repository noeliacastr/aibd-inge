import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import {} from "././StyleHome.css";
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

const CreateEmpleado = ({}) => {
  const [employee, setEmployee] = useState({
    cedula: 0,
    nombre: "",
    apellidos: "",
    telefono: "",
    email: "",
    domicilio: "",
    rol: "",
    nombreUsuario: "",
    password: "",
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  M.AutoInit();
  const queyCLient = useQueryClient();

  const create = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queyCLient.invalidateQueries("employee");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    create.mutate({
      ...employee,
    });
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
          <button
            className="button"
            style={{ verticalAlign: "middle" }}
            onClick={handleOpen}
          >
            <span>Agregar</span>
          </button>
        </a>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar empleado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Agregue un nuevo empleado al sistema, llenando los siguientes
            campos.
          </DialogContentText>
          <form className="col s12" onSubmit={handleSubmit}>
            <div className="rowCreate">
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
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </form>
          {/* form que sharon tenia  */}
          {/* <form className="col s12" onSubmit={handleSubmit}>
            <TextField
            autoFocus
            margin="dense"
            name="cedula"
            label="Cedula"
            type="number"
            value={employee.cedula}
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
            <TextField
            autoFocus
            margin="dense"
            name="nombre"
            label="Nombre"
            type="text"
            value={employee.nombre}
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
            <TextField
            autoFocus
            margin="dense"
            name="apellidos"
            label="Apellidos"
            type="text"
            value={employee.apellidos}
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
            <TextField
            autoFocus
            margin="dense"
            name="telefono"
            label="Telefono"
            type="tel"
            value={employee.telefono}
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
            <TextField
            autoFocus
            margin="dense"
            name="email"
            label="Correo Electronico"
            type="email"
            value={employee.email}
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
            <TextField
            autoFocus
            margin="dense"
            name="domicilio"
            label="Domicilio"
            type="text"
            value={employee.domicilio}
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
           <TextField
            autoFocus
            margin="dense"
            name="rol"
            label="Rol del empleado"
            type="text"
            value={employee.rol}
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
            <TextField
            autoFocus
            margin="dense"
            name="nombreUsuario"
            label="Nombre de Usuario"
            type="text"
            value={employee.nombreUsuario}
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
            <TextField
            autoFocus
            margin="dense"
            name="password"
            label="Contraseña"
            type="password"
            value={employee.password}
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          </form> */}
        </DialogContent>
        <DialogActions>
          <div className="row">
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Cancelar
            </button>
          </div>
        </DialogActions>
      </Dialog>

      {/* <div className="container">
        <div className="row">
          <form className="col s12" onSubmit={handleSubmit}>
            <div className="rowCreate">
              <div className="input-field col s6">
                <input
                  id="cedula"
                  type="text"
                  name = "cedula"
                  className="validate"
                  value={employee.cedula}
                  onChange={handleChange}
                />
                <label htmlFor="cedula">Cedula</label>
              </div>
            </div>
            <div className="rowCreate">
              <div className="input-field col s6">
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
              
              <div className="input-field col s6">
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
            <div className="rowCreate">
              <div className="input-field col s6">
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  className="validate"
                  value={employee.telefono}
                  onChange={handleChange}
                />
                <label htmlFor="telefono">Telefono</label>
              </div>
            </div>
            <div className="rowCreate">
              <div className="input-field col s6">
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

              <div className="input-field col s6">
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
            </div>
            <div className="rowCreate">
              <div className="input-field col s12">
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
            <div className="rowCreate">
              <div className="input-field col s6">
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

              <div className="input-field col s6">
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="validate"
                  value={employee.password}
                  onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>

            <div className="rowCreate">
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
              <a href="/empleados" >
              <button type="button" className="btn btn-secondary">
                Cancelar
              </button>
              </a>
            </div>
          </form>
        </div>
      </div> */}
    </div>
    // <EmployeeForm onSubmit={handleSubmit} initialValue={{}} />
  );
};

export default CreateEmpleado;
