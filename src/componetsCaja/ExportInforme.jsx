import React, {useState} from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button } from '@mui/material';
import { de } from 'date-fns/locale';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

const ExportReport = ({}) => {

    return (
        <>
            <button
                type="button"
                className="round-button"
                
                >
                <ArrowCircleDownIcon className="delete-icon" />
            </button>
        </>
    );
}
export default ExportReport;