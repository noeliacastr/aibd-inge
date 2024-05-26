import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {deleteProduct} from '../../api/product';
import 'materialize-css/dist/css/materialize.min.css'
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";



const DeleteProduct = (prod) => {
    const [idProducto, setIdProducto] = useState(prod.prod)
    const queryClient = useQueryClient();
    const deleteProducts = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
              queryClient.invalidateQueries("productos");
        },
      });
      const handleConfirm = () => {
        Swal.fire({
            title: "¿Seguro al eliminar el producto?",
            text: "No se podran revertir los cambios",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar producto"
          }).then((result) => {
            if (result.isConfirmed) {
                deleteProducts.mutate(idProducto)
                Swal.fire({
                    title: "Producto eliminado",
                    text: "Los datos han sido eliminados",
                    icon: "success"
                  });
            }else{
              result.dismiss === Swal.DismissReason.cancel
            }
          })
      }
      return (
        <button
          type="button"
          className="round-button"
          onClick={handleConfirm}
        >
          
          <DeleteIcon className="delete-icon" />
        </button>
        
      );
};
export default DeleteProduct;