import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useMutation, useQueryClient} from "@tanstack/react-query"
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import './style.css';
import {createEmployee} from "../api/empleado"
import EmployeeForm from "./EmployeeForm"

const CreateEmpleado = () => {
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
            [name]: value
        }));
  };
    
  return (
    <div className="fondo-from-conteiner">
      <div className="container">
        <div className="row">
          <form className="col s12" onSubmit={handleSubmit}>
            <div className="row">
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
            <div className="row">
              <div className="input-field col s12">
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
            <div className="row">
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
            <div className="row">
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
            <div className="row">
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

            <div className="row">
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>

              <button type="button" className="btn btn-secondary">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    // <EmployeeForm onSubmit={handleSubmit} initialValue={{}} /> 
  );
};

export default CreateEmpleado;
