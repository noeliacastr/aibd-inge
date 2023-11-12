import 'material-icons/iconfont/material-icons.css';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import React, { useEffect } from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

import Navbar from '../Navbar';
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
import { Scrollbar } from '../component/scrollbar';
import { getInitials } from '../component/get-initials';



export const CustomersTable = (props) => {
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
        selected = [],
        
        
    } = props;

    useEffect(() => {
      initModal();
    }, []);
    const initModal = () => {
      const modalElement = document.getElementById('modal1'); // Use the appropriate ID for your modal
      M.Modal.init(modalElement);
    };
   

    const selectedSome = (selected.length > 0) && (selected.length < items.length);
    const selectedAll = (items.length > 0) && (selected.length === items.length);

    

    return (
        <>
        <Navbar/>
        
                {/* <div className="bottonAgregar">
                  <a href="/empleado/create" >
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

  {/* Modal Structure */}
  <div id="modal1" className="modal">
    <div className="modal-content">
      <h4>Crear un Empleado</h4>
    </div>
    
    <div className="modal-footer">
      <a href="#!" className="modal-close waves-effect waves-green btn-flat">
        Agree
      </a>
    </div>
  </div>
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 1000 }}>
          <Table >
            <TableHead >
              <TableRow >
                <TableCell padding="checkbox" className="colores ">
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
                <TableCell className="colores ">
                  Cedula
                </TableCell >
                <TableCell className="colores ">
                  Nombre
                </TableCell>
                <TableCell className="colores ">
                  Apellidos
                </TableCell>
                <TableCell className="colores ">
                  Email
                </TableCell>
                <TableCell className="colores " >
                  Telefono
                </TableCell>
                <TableCell  className="colores ">
                  Domicilio
                </TableCell>
                <TableCell className="colores ">
                  Rol
                </TableCell>
                <TableCell className="colores ">
                  Nombre Usuario
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((empleado) => {
                const isSelected = selected.includes(empleado.id);
                const createdAt = format(empleado.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={empleado.id}
                    selected={isSelected}
                  >
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
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <TableCell>
                        {empleado.cedula}
                        </TableCell>
                        <Avatar src={empleado.avatar}>
                          {getInitials(empleado.nombre)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {empleado.nombre}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {empleado.apellidos}
                    </TableCell>
                    <TableCell>
                      {empleado.email}
                    </TableCell>
                    <TableCell>
                      {empleado.telefono}
                    </TableCell>
                    <TableCell>
                      {empleado.domicilio}
                    </TableCell>
                    <TableCell>
                      {empleado.rol}
                    </TableCell>
                    <TableCell>
                      {empleado.nombreUsuario}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[1,2,3]}
      />
    </Card>
    </>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
