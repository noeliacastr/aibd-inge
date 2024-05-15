import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {deleteVenta} from '../api/venta'
import 'materialize-css/dist/css/materialize.min.css'
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";



const DeleteVenta = (vent) => {
    const [idVenta, setIdVenta] = useState(vent.vent)
    const queryClient = useQueryClient();
    const deleteVentas = useMutation({
        mutationFn: deleteVenta,
        onSuccess: () => {
              queryClient.invalidateQueries("ventas");
        },
      });
      const handleConfirm = () => {
        Swal.fire({
            title: "¿Seguro al eliminar la factura?",
            text: "No se podran revertir los cambios",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar factura"
          }).then((result) => {
            if (result.isConfirmed) {
                deleteVentas.mutate(idVenta)
                Swal.fire({
                    title: "Factura eliminado",
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
export default DeleteVenta;