import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Stack, Button, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Box, TextField, Typography } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import EditIcon from '@mui/icons-material/Edit';
import { getUserData } from "../api/login";
import EditUser from "../components/userComponent/EditUser"



const Profile = () => {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserData(); 
                setUser(userData.data);
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };
        fetchUserData();
    }, []);

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
            <Box p={4}>
                <Stack spacing={2}>
                    <Button onClick={handleOpen}>
                        {user ? (
                            <Avatar className="avatarLogOut" alt={user.nombre}>
                                <AccountCircleRoundedIcon />
                            </Avatar>
                        ) : (
                            <Avatar>
                                <AccountCircleRoundedIcon />
                            </Avatar>
                        )}
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle >
                            <Typography variant="h3">Perfil de Usuario</Typography>
                        </DialogTitle>
                        <DialogContent dividers sx={{ p: 1 }}>
                            <div className='row'>
                                <div className="col s6">
                                    <TextField
                                        label="ID"
                                        value={user?.sub}
                                        disabled
                                        variant='standard'
                                        fullWidth
                                        style={{ marginBottom: '12px' }}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col s3" >
                                    <TextField
                                        label="Nombre"
                                        variant='standard'
                                        value={user?.nombre}
                                        fullWidth
                                        disabled
                                        style={{ marginBottom: '12px' }}
                                    />
                                </div>
                                <div className="col s3" >
                                    <TextField
                                        label="Rol"
                                        value={user?.rol}
                                        variant="standard"
                                        fullWidth
                                        disabled
                                        style={{ marginBottom: '12px' }}
                                    />
                                </div>
                            </div>
                        </DialogContent>
                        <DialogActions sx={{ justifyContent: 'center', p: 2 }}>
                            <Button onClick={handleClose} className="out-button">
                                Cancelar
                            </Button>
                            <Button onClick={logout} className="cancel-button " >
                                Cerrar Sesión
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Stack>
            </Box>
        </>
    );

}

export default Profile;

