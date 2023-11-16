import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useMutation, useQueryClient} from "@tanstack/react-query"

import M from 'materialize-css';
import {} from '././StyleHome.css';
import {createEmployee} from "../api/empleado"
import EmployeeForm from "./EmployeeForm"
import Navbar from './Navbar';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CreateEmpleado = ({isOpen, onClose}) => {
  
  const [employee, setEmployee] = useState(
    {
      "cedula": 0,
      "nombre": "",
      "apellidos": "",
      "telefono": "",
      "email": "",
      "domicilio": "",
      "rol": "",
      "nombreUsuario": "",
      "password": ""
    }
  );
  
  const navigate = useNavigate();
  M.AutoInit();
  const queyCLient = useQueryClient();

  const create = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queyCLient.invalidateQueries("employee")
      navigate('/empleados');
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    create.mutate({
      ...employee,
    });
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
        setEmployee((employee) => ({
            ...employee,
            [name]: value
        }));
  };
    
  return (
    <div >
      <Dialog open={isOpen} onClose={onClose} className="dialogContainer">
        <DialogTitle>Agregar empleado</DialogTitle>
        <a href="/empleados" >
        <IconButton aria-label="close" onClick={onClose} style={{ position: 'absolute', right: '8px', top: '8px' }}>
          <CloseIcon />
        </IconButton>
        </a>
        <DialogContent >
          <DialogContentText>
            Agregue un nuevo empleado al sistema, llenando los siguientes campos. 
          </DialogContentText>
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

            {/* <div className="row">
            <a href="/empleados" >
              <button 
              type="submit" className="btn btn-primary">
                Guardar
              </button>
              
              <button type="button" className="btn btn-secondary">
                Cancelar
              </button>
              </a>
            </div> */}
            
          </form>
        </DialogContent>
        <DialogActions>
        <a href="/empleados" >
          <Button onClick={onClose}>Cancel</Button>
        </a>
          <Button type="submit" className="btn btn-primary" onClick={handleSubmit}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
    // <EmployeeForm onSubmit={handleSubmit} initialValue={{}} /> 
  );
};

export default CreateEmpleado;
