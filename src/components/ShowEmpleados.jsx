import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEmployess, deleteEmployee } from "../api/empleado";
import Navbar from "./Navbar";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateEmpleado from "./CreateEmpleado";
import Swal from "sweetalert2";
import DeleteEmployee from "./DeleteEmpleado";

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
  const navigate = useNavigate();
  const deleteEmployees = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          queryClient.invalidateQueries("employees");
        }
      });
    },
  });

  const row = empleados
    ? empleados.map((cls) => ({ ...cls, id: cls.cedula }))
    : [];
  const columns = [
    { field: "cedula", headerName: "Cedula", width: 100 },
    { field: "nombre", headerName: "Nombre", width: 130 },
    { field: "apellidos", headerName: "Apellidos", width: 130 },
    { field: "telefono", headerName: "Telefono", width: 130 },
    { field: "email", headerName: "Correo Electronico", width: 100 },
    { field: "domicilio", headerName: "Domicilio", width: 130 },
    { field: "rol", headerName: "Rol", width: 90 },
    {
      field: "action",
      headerName: "Action",
      width: 90,
      renderCell: (params) => (
        
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            console.log(params.row.id);
            deleteEmployees.mutate(params.row.id)
          }}
        >
          
          <DeleteIcon className="delete-icon" />
        </button>
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    console.log("abriendo dialogo");
    setOpen(true);
  };

  const handleClose = () => {
    console.log("cerrando dialogo");
    setOpen(false);
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
      <div className="bottonAgregar">
        <a>
          <button
            className="button"
            style={{ verticalAlign: "middle" }}
            onClick={handleClickOpen}
          >
            <CreateEmpleado isOpen={open} onClose={handleClose} />
            <span>Agregar</span>
          </button>
        </a>
      </div>

      <div style={{ height: 400, width: "100%" }}>
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
