import React, { useState,useRef, useEffect } from "react";
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
import CloseIcon from "@mui/icons-material/Close"; 
import ArticleIcon from '@mui/icons-material/Article';
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";




const CreateEmpleado = ({}) => {
  const [employee, setEmployee] = useState({
    cedula: "",
    nombre: "",
    apellidos: "",
    telefono: "",
    email: "",
    domicilio: "",
    rol: "",
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // Reiniciar los datos del empleado cuando se cierre el diálogo
    setEmployee({
      cedula: "",
      nombre: "",
      apellidos: "",
      telefono: "",
      email: "",
      domicilio: "",
      rol: "",
    });
  };

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     // Verificar si window está definido antes de llamar a M.AutoInit()
  //     import("materialize-css").then((M) => {
  //       M.AutoInit();
  //     });
  //   }
  // }, []);

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
  setEmployee({
    cedula: "",
    nombre: "",
    apellidos: "",
    telefono: "",
    email: "",
    domicilio: "",
    rol: "",
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
      {/* <div className="bottonAgregar">
        <a>
          <button
            className="button"
            style={{ verticalAlign: "middle" }}
            onClick={handleOpen}
          >
            <span>Agregar</span>
          </button>
        </a>
      </div> */}
      <div className=" bottonAgregarEm border w-full h-40 flex items-center justify-center">
      <a href="#_" className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group" onClick={handleOpen}>
        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </span>
        <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">Empleado</span>
        <span className="relative invisible">Empleado</span>
      </a>
    </div>
      
      <Dialog open={open} onClose={handleClose} className="dialogContainer">
        <DialogTitle className="dialogContentText">Agregar empleado</DialogTitle>
        <a href="/empleados" >
        <IconButton aria-label="close" onClick={handleClose} className="custom-icon-button">
          <CloseIcon />
        </IconButton>
        </a>
        <DialogContent >
          <DialogContentText className="dialogContentText">
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
              <label htmlFor="cedula">Cédula</label>
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
              <label htmlFor="telefono">Teléfono</label>
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
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Rol</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="rol"
                name="rol"
                type="text"
                className="validate"
                value={employee.rol}
                onChange={handleChange}
              >
              <MenuItem value="administrador">Administrador</MenuItem>
              <MenuItem value="cajero">Cajero</MenuItem>
              <MenuItem value="bartender">Bartender</MenuItem>
              </Select>
            </FormControl>
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