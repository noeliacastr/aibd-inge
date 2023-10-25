import { useState } from 'react';
import { TextField, Button, FormControl, Accordion, AccordionSummary, Typography, AccordionDetails, Snackbar, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { createEmployee } from '../../api/employeeAPI';
import { getEmployees } from '../../api/employeeAPI';
import '../../styles/components/employee/store.css'

export const StoreEmployee = () => {

    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false);
    const [messagge, setMessagge] = useState('')
    const [verify, setVerify] = useState(false)
    const { isLoading, data: employees, isError } = useQuery(['employees'], getEmployees);
    const [openError, setOpenError] = useState(false);
    const closeAlertError = (e) => {
        setOpenError(false)
    }

    const closeAlert = (e) => {
        setOpen(false);
    }
    const addEmployeeMutation = useMutation({
        mutationFn: createEmployee,
        onSuccess: () => {
            console.log('employee added')
            queryClient.invalidateQueries('employee')
            setOpen(true)
            setMessagge("Empleado agregado correctamente")
        },
        onError: (error) => {
            setOpenError(true)
            setMessagge("Error al agregar el empleado")
        }
    })

    const [employee, setEmployee] = useState({
        idEmpleado: 0,
        nombre: '',
        apellido1: '',
        apellido2: '',
        telefono: '',
        puesto: '',
        salario: 0
    });
    const getVerify = (e) => {
        for (let index = 0; index < employees.length; index++) {
            const element = employees[index];
            if (element.idEmpleado == employee.idEmpleado) {
                setVerify(verify + 1)
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (verify) {
            setOpenError(true)
            setMessagge("El id digitado, ya existe!!!")
            setVerify(0)
        } else {
            addEmployeeMutation.mutate({
                ...employee
            })
            setEmployee({
                idEmpleado: 0,
                nombre: '',
                apellido1: '',
                apellido2: '',
                telefono: '',
                puesto: '',
                salario: 0
            })
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((employee) => ({
            ...employee,
            [name]: value
        }));
    };

    return (
        <>
            <Snackbar open={open} autoHideDuration={3000} onClose={closeAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={() => { }}
                    severity="success" sx={{ width: '100%' }}
                >
                    {messagge}
                </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={3000} onClose={closeAlertError} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={() => { }}
                    severity="error" sx={{ width: '100%' }}
                >
                    {messagge}
                </Alert>
            </Snackbar>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Agregar Empleado</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form onSubmit={handleSubmit} >

                        <FormControl >
                            <TextField
                                id="idEmpleado"
                                name="idEmpleado"
                                label="Identificacion"
                                value={employee.idEmpleado}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>

                        <FormControl >
                            <TextField
                                id="nombre"
                                name="nombre"
                                label="Nombre"
                                value={employee.nombre}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>

                        <FormControl >
                            <TextField
                                id="apellido1"
                                name="apellido1"
                                label="Primer Apellido"
                                value={employee.apellido1}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>

                        <FormControl >
                            <TextField
                                id="apellido2"
                                name="apellido2"
                                label="Segundo Apellido"
                                value={employee.apellido2}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>

                        <FormControl >
                            <TextField
                                id="telefono"
                                name="telefono"
                                label="Telefono"
                                value={employee.telefono}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>

                        <FormControl >
                            <TextField
                                id="puesto"
                                name="puesto"
                                label="Puesto"
                                value={employee.puesto}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>

                        <FormControl >
                            <TextField
                                id="salario"
                                name="salario"
                                label="Salario"
                                value={employee.salario}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>

                        <Button type="submit" onClick={getVerify} variant="contained" color="primary">
                            Agregar
                        </Button>
                    </form>
                </AccordionDetails>
            </Accordion>

        </>

    );
};