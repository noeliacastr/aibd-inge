import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css'

const Navbar = () => {
  useEffect(() => {
    // Inicializar elementos de Materialize al cargar el componente
    M.AutoInit();
  }, []);

  return (
    <div>
      <ul id="dropdown1" className="dropdown-content">
        <li><a href="#!">one</a></li>
        <li><a href="#!">two</a></li>
        <li className="divider"></li>
        <li><a href="#!">three</a></li>
      </ul>
      <nav>
        <div className="nav-wrapper">
          <a href="#!" className="brand-logo"></a>
          <ul className="right hide-on-med-and-down">
            <li><a>Login</a></li>
            <li><a href="empleado">Empleado</a></li>
            {/* Dropdown Trigger */}
            <li><a className="dropdown-trigger" href="#!" data-target="dropdown1">no se<i className="material-icons right">arrow_drop_down</i></a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;