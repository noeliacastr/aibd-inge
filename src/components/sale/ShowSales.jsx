import { DataGrid } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getVentas, deleteVenta } from "../../api/venta";
import ButtonAppBar from "../layout/Navbar";
import 'materialize-css/dist/css/materialize.min.css'
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import CreateSale from "./CreateSale";
import EditSale from "./EditSale";
import Swal from "sweetalert2";
import DeleteSale from "./DeleteSale";
import ExportFactura from "./ExportFactura";
import ShowDetailsSale from "./ShowDetailsSale";


const ShowAllVentas = () => {
  const {
    isLoading,
    data: venta,
    isError,
    error,  
  } = useQuery({
    queryKey: ["ventas"],
    queryFn: getVentas,
  });
  const queryClient = useQueryClient();
  const deleteVentas = useMutation({
    mutationFn: deleteVenta,
    onSuccess: () => {
      const confirmDelete = () => {
        Swal.fire({
          title: "Factura eliminado",
          text: "Los datos han sido eliminados",
          icon: "success"
        });
        queryClient.invalidateQueries("ventas");
      };
      Swal.fire({
        title: "¿Seguro al eliminar la factura?",
        text: "No se podran revertir los cambios",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          confirmDelete();
        } else {
          result.dismiss === Swal.DismissReason.cancel
        }
      })
    },
  });

  const row = venta
    ? venta.map((cls) => ({ ...cls, id: cls.idVenta }))
    : [];
  const columns = [
    { field: "fecha", headerName: "Fecha", width: 110 },
    { field: "cantidad", headerName: "Cantidad", width: 100 },
    { field: "estado", headerName: "Estado", width: 100 },
    { field: "productos", headerName: "Producto", width: 120,
      renderCell: (params) => (
        <>
        {`${params.row.productos.nombreProducto} - ${params.row.productos.id}`}
        </>
      ),
    },
    { field: "totalVenta", headerName: "Total de Venta", width: 100 },
    {
      field: "show",
      headerName: "Mostar",
      width: 65,
      className: "round-button",
      renderCell: (params) => (
        <>
          <ShowDetailsSale vent={params.row} />
        </>
      ),
    },
    {
      field: "Acción",
      headerName: "Descargar",
      width: 65,
      className: "round-button",
      renderCell: (params) => (
        <>
          <ExportFactura ventaData={params.row} />
        </>
      ),
    },
    {
      field: "Action",
      headerName: "Editar",
      width: 65,
      className: "round-button",
      renderCell: (params) => (

        <>
          <EditSale vent={params.row} />

        </>
      ),
    },
    {
      field: "action",
      headerName: "Eliminar",
      width: 60,
      className: "round-button",
      renderCell: (params) => (

        <DeleteSale vent={params.row.id} />

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
      <CreateSale />
      <div className="dataGridContainerSale">
        <DataGrid
          rows={row}
          columns={columns}
          getRowId={(row) => row.idVenta}
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
export default ShowAllVentas;
