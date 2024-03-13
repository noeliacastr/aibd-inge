import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductos, deleteProducto } from "../api/producto";
import Navbar from "./Navbar";
import 'materialize-css/dist/css/materialize.min.css'
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

import CreateProducto from "./CreateProducto";
import EditProduct from "./EditProduct";
import Swal from "sweetalert2";
import DeleteProducto from "./deleteProducto";


const ShowAllProducts = () => {
  const {
    isLoading,
    data: productos,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProductos,
  });
  const queryClient = useQueryClient();

  const row = productos
    ? productos.map((cls) => ({ ...cls, id: cls.id }))
    : [];
  const columns = [
    { field: "id", headerName: "Codigo Producto", width: 100 },
    { field: "nombreProducto", headerName: "Nombre Producto", width: 130 },
    { field: "stock", headerName: "Stock", width: 130 },
    { field: "precio", headerName: "Precio", width: 130 },
    { field: "descripcion", headerName: "Descripcion", width: 100 },
    {
      field: "action",
      headerName: "Acción",
      width: 90,
      className:"round-button",
      renderCell: (params) => (
        
       <DeleteProducto pro = {params.row.id}/>
        
      ),
    },
    {
      field: "Action",
      headerName: "Acción",
      width: 90,
      className:"round-button",
      renderCell: (params) => (
        
        <>
        <EditProduct pro={params.row}/>
        
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
          getRowId={(row) => row.id}
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
export default ShowAllProducts;
