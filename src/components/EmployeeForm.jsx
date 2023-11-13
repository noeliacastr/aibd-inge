import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import {} from '././StyleHome.css';
import Navbar from './Navbar';




const EmployeeForm = ({ onSubmit, initialValue }) => {
    const [employee, setEmployee] = useState(
        {
          "cedula": initialValue.cedula || 0,
          "nombre": initialValue.nombre || "",
          "apellidos": initialValue.apellidos || "",
          "telefono": initialValue.telefono || "",
          "email": initialValue.email || "",
          "domicilio": initialValue.domicilio || "",
          "rol": initialValue.rol || "",
          "nombreUsuario": initialValue.nombreUsuario || "",
          "password": initialValue.password || "",
        }
      );
      
  
    const handleChangeInput = (e) => {
      setEmployee({
        ...employee,
        [e.target.name]: e.target.value
      })
    }
  
    const renderField = (label) => (
      <div>
        <label>{label}</label>
        <input onChange={handleChangeInput}/>
      </div>
    );
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(employee);
      setEmployee({
        cedula: 0,
        nombre: "",
        apellidos: "",
        telefono: "",
        email: "",
        domicilio: "",
        rol: "",
        nombreUsuario: "",
        password: ""
      })
  
    }
  
    return (
    //   <form onSubmit={handleSubmit}>
    //     {renderField('Title')}
    //     {renderField('Body')}
    //     <button type="submit">Submit</button>
    //   </form>
    <>
            <Navbar />
    <div className="fondo-from-conteiner">
    <div className="container formulario-custom">
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
                onChange={handleChangeInput}
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
                onChange={handleChangeInput}
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
                onChange={handleChangeInput}
              />
              <label htmlFor="apellidos">Apellidos</label>
            </div>
          </div>
          <div className="rowCreate">
            <div className="input-field col s12">
              <input
                id="telefono"
                name="telefono"
                type="tel"
                className="validate"
                value={employee.telefono}
                onChange={handleChangeInput}
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
                onChange={handleChangeInput}
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
                onChange={handleChangeInput}
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
                onChange={handleChangeInput}
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
                onChange={handleChangeInput}
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
                onChange={handleChangeInput}
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
  </>
    );
  };
  
  export default EmployeeForm