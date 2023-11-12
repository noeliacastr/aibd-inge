import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import {} from '../StyleHome.css';
import Navbar from '../Navbar';



const endpoint = 'http://localhost:8000/aibd/empleado';

const CreateEmpleado = () => {
  const [cedula, setCedula] = useState(0);
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [rol, setRol] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  M.AutoInit();
  const create = (e) => {
    e.preventDefault();
    axios.post(endpoint, {
      cedula: cedula,
      nombre: nombre,
      apellidos: apellidos,
      email: email,
      telefono: telefono,
      domicilio: domicilio,
      rol: rol,
      nombreUsuario: nombreUsuario,
      password: password,
    });
    navigate('/empleado');
  };

  return (
    <>
    <Navbar/>
    <div className="fondo-from-conteiner">
      <div className="container ">
        <div className="row formulario-custom">
          <form className="col s12" onSubmit={create}>
            <div className="rowCreate">
              <div className="input-field col s6" >
                <input
                  id="cedula"
                  type="text"
                  className="validate"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                />
                <label htmlFor="cedula">Cedula</label>
              </div>
            </div>
            <div className="rowCreate">
              <div className="input-field col s6">
                <input
                  id="nombre"
                  type="text"
                  className="validate"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <label htmlFor="nombre">Nombre</label>
              </div>

              <div className="input-field col s6">
                <input
                  id="apellidos"
                  type="text"
                  className="validate"
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                />
                <label htmlFor="apellidos">Apellidos</label>
              </div>
            </div>
            <div className="rowCreate">
              <div className="input-field col s6">
                <input
                  id="domicilio"
                  type="text"
                  className="validate"
                  value={domicilio}
                  onChange={(e) => setDomicilio(e.target.value)}
                />
                <label htmlFor="domicilio">Domicilio</label>
              </div>

              <div className="input-field col s6">
                <input
                  id="rol"
                  type="text"
                  className="validate"
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                />
                <label htmlFor="rol">Rol</label>
              </div>
            </div>
            <div className="rowCreate">
              <div className="input-field col s6">
                <input
                  id="email"
                  type="email"
                  className="validate"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s6">
                <input
                  id="telefono"
                  type="number"
                  className="validate"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
                <label htmlFor="telefono">Telefono</label>
              </div>
            </div>
            <div className="rowCreate">
              <div className="input-field col s6">
                <input
                  id="usuario"
                  type="text"
                  className="validate"
                  value={nombreUsuario}
                  onChange={(e) => setNombreUsuario(e.target.value)}
                />
                <label htmlFor="usuario">Nombre de usuario</label>
              </div>

              <div className="input-field col s6">
                <input
                  id="password"
                  type="password"
                  className="validate"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>

            <div className="rowCreate">
              <button type="submit" className="btn-primary">
                Guardar
              </button>
              <a href="/empleado/show" >
              <button type="button" className="btn-secondary">
                Cancelar
              </button>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default CreateEmpleado;