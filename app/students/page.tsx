"use client";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';

import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { IconProp } from '@fortawesome/fontawesome-svg-core';


import "primereact/resources/primereact.min.css";  
import "primereact/resources/themes/viva-light/theme.css";


import { Button } from "primereact/button";
import 'primeicons/primeicons.css';

interface Student {
    StudentID: number;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    DateOfBirth: string;
    Gender: string;
    Address: string;
    Email: string;
    PhoneNumber: string;
    RegistrationDate: string;
    LibraryCardNumber: string;
  }
export default function StudentList() {

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [students, setStudents] = useState<Student[]>([
        { 
          StudentID: 1, 
          FirstName: 'John', 
          MiddleName: 'Doe', 
          LastName: 'Smith', 
          DateOfBirth: '1990-01-01', 
          Gender: 'Male', 
          Address: '123 Main St', 
          Email: 'john.doe@example.com', 
          PhoneNumber: '123-456-7890', 
          RegistrationDate: '2023-01-01', 
          LibraryCardNumber: 'LCN123456' 
        },
        { 
          StudentID: 2, 
          FirstName: 'Jane', 
          MiddleName: 'Doe', 
          LastName: 'Johnson', 
          DateOfBirth: '1992-02-02', 
          Gender: 'Female', 
          Address: '456 Oak St', 
          Email: 'jane.doe@example.com', 
          PhoneNumber: '987-654-3210', 
          RegistrationDate: '2023-02-01', 
          LibraryCardNumber: 'LCN654321' 
        },
        // Add more fake data as needed
        { 
          StudentID: 3, 
          FirstName: 'Bob', 
          MiddleName: 'Doe', 
          LastName: 'Brown', 
          DateOfBirth: '1995-03-03', 
          Gender: 'Male', 
          Address: '789 Elm St', 
          Email: 'bob.brown@example.com', 
          PhoneNumber: '456-789-0123', 
          RegistrationDate: '2023-03-01', 
          LibraryCardNumber: 'LCN789012' 
        },
        { 
          StudentID: 4, 
          FirstName: 'Alice', 
          MiddleName: 'Doe', 
          LastName: 'Anderson', 
          DateOfBirth: '1998-04-04', 
          Gender: 'Female', 
          Address: '101 Pine St', 
          Email: 'alice.anderson@example.com', 
          PhoneNumber: '789-012-3456', 
          RegistrationDate: '2023-04-01', 
          LibraryCardNumber: 'LCN012345' 
        },
        { 
          StudentID: 5, 
          FirstName: 'Charlie', 
          MiddleName: 'Doe', 
          LastName: 'Chaplin', 
          DateOfBirth: '2000-05-05', 
          Gender: 'Male', 
          Address: '202 Cedar St', 
          Email: 'charlie.chaplin@example.com', 
          PhoneNumber: '012-345-6789', 
          RegistrationDate: '2023-05-01', 
          LibraryCardNumber: 'LCN345678' 
        },
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
          Students
        </h1>
        
        <div className="grid grid-cols-4 p-5 mb-10 ">
            <button
                    className="p-2 uppercase rounded-md bg-blue-600 text-white font-medium hover:bg-blue-800 "
                    type="button"
                    //   onClick={handleLogin}
                    >
                    <FontAwesomeIcon icon={faPeopleGroup as IconProp} className="mr-2" />
                    Add Student
            </button>
            <div></div>
            <div></div>
            <InputText className="p-2" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
        </div>

        <DataTable filters={filters} value={students} size="small" removableSort stripedRows paginator rows={10} 
        rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="StudentID" header="StudentID" sortable></Column>
            <Column field="FirstName" header="FirstName" sortable></Column>
            <Column field="MiddleName" header="MiddleName" sortable></Column>
            <Column field="LastName" header="LastName" sortable></Column>
            <Column field="DateOfBirth" header="DateOfBirth" sortable></Column>
            <Column field="Gender" header="Gender" sortable></Column>
            <Column field="Address" header="Address" sortable></Column>
            <Column field="Email" header="Email" sortable></Column>
            <Column field="PhoneNumber" header="PhoneNumber" sortable></Column>
            <Column field="RegistrationDate" header="RegistrationDate" sortable></Column>
            <Column field="LibraryCardNumber" header="LibraryCardNumber" sortable></Column>
            <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
        </DataTable>
      </div>
  
    );
  }
  