import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getVentas } from "../api/venta";
import Navbar from "../components/Navbar";
import 'materialize-css/dist/css/materialize.min.css'
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import ExportFactura from "../components/ExportFactura"

import Swal from "sweetalert2";

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


    const row = ventas
    ? ventas.map((cls) => ({ ...cls, id: cls.idVenta }))
    : [];
  const columns = [
    { field: "idVenta", headerName: "Número Venta", width: 120 },
    { field: "fecha", headerName: "Fecha", width: 110 },
    { field: "cantidad", headerName: "Cantidad", width: 100 },
    { field: "metodoPago", headerName: "Metodo de pago", width: 100 },
    { field: "estado", headerName: "Estado", width: 100 },
    { field: "totalVenta", headerName: "Total de Venta", width: 100 },
    { field: "producto", headerName: "Producto", width: 100 },
    {
        field: "Exportar Factura",
        headerName: "Exportar Factura",
        width: 90,
        className:"round-button",
        renderCell: (params) => (
          <>
          <ExportFactura ventaData={params.row}/>
          </>
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
      <Navbar />
      <div className="dataGridContainerProduct">
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
