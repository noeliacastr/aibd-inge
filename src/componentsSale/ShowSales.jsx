import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getVentas, deleteVenta } from "../api/venta";
import Navbar from "../components/Navbar";
import 'materialize-css/dist/css/materialize.min.css'
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import BackupIcon from '@mui/icons-material/Backup';
import { IconButton } from '@mui/material';

import CreateSale from "./CreateSale";
import EditSale from "./EditSale";
import Swal from "sweetalert2";
import DeleteSale from "./DeleteSale";

import ExportFactura from "./ExportFactura";


const ShowAllVentas = () => {
  const {
    isLoading,
    data: ventas,
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

  const row = ventas
    ? ventas.map((cls) => ({ ...cls, id: cls.idVenta }))
    : [];
  const columns = [
    { field: "idVenta", headerName: "Número Factura", width: 120 },
    { field: "fecha", headerName: "Fecha", width: 110 },
    { field: "cantidad", headerName: "Cantidad", width: 100 },
    { field: "estado", headerName: "Estado", width: 100 },
    { field: "productos", headerName: "Producto", width: 100,
      renderCell: (params) => (
        <>
        {`${params.row.productos.nombreProducto} - ${params.row.productos.id}`}
        </>
      ),
    },
    { field: "metodoPago", headerName: "Metodo de pago", width: 100 },
    { field: "totalVenta", headerName: "Total de Venta", width: 100 },
    {
      field: "action",
      headerName: "Acción",
      width: 60,
      className: "round-button",
      renderCell: (params) => (

        <DeleteSale vent={params.row.id} />

      ),
    },
    {
      field: "Acción",
      headerName: "Accion",
      width: 90,
      className: "round-button",
      renderCell: (params) => (
        <>
          <ExportFactura ventaData={params.row} />
        </>
      ),
    },
    {
      field: "Action",
      headerName: "Acción",
      width: 90,
      className: "round-button",
      renderCell: (params) => (

        <>
          <EditSale vent={params.row} />

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
