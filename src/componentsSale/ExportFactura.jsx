import React, {useState} from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button } from '@mui/material';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

const ExportFactura = ({ventaData}) => {
    const [datos, setDatos] = useState({
        numFactura: ventaData.idVenta,
        cliente: "Noelia Montiel",
        fecha: ventaData.fecha,
        cantidad: ventaData.cantidad,
        producto: ventaData.producto,
        metodoDePago: ventaData.metodoPago,
        total: ventaData.totalVenta,
    });
    console.log(ventaData)
   console.log(datos);
    const generarFactura = () =>{
        const doc = new jsPDF();
        
        //Encabezado de la factura
        doc.text(`Numero de factura: ${ventaData.idVenta}`, 10,25);
        doc.text(`Cliente: ${datos.cliente}`, 10, 35);
        doc.text(`Fecha: ${datos.fecha}`, 10, 45);
        // Tabla factura
        const colums = ['Producto', 'Cantidad', 'Metodo de pado', 'estado', 'Total']
        const data = [
            [`${ventaData.producto}`, `${ventaData.cantidad}`, `${ventaData.metodoPago}`, `${ventaData.estado}`, `${ventaData.totalVenta}`]
        ];
        console.log(data);

        doc.autoTable({
            startY: 70,
            head: [colums],
            body: data
        });

       
        //Guardo el pdf
        doc.save(`Factua_${datos.numFactura}.pdf`);
    };

    return (
        <>
            <Button color='success' onClick={generarFactura}>Exportar</Button>
        </>
    );
}

export default ExportFactura;