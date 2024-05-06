import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from "@mui/material/Avatar";
import logoAIBD from "../img/logoAIBD.png"
import { Link } from "react-router-dom";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stack // Importa Stack desde @mui/material/Stack
} from "@mui/material";

export default function ButtonAppBar() {
    const [openDrawer, setOpenDrawer] = React.useState(false);

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };
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
        <Box>
            <AppBar position="static" className="nav-extended ">
                <Toolbar >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 135 }}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to="/home" className="brand-logo">
                        {/* <img src={logoA} alt="Alicia's Avatar" className="avatar-A" /> */}
                        <img
                        src={logoAIBD}
                        alt="Alicia's Avatar"
                        className="avatar-logo"
                        />
                    </Link>
                    <Stack direction="row-reverse" spacing={4} className="avatarLogOut"> {/* Aquí estás usando Stack */}
            <Button onClick={handleOpen}>
                <Avatar>
                    <AccountCircleRoundedIcon />
                </Avatar>
                </Button>
                <Dialog open={open} onClose={handleClose}>
                <DialogTitle className="dialogContentText">Cerrar Sesión</DialogTitle>
                <DialogContent>
                    ¿Estás seguro de que deseas cerrar sesión?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className="out-button">
                    Cancelar
                    </Button>
                    <Button onClick={logout} className="cancel-button " >
                    Cerrar Sesión
                    </Button>
                </DialogActions>
                </Dialog>
            </Stack>
                </Toolbar>
            </AppBar>
            
            <Drawer 
                anchor="left"
                open={openDrawer}
                onClose={toggleDrawer}
        
            >
                <List className="drawer-wrapper ">
                    <ListItem button key="Inicio" component={Link} to="/home">
                        <ListItemText primary="Inicio" className="list-item-text" /> 
                    </ListItem>
                    <ListItem button key="Empleado" component={Link} to="/empleados">
                        <ListItemText primary="Empleado" className="list-item-text" /> 
                    </ListItem>
                    <ListItem button key="Producto" component={Link} to="/productos">
                        <ListItemText primary="Producto" className="list-item-text" /> 
                    </ListItem>
                    <ListItem button key="Venta" component={Link} to="/ventas">
                        <ListItemText primary="Venta" className="list-item-text" /> 
                    </ListItem>
                    <ListItem button key="Caja" component={Link} to="/caja">
                        <ListItemText primary="Caja" className="list-item-text" /> 
                    </ListItem>
                    <ListItem button key="Detecciones" component={Link} to="/notification">
                        <ListItemText primary="Detecciones" className="list-item-text" /> 
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    );
}
