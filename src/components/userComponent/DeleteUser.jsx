import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from '../../api/usuario'
import 'materialize-css/dist/css/materialize.min.css'
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

const DeleteUser = (user) => {
    const [id, setId] = useState(user.user)
    const queryClient = useQueryClient();
    const deleteUsuario = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries("users");
        },
    });
    const handleConfirm = () => {
        Swal.fire({
            title: "¿Seguro al eliminar el usuario?",
            text: "No se podran revertir los cambios",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar usuario"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUsuario.mutate(id)
                Swal.fire({
                    title: "Usuario eliminado",
                    text: "Los datos han sido eliminados",
                    icon: "success"
                });
            } else {
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
}
export default DeleteUser;