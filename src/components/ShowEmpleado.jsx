import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import {getEmployess, deleteEmployee} from "../api/empleado"
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';

import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from 'react-router-dom';
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

    if (isLoading) return  <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
    <CircularProgress color="secondary" />
  </Stack>
    else if (isError) return <div>{error.message}</div>

    return (
      <>
    
      
              <div className="bottonAgregar">
                <a href="/empleado/create" >
                  <button className="button" style={{ verticalAlign: 'middle' }}><span>Agregar</span></button>
                </a>
              </div>
  <Card>
    
      <Box sx={{ minWidth: 1000 }}>
        <Table className="colores ">
          <TableHead >
            <TableRow >
              <TableCell padding="checkbox">
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
              <TableCell  className="blue-text">
                Cedula
              </TableCell >
              <TableCell className="black-text">
                Nombre
              </TableCell>
              <TableCell className="white-text">
                Apellidos
              </TableCell>
              <TableCell className="white-text">
                Email
              </TableCell>
              <TableCell className="white-text">
                Telefono
              </TableCell>
              <TableCell className="white-text">
                Domicilio
              </TableCell>
              <TableCell className="white-text">
                Rol
              </TableCell>
              <TableCell className="white-text">
                Nombre Usuario
              </TableCell>
              <TableCell>

              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {empleados.map((empleado) => {
              const isSelected = selected.includes(empleado.id);
              //const createdAt = format(empleado.createdAt, 'dd/MM/yyyy');

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
                        {empleado.nombre}
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
                  <button   onClick={() => {
            deleteEmployees.mutate(empleado.cedula)
          }}>
          Eliminar
        </button>
                  </TableCell>
                  <TableCell>
                  <button onClick={() => navigate(`/empleado/edit/${empleado.cedula}`)}>Editar</button>
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
      rowsPerPageOptions={[1,2,3]}
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
