import React from 'react';
import 'jspdf-autotable';
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