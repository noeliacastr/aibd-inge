import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "../components/StyleHome.css";
import { Link } from "react-router-dom";
import aliciaLogo from "../img/aliciaLogo.png";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import logoA from "../img/logoA.gif";
import { BrowserRouter as Router } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const Navbar = () => {
  useEffect(() => {
    // Inicializar elementos de Materialize al cargar el componente
    M.AutoInit();
  }, []);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    if (localStorage.getItem("token")) {
      localStorage.clear();
      navigate("/");
    }
    handleClose();
  };

  return (
    <>
      <nav className="nav-extended">
        <div className="nav-wrapper">
          <Link to="/home" className="brand-logo">
            {/* <img src={logoA} alt="Alicia's Avatar" className="avatar-A" /> */}
            <img
              src={aliciaLogo}
              alt="Alicia's Avatar"
              className="avatar-logo"
            />
          </Link>
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li className="tab">
              <a className="nav-link" href="/home">
                Inicio
              </a>
            </li>
            <li className="tab">
              <a className="nav-link" href="/empleados">
                Empleado
              </a>
            </li>
          </ul>
          <Stack direction="row-reverse" spacing={4} className="avatar">
            <Button onClick={handleOpen}>
              <Avatar>
                <AccountCircleRoundedIcon />
              </Avatar>
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Cerrar Sesión</DialogTitle>
              <DialogContent>
                ¿Estás seguro de que deseas cerrar sesión?
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancelar
                </Button>
                <Button onClick={logout} color="primary">
                  Cerrar Sesión
                </Button>
              </DialogActions>
            </Dialog>
          </Stack>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
