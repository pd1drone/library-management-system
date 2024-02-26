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
import axios from 'axios';
import api_url from '../api_conf';

interface BorrowedBook {
    TransactionID: number;
    StudentID: number;
    StudentName: string;
    BookID: number;
    BookTitle: string;
    BorrowedDate: string;
    OverdueDate: string;
  }

export default function BorrowedBookList() {

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [borrowedBooks, setBorrowedBooks] = useState();
    
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

    useEffect(() => {
      var getbooks = async () => {
        await axios
          .get(api_url + "all_borrowed_books")
          .then((response) => setBorrowedBooks(response.data));
        return;
      };
  
      getbooks();
      initFilters();
    }, []);

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
          Borrowed Books
        </h1>
        
        <div className="grid grid-cols-4 p-5 mb-10 ">
            {/* <button
                    className="p-2 uppercase rounded-md bg-blue-600 text-white font-medium hover:bg-blue-800 "
                    type="button"
                    //   onClick={handleLogin}
                    >
                    <FontAwesomeIcon icon={faBook as IconProp} className="mr-2" />
                    Add Borrowed Book
            </button> */}
            <div></div>
            <div></div>
            <InputText className="p-2" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
        </div>

        <DataTable filters={filters} value={borrowedBooks} size="small" removableSort stripedRows paginator rows={10} 
        rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="TransactionID" header="TransactionID" sortable></Column>
            <Column field="StudentID" header="StudentID" sortable></Column>
            <Column field="Student.FullName" header="StudentName" sortable></Column>
            <Column field="BookID" header="BookID" sortable></Column>
            <Column field="Book.Title" header="BookTitle" sortable></Column>
            <Column field="BorrowedDate" header="BorrowedDate" sortable></Column>
            <Column field="OverdueDate" header="OverdueDate" sortable></Column>
        </DataTable>
      </div>
  
    );
  }
  