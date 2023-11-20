import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {deleteEmployee} from '../api/empleado'
import 'materialize-css/dist/css/materialize.min.css'
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";



const DeleteEmpleado = (emp) => {
    const [cedula, setCedula] = useState(emp.emp)
    const queryClient = useQueryClient();
    const deleteEmployees = useMutation({
        mutationFn: deleteEmployee,
        onSuccess: () => {
              queryClient.invalidateQueries("employees");
        },
      });
      const handleConfirm = () => {
        Swal.fire({
            title: "¿Seguro al eliminar el empleado?",
            text: "No se podran revertir los cambios",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar empleado"
          }).then((result) => {
            if (result.isConfirmed) {
                deleteEmployees.mutate(cedula)
                Swal.fire({
                    title: "Empleado eliminado",
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
export default DeleteEmpleado;