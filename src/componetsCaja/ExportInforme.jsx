import React, {useState} from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button } from '@mui/material';
import { de } from 'date-fns/locale';

const ExportReport = ({}) => {

    return (
        <>
            <Button  variant="contained" color='success'>Exportar</Button>
        </>
    );
}
export default ExportReport;