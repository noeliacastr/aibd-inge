import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/usuario";
import ButtonAppBar from "../layout/Navbar";
import 'materialize-css/dist/css/materialize.min.css'
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import DeleteUser from "./DeleteUser";
import ShowDetailUser from "./ShowDetailsUser"

const ShowAllUsers = () => {
    const {
        isLoading,
        data: users,
        isError,
        error,
    } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });
    const row = users ? users.map((cls) => ({ ...cls, id: cls.id })) : [];
    const columns = [
        { field: "id", headerName: "ID de usuario", width: 100 },
        { field: "nombreUsuario", headerName: "Nombre de Usuario", width: 130 },
        {
            field: "empleado", headerName: "Empleado", width: 135,
            renderCell: (params) => (
                <>
                    {`${params.row.empleado.nombre} - ${params.row.empleado.cedula}`}
                </>
            ),
        },
        {
            field: "Action", headerName: "Eliminar", width: 90,
            className: "round-button",
            renderCell: (params) => (
                <DeleteUser user={params.row.id} />
            ),
        },
        {
            field: "show",
            headerName: "Detalles",
            width: 80,
            className: "round-button",
            renderCell: (params) => (
                <>
                <ShowDetailUser user = {params.row} />
                </>
            ),
        }
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
            <div>
                <div className=" bottonAgregarEm border w-full h-40 flex items-center justify-center">
                    <a href="#_" className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">Usuarios</span>
                        <span className="relative invisible">Usuarios</span>
                    </a>
                </div>
            </div>
            <div className="dataGridContainerEmple">
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
}
export default ShowAllUsers;