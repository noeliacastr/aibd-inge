import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Stack, Button, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Box, TextField, Typography } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useAuthStore } from '../../hooks/useAuthStore';


const Profile = () => {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);

    const { currentUser } = useAuthStore();

    const clearAuth = useAuthStore(
        (state) => state.clearAuth
    );

    const navigate = useNavigate();
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const logout = () => {
        clearAuth();
        handleClose();
        navigate("/");

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
                                        value={currentUser?.sub}
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
                                        value={currentUser?.nombre}
                                        fullWidth
                                        disabled
                                        style={{ marginBottom: '12px' }}
                                    />
                                </div>
                                <div className="col s3" >
                                    <TextField
                                        label="Rol"
                                        value={currentUser?.rol}
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
