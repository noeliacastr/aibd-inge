import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEmployess, deleteEmployee } from "../api/empleado";
import Navbar from "./Navbar";
import 'materialize-css/dist/css/materialize.min.css'
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

import CreateEmpleado from "./CreateEmpleado";
import EditEmpleado from "./EditEmpleado";
import Swal from "sweetalert2";
import DeleteEmpleado from "./DeleteEmpleado";


const ShowAllEmployees = () => {
  const {
    isLoading,
    data: empleados,
    isError,
    error,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployess,
  });
  const queryClient = useQueryClient();
  const deleteEmployees = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      const confirmDelete = () => {
        Swal.fire({
          title: "Empleado eliminado",
          text: "Los datos han sido eliminados",
          icon: "success"
        });
        queryClient.invalidateQueries("employees");
      };
      Swal.fire({
        title: "¿Seguro al eliminar el empleado?",
        text: "No se podran revertir los cambios",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          confirmDelete();
        }else{
          result.dismiss === Swal.DismissReason.cancel
        }
      })
    },
  });

  const row = empleados
    ? empleados.map((cls) => ({ ...cls, id: cls.cedula }))
    : [];
  const columns = [
    { field: "cedula", headerName: "Cédula", width: 100 },
    { field: "nombre", headerName: "Nombre", width: 130 },
    { field: "apellidos", headerName: "Apellidos", width: 130 },
    { field: "telefono", headerName: " Teléfono", width: 130 },
    { field: "email", headerName: "Correo Electronico", width: 100 },
    { field: "domicilio", headerName: "Domicilio", width: 130 },
    { field: "rol", headerName: "Rol", width: 90 },
    {
      field: "action",
      headerName: "Acción",
      width: 90,
      className:"round-button",
      renderCell: (params) => (
        
       <DeleteEmpleado emp = {params.row.id}/>
        
      ),
    },
    {
      field: "Action",
      headerName: "Acción",
      width: 90,
      className:"round-button",
      renderCell: (params) => (
        
        <>
        <EditEmpleado emp={params.row}/>
        
        </>
      ),
    },

  ];
  const handleClickOpen2 = () => {
    console.log("abriendo dialogo");
    setOpen(true);
  };

  if (isLoading)
    return (
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="secondary" />
      </Stack>
    );
  else if (isError) return <div>{error.message}</div>;

  return (
    <>
      <Navbar />
      <CreateEmpleado />
      <div className="dataGridContainer">
        <DataGrid
          rows={row}
          columns={columns}
          getRowId={(row) => row.cedula}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </>
  );
};
export default ShowAllEmployees;
