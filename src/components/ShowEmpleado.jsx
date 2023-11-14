import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import {getEmployess, deleteEmployee} from "../api/empleado"
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from './Navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateEmpleado from "./CreateEmpleado";
import EditEmpleado from "./EditEmpleado";

import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';


const Empleyees = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
} = props;

const selectedSome = (selected.length > 0) && (selected.length < items.length);
const selectedAll = (items.length > 0) && (selected.length === items.length);

    const {
        isLoading,
        data:empleados,
        isError,
        error,
    } = useQuery({
        queryKey: ["employees"],
        queryFn: getEmployess,
    });
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    const deleteEmployees = useMutation({
      mutationFn: deleteEmployee,
      onSuccess: () => {
        queryClient.invalidateQueries("employees");
      },
    });

    const [empleadoData, setEmpleadoData] = useState(null);
    const handleOpenEditModal = (empleado) => {
      setEmpleadoData(empleado); // Actualiza el estado con los datos del empleado seleccionado
      // Lógica para abrir el modal aquí (cambiar estado, etc.)
    };

    if (isLoading) return  <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
    <CircularProgress color="secondary" />
  </Stack>
    else if (isError) return <div>{error.message}</div>

    return (
      <>
        <Navbar />
      
              {/* <div className="bottonAgregar">
                <a href="/empleado" >
                  <button className="button" style={{ verticalAlign: 'middle' }}><span>Agregar</span></button>
                </a>
              </div> */}
              <div className="bottonAgregar">
    <a href="#modal1" className="modal-trigger">
      <button className="button" style={{ verticalAlign: 'middle' }}>
        <span>Agregar</span>
      </button>
    </a>
  </div>

  <div id="modal1" className="modal">
    <div className="modal-content">
      <h4>Crear un Empleado</h4>
      <CreateEmpleado/>
    </div>
    
    <div className="modal-footer">
      <a href="#!" className="modal-close waves-effect waves-green btn-flat">
        Agree
      </a>
    </div>
  </div>
 
              <Card>
        <Box sx={{ minWidth: 1000 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" className="colores">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell className="colores">Cedula</TableCell>
                <TableCell className="colores">Nombre</TableCell>
                <TableCell className="colores">Apellidos</TableCell>
                <TableCell className="colores">Email</TableCell>
                <TableCell className="colores">Telefono</TableCell>
                <TableCell className="colores">Domicilio</TableCell>
                <TableCell className="colores">Rol</TableCell>
                <TableCell className="colores">Nombre Usuario</TableCell>
                <TableCell className="colores"></TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {empleados.map((empleado) => {
                const isSelected = selected.includes(empleado.id);

                return (
                  <TableRow key={empleado.cedula} hover selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(empleado.cedula);
                          } else {
                            onDeselectOne?.(empleado.cedula);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>{empleado.cedula}</TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={empleado.avatar}>{empleado.nombre}</Avatar>
                        <Typography variant="subtitle2">
                          {empleado.nombre}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{empleado.apellidos}</TableCell>
                    <TableCell>{empleado.email}</TableCell>
                    <TableCell>{empleado.telefono}</TableCell>
                    <TableCell>{empleado.domicilio}</TableCell>
                    <TableCell>{empleado.rol}</TableCell>
                    <TableCell>{empleado.nombreUsuario}</TableCell>
                    {/* <TableCell>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={() => {
                          deleteEmployees.mutate(empleado.cedula);
                        }}
                      >
                        <DeleteIcon className="delete-icon"/> 
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={() =>
                          navigate(`/empleado/edit/${empleado.cedula}`)
                        }
                      >
                        Editar
                      </button>
                    </TableCell> */}
                    <TableCell>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={() => {
                          deleteEmployees.mutate(empleado.cedula);
                        }}
                      >
                        <DeleteIcon className="delete-icon"/> 
                      </button>
                      <div className="OtroModal">
                        <a href="#modal2" className="modal-trigger">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(empleado)}>
                            Editar
                          </button>
                        </a>
                      </div>
                      <div id="modal2" className="modal">
                        <div className="modal-content">
                          <h4>Editar un Empleado</h4>
                            
                          <EditEmpleado empleado={empleadoData} />
                        </div>
    
                        <div className="modal-footer">
                          <a href="#!" className="modal-close waves-effect waves-green btn-flat">
                            Agree
                          </a>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>

        <TablePagination
          component="div"
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[1, 2, 3]}
        />
      </Card>
  </>
    // return employees.map((employee) => (
    // <div key={employee.cedula}>
    //     <p>{employee.cedula}</p>
    //     <h3>{employee.nombre}</h3>
    //     <p>{employee.apellidos}</p>
    //     <p>{employee.telefono}</p>
    //     <p>{employee.email}</p>
    //     <p>{employee.domicilio}</p>
    //     <button   onClick={() => {
    //         deleteEmployees.mutate(employee.cedula)
    //       }}>
    //       Eliminar
    //     </button>
    //     <button onClick={() => navigate(`/empleado/edit/${employee.cedula}`)}>Editar</button>
    // </div>
    
    // ));
    );
};


export default Empleyees;
