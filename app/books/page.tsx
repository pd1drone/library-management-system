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

interface Book {
    BookID: number;
    BookShelveAddress: string;
    Title: string;
    Author: string;
    ISBN: string;
    Genre: string;
    PublicationDate: string;
    Publisher: string;
    Description: string;
  }

export default function BookList() {

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [books, setBooks] = useState<Book[]>([
        { BookID: 1, Title: 'Book 1',BookShelveAddress:"1-1", Author: 'Author 1', ISBN: '1234567890', Genre: 'Fiction', PublicationDate: '2023-01-01', Publisher: 'Publisher 1', Description: 'Description 1' },
        { BookID: 2, Title: 'Book 2',BookShelveAddress:"1-2", Author: 'Author 2', ISBN: '2345678901', Genre: 'Non-Fiction', PublicationDate: '2023-02-01', Publisher: 'Publisher 2', Description: 'Description 2' },
        // Add more fake data as needed
        { BookID: 3, Title: 'Book 3',BookShelveAddress:"1-3", Author: 'Author 3', ISBN: '3456789012', Genre: 'Mystery', PublicationDate: '2023-03-01', Publisher: 'Publisher 3', Description: 'Description 3' },
        { BookID: 4, Title: 'Book 4',BookShelveAddress:"1-4", Author: 'Author 4', ISBN: '4567890123', Genre: 'Science Fiction', PublicationDate: '2023-04-01', Publisher: 'Publisher 4', Description: 'Description 4' },
        { BookID: 5, Title: 'Book 5',BookShelveAddress:"1-5", Author: 'Author 5', ISBN: '5678901234', Genre: 'History', PublicationDate: '2023-05-01', Publisher: 'Publisher 5', Description: 'Description 5' },
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
          Books
        </h1>
        
        <div className="grid grid-cols-4 p-5 mb-10 ">
            <button
                    className="p-2 uppercase rounded-md bg-blue-600 text-white font-medium hover:bg-blue-800 "
                    type="button"
                    //   onClick={handleLogin}
                    >
                    <FontAwesomeIcon icon={faBook as IconProp} className="mr-2" />
                    Add Book
            </button>
            <div></div>
            <div></div>
            <InputText className="p-2" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
        </div>

        <DataTable filters={filters} value={books} size="small" removableSort stripedRows paginator rows={10} 
        rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="BookID" header="BookID" sortable></Column>
            <Column field="BookShelveAddress" header="Book Shelve Address" sortable></Column>
            <Column field="Title" header="Title" sortable></Column>
            <Column field="Author" header="Author" sortable></Column>
            <Column field="ISBN" header="ISBN" sortable></Column>
            <Column field="Genre" header="Genre" sortable></Column>
            <Column field="PublicationDate" header="PublicationDate" sortable></Column>
            <Column field="Publisher" header="Publisher" sortable></Column>
            <Column field="Description" header="Description" sortable></Column>
            <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
        </DataTable>
      </div>
  
    );
  }
  