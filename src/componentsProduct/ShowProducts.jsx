import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, deleteProduct } from "../api/product";
import Navbar from "../components/Navbar";
import ButtonAppBar from "../components/Navbar2";
import 'materialize-css/dist/css/materialize.min.css'
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

import CreateProduct from "./CreateProduct";
import EditProducts from "./EditProducts";
import Swal from "sweetalert2";
import DeleteProduct from "./DeleteProduct";


const ShowAllProducts = () => {
  const {
    isLoading,
    data: productos,
    isError,
    error,
  } = useQuery({
    queryKey: ["productos"],
    queryFn: getProducts,
  });
  const queryClient = useQueryClient();
  const deleteProducts = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      const confirmDelete = () => {
        Swal.fire({
          title: "Producto eliminado",
          text: "Los datos han sido eliminados",
          icon: "success"
        });
        queryClient.invalidateQueries("productos");
      };
      Swal.fire({
        title: "¿Seguro al eliminar el producto?",
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

  const row = productos
    ? productos.map((cls) => ({ ...cls, idProducto: cls.idProducto }))
    : [];
  const columns = [
    { field: "idProducto", headerName: "Número Producto", width: 100 },
    { field: "nombreProducto", headerName: "Nombre Producto", width: 110 },
    { field: "descripcion", headerName: "Descripción", width: 100 },
    { field: "stock", headerName: "Stock", width: 100 },
    { field: "precio", headerName: "Precio", width: 100 },
    {
      field: "Action",
      headerName: "Modificar",
      width: 90,
      className:"round-button",
      renderCell: (params) => (
        
        <>
        <EditProducts prod={params.row}/>
        
        </>
      ),
    },
    {
      field: "action",
      headerName: "Eliminar",
      width: 90,
      className:"round-button",
      renderCell: (params) => (
        
       <DeleteProduct prod = {params.row.id}/>
        
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
      <ButtonAppBar/>
      <CreateProduct />
      <div className="dataGridContainerProduct">
        <DataGrid
          rows={row}
          columns={columns}
          getRowId={(row) => row.idProducto}
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
