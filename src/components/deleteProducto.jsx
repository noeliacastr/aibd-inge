import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {deleteProducto} from '../api/producto'
import 'materialize-css/dist/css/materialize.min.css'
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";



const DeleteProducto = (pro) => {
    const [id, setId] = useState(pro.pro)
    const queryClient = useQueryClient();
    const deleteProduct = useMutation({
        mutationFn: deleteProducto,
        onSuccess: () => {
              queryClient.invalidateQueries("products");
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
                deleteProduct.mutate(id)
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
export default DeleteProducto;