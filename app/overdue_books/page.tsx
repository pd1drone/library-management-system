"use client";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';

import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { IconProp } from '@fortawesome/fontawesome-svg-core';


import "primereact/resources/primereact.min.css";  
import "primereact/resources/themes/viva-light/theme.css";


import { Button } from "primereact/button";
import 'primeicons/primeicons.css';

interface OverdueBooks {
    TransactionID: number;
    StudentID: number;
    StudentName: string;
    BookID: number;
    BookTitle: string;
    BorrowedDate: string;
    OverdueDate: string;
  }

export default function OverdueBookList() {

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [overdueBooks, setoverdueBooks] = useState<OverdueBooks[]>([
        { TransactionID: 1, StudentID: 1, StudentName: 'John Doe', BookID: 1, BookTitle: 'Book 1', BorrowedDate: '2023-01-01', OverdueDate: '2023-01-15' },
        { TransactionID: 2, StudentID: 2, StudentName: 'Jane Doe', BookID: 2, BookTitle: 'Book 2', BorrowedDate: '2023-02-01', OverdueDate: '2023-02-15' },
        { TransactionID: 3, StudentID: 3, StudentName: 'Bob Brown', BookID: 3, BookTitle: 'Book 3', BorrowedDate: '2023-03-01', OverdueDate: '2023-03-15' },
        { TransactionID: 4, StudentID: 4, StudentName: 'Alice Anderson', BookID: 4, BookTitle: 'Book 4', BorrowedDate: '2023-04-01', OverdueDate: '2023-04-15' },
        { TransactionID: 5, StudentID: 5, StudentName: 'Charlie Chaplin', BookID: 5, BookTitle: 'Book 5', BorrowedDate: '2023-05-01', OverdueDate: '2023-05-15' },
      ]);
    
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      });

    const onGlobalFilterChange = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
    };

    const initFilters = () => {
    setFilters({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    };

    const actionBodyTemplate = (rowData: any) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2 text-blue" 
                onClick={() => {
                  //editUser(rowData);
                  //setCreateUpdateHeader('Update User');
                  //confirmDeleteUser(rowData)
                }}/>
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => console.log("HELLO")} />
            </React.Fragment>
        );
    };

    useEffect(() => {
        initFilters();
    }, []);

    return (
      <div className="px-8 py-4">
        <h1 className="text-4xl font-black pt-4 text-red-900 tracking-[-0.5px] pb-2 ">
          Overdue Books
        </h1>
        
        <div className="grid grid-cols-4 p-5 mb-10 ">
            <button
                    className="p-2 uppercase rounded-md bg-blue-600 text-white font-medium hover:bg-blue-800 "
                    type="button"
                    //   onClick={handleLogin}
                    >
                    <FontAwesomeIcon icon={faBook as IconProp} className="mr-2" />
                    Add Overdue Book
            </button>
            <div></div>
            <div></div>
            <InputText className="p-2" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
        </div>

        <DataTable filters={filters} value={overdueBooks} size="small" removableSort stripedRows paginator rows={10} 
        rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="TransactionID" header="TransactionID" sortable></Column>
            <Column field="StudentID" header="StudentID" sortable></Column>
            <Column field="StudentName" header="StudentName" sortable></Column>
            <Column field="BookID" header="BookID" sortable></Column>
            <Column field="BookTitle" header="BookTitle" sortable></Column>
            <Column field="BorrowedDate" header="BorrowedDate" sortable></Column>
            <Column field="OverdueDate" header="OverdueDate" sortable></Column>
            <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
        </DataTable>
      </div>
  
    );
  }
  