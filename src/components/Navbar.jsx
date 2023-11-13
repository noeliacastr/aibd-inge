import React, { useEffect } from 'react';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css'
import '../components/StyleHome.css';
import { Link } from 'react-router-dom';
import aliciaLogo from '../img/aliciaLogo.png';
import logoA from '../img/logoA.gif';
import { BrowserRouter as Router } from 'react-router-dom';

const Navbar = () => {
  useEffect(() => {
    // Inicializar elementos de Materialize al cargar el componente
    M.AutoInit();
  }, []);

  return (
    <>
        <nav className="nav-extended">
          <div className="nav-wrapper">
              <Link to="/home" className="brand-logo">
              {/* <img src={logoA} alt="Alicia's Avatar" className="avatar-A" /> */}
              <img src={aliciaLogo} alt="Alicia's Avatar" className="avatar-logo" />
              </Link>
              <ul id="nav-mobile" className="left hide-on-med-and-down">
                <li className="tab"><a className="nav-link" href="/home">Inicio</a></li>
                <li className="tab"><a className="nav-link" href="/empleados">Empleado</a></li>
              </ul>
          </div>
        </nav>

      {/* <nav className="nav-extended">
        <div className="nav-content">
          <Link to="/home" className="brand-logo">
            <img src={aliciaLogo} alt="Alicia's Avatar" className="avatar-logo" />
          </Link>
          
          <ul className="tabs tabs-transparent ">
            <li className="tab"><a  href="/home">Inicio</a></li>
            <li className="tab"><a  href="/empleado/create">Empleado</a></li>
          </ul>
        </div>
      </nav> */}

    </>
  );
};

export default Navbar;