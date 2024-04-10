import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getInformes } from "../api/caja"
import 'materialize-css/dist/css/materialize.min.css'
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";
import OpenCash from "./AbrirCaja";
import CloseCash from "./CierreCaja"
import ExportReport from "./ExportInforme";
import Navbar from "../components/Navbar";

const ShowAllReports = () => {
    const {
        isLoading,
        data: informes,
        isError,
        error,
    } = useQuery({
        queryKey: ["informes"],
        queryFn: getInformes,
    });
    const queryClient = useQueryClient();


    const row = informes ? informes.map((cls) => ({ ...cls, id: cls.id })) : [];
    const colums = [
        { field: "id", headerName: "Id Informe", width: 120 },
        { field: "fecha_hora", headerName: "Fecha", width: 110 },
        { field: "hora", headerName: "Hora", width: 110 },
        { field: "operacion", headerName: "operacion", width: 100 },
        { field: "montoInicial", headerName: "montoInicial", width: 100 },
        { field: "montoFinal", headerName: "montoFinal", width: 100 },
        { field: "UsuarioEn", headerName: "Encargado", width: 100 },
        {
            field: "Actio",
            headerName: "Acción",
            width: 90,
            className: "round-button",
            renderCell: (params) => (
                <CloseCash caj = {params.row}/>
            ),
        },
        {
            field: "Action",
            headerName: "Acción",
            width: 90,
            className: "round-button",
            renderCell: (params) => (

                <>
                <ExportReport />
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
            <OpenCash />
            <Navbar />
            <div className="dataGridContainerSale">
                <DataGrid
                    rows={row}
                    columns={colums}
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

export default ShowAllReports;