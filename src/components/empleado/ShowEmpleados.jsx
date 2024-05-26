import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getEmployess } from "../../api/empleado";
import ButtonAppBar from "../layout/Navbar";
import 'materialize-css/dist/css/materialize.min.css'
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

import CreateEmpleado from "./CreateEmpleado";
import EditEmpleado from "./EditEmpleado";
import DeleteEmpleado from "./DeleteEmpleado";
import ShowDetailsEmp from "./ShowDetailsEmployee";


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

  const row = empleados
    ? empleados.map((cls) => ({ ...cls, id: cls.cedula }))
    : [];
  const columns = [
    { field: "cedula", headerName: "Cédula", width: 100 },
    { field: "nombre", headerName: "Nombre", width: 110 },
    { field: "rol", headerName: "Rol", width: 90 },
    {
      field: "show",
      headerName: "Detalles",
      width: 80,
      className: "round-button",
      renderCell: (params) => (

        <>
          <ShowDetailsEmp emp={params.row} />

        </>
      ),
    },
    {
      field: "Action",
      headerName: "Modificar",
      width: 80,
      className: "round-button",
      renderCell: (params) => (

        <>
          <EditEmpleado emp={params.row} />

        </>
      ),
    },
    {
      field: "action",
      headerName: "Eliminar",
      width: 90,
      className: "round-button",
      renderCell: (params) => (

        <DeleteEmpleado emp={params.row.id} />

      ),
    },


  ];

  if (isLoading)
    return (
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="secondary" />
      </Stack>
    );
  else if (isError) return <div>{error.message}</div>;

  return (
    <>
      <CreateEmpleado />
      <div className="dataGridContainerEmple">
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
