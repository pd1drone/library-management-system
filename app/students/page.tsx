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

import {
  faPlusSquare,
  faFileExcel,
  faAdd,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";


import { Button } from "primereact/button";
import 'primeicons/primeicons.css';
import axios from 'axios';
import api_url from '../api_conf';
import { Dialog } from 'primereact/dialog';
import { Toast } from "primereact/toast";

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
    const [students, setStudents] = useState();
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      });


    
      const [UserError, setUserError] = useState<string | null>(null);
      const [CreateUpdateHeader, setCreateUpdateHeader] = useState("");
      const [individualBooks, setIndividualbooks] =
      useState<Student | null>(null);

      const [deleteBookDialog, setDeleteBookDialog] = useState(false);

      const [visible, setVisible] = useState(false);

      
      const [UpdateformData, setUpdateFormData] = useState({
        StudentID: 0,
        FirstName: "",
        MiddleName: "",
        LastName: "",
        DateOfBirth: "",
        Gender: "",
        Address: "",
        Email: "",
        PhoneNumber: "",
        RegistrationDate: "",
        LibraryCardNumber: "",
      });

      const resetUpdateForm = () => {
        setUpdateFormData({
          StudentID: 0,
          FirstName: "",
          MiddleName: "",
          LastName: "",
          DateOfBirth: "",
          Gender: "",
          Address: "",
          Email: "",
          PhoneNumber: "",
          RegistrationDate: "",
          LibraryCardNumber: "",
        });
        setSelectedOption("");
      };

      const handleInputChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        console.log(name, value); // Check the values of name and value
        setUpdateFormData({
          ...UpdateformData,
          [name]: value,
        });
      };

      const [selectedOption, setSelectedOption] = useState<string>("");
      const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
      };
      
    const toast = useRef<Toast>(null);

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
      var getstudents = async () => {
        await axios
          .get(api_url + "students")
          .then((response) => setStudents(response.data));
        return;
      };
  
      getstudents();
      initFilters();
    }, []);

    const confirmDeleteBook = (idvBook: any) => {
      setIndividualbooks(idvBook);
      console.log(idvBook);
      setDeleteBookDialog(true);
    };

    const hideDeleteUserDialog = () => {
      setDeleteBookDialog(false);
    };


    
    const showSuccessFul = () => {
      toast.current!.show({
        severity: "success",
        summary: "Success",
        detail: "Message Content",
        life: 3000,
      });
    };

    
  const footerContent = (
    <div className="flex flex-col items-center justify-center">
      <button
        type="button"
        className="py-2 px-10 rounded-lg bg-red-800 rounded-lg"
        style={{ color: "white" }}
        onClick={CreateStudentAPI}
      >
        <FontAwesomeIcon icon={faAdd as IconProp} className="mr-2" />
        Submit
      </button>
    </div>
  );

  
  async function CreateStudentAPI() {
    if (CreateUpdateHeader == "Create Student") {
      await axios
        .post(
          api_url + "students",
          {
            FirstName: UpdateformData.FirstName,
            MiddleName: UpdateformData.MiddleName,
            LastName: UpdateformData.LastName,
            DateOfBirth:UpdateformData.DateOfBirth,
            Gender: selectedOption,
            Address: UpdateformData.Address,
            Email: UpdateformData.Email,
            PhoneNumber: UpdateformData.PhoneNumber,
            RegistrationDate: UpdateformData.RegistrationDate,
            LibraryCardNumber: UpdateformData.LibraryCardNumber,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(async (response) => {
          if (response.data.Success) {
            setVisible(false);
            resetUpdateForm();
            showSuccessFul();
            await axios
              .get(api_url + "students")
              .then((response) => setStudents(response.data));
          } else {
            setUserError(response.data.Message || "An error occurred");
            setTimeout(() => {
              setUserError(null);
            }, 3000); // 3000 milliseconds = 3 second
          }
        });
    } else {
      await axios
        .put(
          api_url + "students",
          {
            StudentID: UpdateformData.StudentID,
            FirstName: UpdateformData.FirstName,
            MiddleName: UpdateformData.MiddleName,
            LastName: UpdateformData.LastName,
            DateOfBirth:UpdateformData.DateOfBirth,
            Gender: selectedOption,
            Address: UpdateformData.Address,
            Email: UpdateformData.Email,
            PhoneNumber: UpdateformData.PhoneNumber,
            RegistrationDate: UpdateformData.RegistrationDate,
            LibraryCardNumber: UpdateformData.LibraryCardNumber,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(async (response) => {
          if (response.data.Success) {
            setVisible(false);
            resetUpdateForm();
            showSuccessFul();
            await axios
              .get(api_url + "students")
              .then((response) => setStudents(response.data));
          } else {
            setUserError(response.data.Message || "An error occurred");
            setTimeout(() => {
              setUserError(null);
            }, 3000); // 3000 milliseconds = 3 second
          }
        });
    }
  }

  const editStudent = (individualBooks: any) => {
    setIndividualbooks({ ...individualBooks });
    console.log(individualBooks);
    setVisible(true);
    setUpdateFormData({
      StudentID: individualBooks.StudentID,
      FirstName: individualBooks.FirstName,
      MiddleName: individualBooks.MiddleName,
      LastName: individualBooks.LastName,
      DateOfBirth:individualBooks.DateOfBirth,
      Gender: individualBooks.Gender,
      Address: individualBooks.Address,
      Email: individualBooks.Email,
      PhoneNumber: individualBooks.PhoneNumber,
      RegistrationDate: individualBooks.RegistrationDate,
      LibraryCardNumber: individualBooks.LibraryCardNumber,
    });
    setSelectedOption(individualBooks.Gender);

    console.log(individualBooks.StudentID);
  };
    


    const actionBodyTemplate = (rowData: any) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2 text-blue" 
                onClick={() => {
                  editStudent(rowData);
                  setCreateUpdateHeader('Update Student');
                  //confirmDeleteUser(rowData)
                }}/>
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() =>  confirmDeleteBook(rowData)} />
            </React.Fragment>
        );
    };

    const DeleteStudentApi = () => {
      var stdID = individualBooks!.StudentID;
      axios
        .delete(api_url + "students", {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            StudentID: stdID,
          },
        })
        .then(async (response) => {
          if (response.data.Success) {
            await axios
              .get(api_url + "students")
              .then((response) => setStudents(response.data));
            setDeleteBookDialog(false);
            setVisible(false);
            showSuccessFul();
          }
        });
    };

    const deleteBookFooter = (
      <React.Fragment>
        <Button
          label="No"
          icon="pi pi-times"
          outlined
          onClick={hideDeleteUserDialog}
          className='text-blue-900 pr-3'
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          severity="danger"
          onClick={DeleteStudentApi}
          className='text-red-900'
        />
      </React.Fragment>
    );


    useEffect(() => {
        initFilters();
    }, []);

    return (
      <div className="px-8 py-4">
        <h1 className="text-4xl font-black pt-4 text-red-900 tracking-[-0.5px] pb-2 ">
          Students
        </h1>
        
        
      <Toast ref={toast} />
        <div className="grid grid-cols-4 p-5 mb-10 ">
            <button
                    className="p-2 uppercase rounded-md bg-blue-600 text-white font-medium hover:bg-blue-800 "
                    type="button"
                    onClick={() =>{
                      setVisible(true);
                      setCreateUpdateHeader("Create Student");
                    }}
                    >
                    <FontAwesomeIcon icon={faPeopleGroup as IconProp} className="mr-2" />
                    Add Student
            </button>
            <div></div>
            <div></div>
            <InputText className="p-2" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
        </div>

        <Dialog
        visible={deleteBookDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteBookFooter}
        onHide={hideDeleteUserDialog}
      >
      <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {students && (
            <span>Are you sure you want to archive this record ?</span>
          )}
        </div>
      </Dialog>

      <div className="card flex justify-content-center hidden">
          <Dialog
            header={CreateUpdateHeader}
            visible={visible}
            style={{ width: "60vw" }}
            onHide={() => {
              setVisible(false);
              resetUpdateForm();
            }}
            footer={footerContent}
            position="top"
          >
            {UserError && (
              <div role="alert" className="login-error">
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                  Error:
                </div>
                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                  <p className="error-message">{UserError}</p>
                </div>
              </div>
            )}
            <form className="flex flex-col my-4 gap-2">
              <input
                type="hidden"
                id="StudentID"
                value={UpdateformData.StudentID}
                onChange={handleInputChange}
              ></input>
              <div className="flex gap-4 pb-4">
                <div className="pb-2 flex flex-col grow">
                  <label htmlFor="FirstName" className="col-form-label">
                  FirstName:
                  </label>
                  <input
                    type="text"
                    className="p-2 mt-[-2px] rounded-md border-2 border-grey"
                    id="FirstName"
                    name="FirstName"
                    value={UpdateformData.FirstName}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="pb-2 flex flex-col grow">
                  <label htmlFor="MiddleName" className="col-form-label">
                  MiddleName:
                  </label>
                  <input
                    type="text"
                    className="p-2 mt-[-2px] rounded-md border-2 border-grey"
                    id="MiddleName"
                    name="MiddleName"
                    value={UpdateformData.MiddleName}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="pb-2 flex flex-col grow">
                  <label htmlFor="LastName" className="col-form-label">
                  LastName:
                  </label>
                  <input
                    type="text"
                    className="p-2 mt-[-2px] rounded-md border-2 border-grey"
                    id="LastName"
                    name="LastName"
                    value={UpdateformData.LastName}
                    onChange={handleInputChange}
                  ></input>
                </div>
              </div>
              <div className="flex gap-4 pb-4">
                <div className="pb-2 flex flex-col grow">
                  <label htmlFor="DateOfBirth" className="col-form-label">
                  Date Of Birth:
                  </label>
                  <input
                    type="text"
                    className="p-2 mt-[-2px] rounded-md border-2 border-grey"
                    id="DateOfBirth"
                    name="DateOfBirth"
                    value={UpdateformData.DateOfBirth}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className='pb-2 flex flex-col grow'>
                <label htmlFor="Gender" className="col-form-label">
                Gender:
                </label>
                <select
                  id="Gender"
                  className="p-2 mt-[-2px] rounded-md border-2 border-grey"
                  name="Gender"
                  value={selectedOption}
                  onChange={handleSelectChange}
                >
                  <option value=""></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                </div>
                <div className="pb-2 flex flex-col grow">
                  <label htmlFor="Email" className="col-form-label">
                  Email:
                  </label>
                  <input
                    type="text"
                    className="p-2 mt-[-2px] rounded-md border-2 border-grey"
                    id="Email"
                    name="Email"
                    value={UpdateformData.Email}
                    onChange={handleInputChange}
                  ></input>
                </div>
              </div>
              
              <div className="flex gap-4 pb-4">
              <div className="pb-2 flex flex-col grow">
                  <label htmlFor="Address" className="col-form-label">
                  Address:
                  </label>
                  <input
                    type="text"
                    className="p-2 mt-[-2px] rounded-md border-2 border-grey"
                    id="Address"
                    name="Address"
                    value={UpdateformData.Address}
                    onChange={handleInputChange}
                  ></input>
                </div>
              <div className="pb-2 flex flex-col grow">
              <label htmlFor="PhoneNumber" className="col-form-label">
              PhoneNumber:
                  </label>
                  <input
                    type="text"
                    className="p-2 mt-[-2px] rounded-md border-2 border-grey"
                    id="PhoneNumber"
                    name="PhoneNumber"
                    value={UpdateformData.PhoneNumber}
                    onChange={handleInputChange}
                  ></input>
                </div>
              </div>
                
              <div className="flex gap-4 pb-4">
              <div className="pb-2 flex flex-col grow">
                  <label htmlFor="RegistrationDate" className="col-form-label">
                  RegistrationDate:
                  </label>
                  <input
                    type="text"
                    className="p-2 mt-[-2px] rounded-md border-2 border-grey"
                    id="RegistrationDate"
                    name="RegistrationDate"
                    value={UpdateformData.RegistrationDate}
                    onChange={handleInputChange}
                  ></input>
                </div>
              <div className="pb-2 flex flex-col grow">
              <label htmlFor="LibraryCardNumber" className="col-form-label">
              LibraryCardNumber:
                  </label>
                  <input
                    type="text"
                    className="p-2 mt-[-2px] rounded-md border-2 border-grey"
                    id="LibraryCardNumber"
                    name="LibraryCardNumber"
                    value={UpdateformData.LibraryCardNumber}
                    onChange={handleInputChange}
                  ></input>
                </div>
              </div>
              
              
            </form>
          </Dialog>
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
  