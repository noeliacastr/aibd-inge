import React, { useState } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"

import 'materialize-css/dist/css/materialize.min.css';
import LoadingButton from '@mui/lab/LoadingButton';
import {} from './StyleHome.css';
import {updateEmployee} from "../api/empleado"
import {getEmployee} from "../api/empleado"


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const EditEmpleado = ({initialValue}) => {
     
      const {id}  = useParams();
      const [cedula, setCedula] = useState(id);  
      const navigate = useNavigate();
      
      
      const queyCLient = useQueryClient();
      const [employe, setEmploye] = useState(
        {
          cedula: cedula,
          nombre: "",
          apellidos:   "",
          telefono:  "",
          domicilio: "",
        }
      );
    
      const {
        isLoading,
        isError,
        data: employee,
        error,
        isSuccess,
      } = useQuery({
        queryKey: ["employee"],
        queryFn: () => getEmployee(cedula),
      });
      
      const editEmpleado = useMutation({
        mutationFn: updateEmployee,
        onSuccess: () => {
            queyCLient.invalidateQueries("employee")
            navigate("/empleados")
        },
      });

      const handleSubmit = (e) => {
        // e.preventDefault()
        console.log(employe)
        editEmpleado.mutate({
          ...employe
        });
      }; 
      const handleChangeInput = (e) => {
        setEmploye({
          ...employee,
          [e.target.name]: e.target.value
        })
      }
      const handleChangeEdit = (e) => {
    
        const { name, value } = e.target;
        console.log(value)
        console.log(name)
            setEmploye((employee) => ({
                ...employee,
                [name]: value
                
            }));
            console.log('Employee State:', employe);
        if (name == "nombre" ){
          employee.nombre = value
        }
        if (name == "apellidos" ){
          employee.apellidos = value
        }
        if (name == "telefono" ){
          employee.telefono = value
        }
        if (name == "email" ){
          employee.email = value
        }
        if (name == "domicilio" ){
          employee.domicilio = value
        }
      };

      if (isLoading) return <div>...is Loading</div>
      else if (isError) return <div>...{error.message}</div>

      return (
        <div >
      <Dialog open={isOpen} onClose={onClose} className="dialogContainer">
        <DialogTitle>Modificar empleado</DialogTitle>
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
                <div className=" col s6" >
                  <input
                    disabled
                    id="disabled"
                    type="text"
                    className="validate"
                    value={employee.cedula}
                    onChange={handleChangeEdit}
                  />
                  <label for="disabled">Cedula</label>
                </div>
              </div>
              <div className="rowCreate">
                <div className="col s6">
                  <input
                    id="nombre"
                    type="text"
                    className="validate"
                    value={employee.nombre}
                    onChange={handleChangeEdit}
                  />
                  <label htmlFor="nombre">Nombre</label>
                </div>
  
                <div className="col s6">
                  <input
                    id="apellidos"
                    type="text"
                    className="validate"
                    value={employee.apellidos}
                    onChange={handleChangeEdit}
                  />
                  <label htmlFor="apellidos">Apellidos</label>
                </div>
              </div>
              <div className="rowCreate">
                <div className=" col s6">
                  <input
                    id="domicilio"
                    type="text"
                    className="validate"
                    value={employee.domicilio}
                    onChange={handleChangeEdit}
                  />
                  <label htmlFor="domicilio">Domicilio</label>
                </div>
                <div className="col s6">
                  <input
                    id="telefono"
                    type="text"
                    className="validate"
                    value={employee.telefono}
                    onChange={handleChangeEdit}
                  />
                  <label htmlFor="telefono">Telefono</label>
                </div>
  
                
              </div>
            </form>
          
        </DialogContent>
        <DialogActions>
        <a href="/empleados" >
          <Button onClick={onClose}>Cancel</Button>
        </a>
          <Button type="submit" className="btn btn-primary" onClick={() => handleSubmit()}>Modificar</Button>
        </DialogActions>
      </Dialog>
    </div>
        
      );
}
export default EditEmpleado;

