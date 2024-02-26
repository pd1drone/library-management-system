"use client";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';

import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import {
  faPlusSquare,
  faFileExcel,
  faAdd,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

import "primereact/resources/primereact.min.css";  
import "primereact/resources/themes/viva-light/theme.css";


import { Button } from "primereact/button";
import 'primeicons/primeicons.css';

import axios from 'axios';
import api_url from '../api_conf';
import { Dialog } from 'primereact/dialog';
import { Toast } from "primereact/toast";

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
    const [books, setBooks] = useState();
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      });


      const [UserError, setUserError] = useState<string | null>(null);
      const [CreateUpdateHeader, setCreateUpdateHeader] = useState("");
      const [individualBooks, setIndividualbooks] =
      useState<Book | null>(null);

      const [deleteBookDialog, setDeleteBookDialog] = useState(false);

      const [visible, setVisible] = useState(false);

      
      const [UpdateformData, setUpdateFormData] = useState({
        BookID: 0,
        BookShelveAddress: "",
        Title: "",
        Author: "",
        ISBN: "",
        Genre: "",
        PublicationDate: "",
        Publisher: "",
        Description: ""
      });

      const resetUpdateForm = () => {
        setUpdateFormData({
          BookID: 0,
          BookShelveAddress: "",
          Title: "",
          Author: "",
          ISBN: "",
          Genre: "",
          PublicationDate: "",
          Publisher: "",
          Description: ""
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
      var getbooks = async () => {
        await axios
          .get(api_url + "books")
          .then((response) => setBooks(response.data));
        return;
      };
  
      getbooks();
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
        onClick={CreateBookAPI}
      >
        <FontAwesomeIcon icon={faAdd as IconProp} className="mr-2" />
        Submit
      </button>
    </div>
  );

  async function CreateBookAPI() {
    if (CreateUpdateHeader == "Create Book") {
      await axios
        .post(
          api_url + "books",
          {
            BookShelveAddress: selectedOption,
            Title: UpdateformData.Title,
            Author: UpdateformData.Author,
            ISBN: UpdateformData.ISBN,
            Genre: UpdateformData.Genre,
            PublicationDate: UpdateformData.PublicationDate,
            Publisher: UpdateformData.Publisher,
            Description: UpdateformData.Description,
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
              .get(api_url + "books")
              .then((response) => setBooks(response.data));
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
          api_url + "books",
          {
            BookID: UpdateformData.BookID,
            BookShelveAddress: selectedOption,
            Title: UpdateformData.Title,
            Author: UpdateformData.Author,
            ISBN: UpdateformData.ISBN,
            Genre: UpdateformData.Genre,
            PublicationDate: UpdateformData.PublicationDate,
            Publisher: UpdateformData.Publisher,
            Description: UpdateformData.Description,
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
              .get(api_url + "books")
              .then((response) => setBooks(response.data));
          } else {
            setUserError(response.data.Message || "An error occurred");
            setTimeout(() => {
              setUserError(null);
            }, 3000); // 3000 milliseconds = 3 second
          }
        });
    }
  }

  const editBook = (individualBooks: any) => {
    setIndividualbooks({ ...individualBooks });
    console.log(individualBooks);
    setVisible(true);
    setUpdateFormData({
      BookID: individualBooks.BookID,
      BookShelveAddress: individualBooks.BookShelveAddress,
      Title: individualBooks.Title,
      Author: individualBooks.Author,
      ISBN:individualBooks.ISBN,
      Genre: individualBooks.Genre,
      PublicationDate:individualBooks.PublicationDate,
      Publisher: individualBooks.Publisher,
      Description: individualBooks.Description,
    });
    setSelectedOption(individualBooks.BookShelveAddress);

    console.log(individualBooks.BookID);
  };
    
    const actionBodyTemplate = (rowData: any) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2 text-blue" 
                onClick={() => {
                  editBook(rowData);
                  setCreateUpdateHeader('Update Book');
                  //confirmDeleteBook(rowData)
                }}/>
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteBook(rowData)} />
            </React.Fragment>
        );
    };

    const DeleteBookApi = () => {
      var bookid = individualBooks!.BookID;
      axios
        .delete(api_url + "books", {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            BookID: bookid,
          },
        })
        .then(async (response) => {
          if (response.data.Success) {
            await axios
              .get(api_url + "books")
              .then((response) => setBooks(response.data));
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
          onClick={DeleteBookApi}
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
          Books
        </h1>
        
      <Toast ref={toast} />
        <div className="grid grid-cols-4 p-5 mb-10 ">
            <button
                    className="p-2 uppercase rounded-md bg-blue-600 text-white font-medium hover:bg-blue-800 "
                    type="button"
                       onClick={() =>{
                        setVisible(true);
                        setCreateUpdateHeader("Create Book");
                      }}
                    >
                    <FontAwesomeIcon icon={faBook as IconProp} className="mr-2" />
                    Add Book
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
          {books && (
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
                id="BookID"
                value={UpdateformData.BookID}
                onChange={handleInputChange}
              ></input>
              <div className="flex gap-4 pb-4">
                <div className="pb-2 flex flex-col grow">
                  <label htmlFor="Title" className="col-form-label">
                    Title:
                  </label>
                  <input
                    type="text"
                    className="p-2 mt-[-2px] rounded-md border-2 border-grey"
                    id="Title"
                    name="Title"
                    value={UpdateformData.Title}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="pb-2 flex flex-col grow">
                  <label htmlFor="Author" className="col-form-label">
                  Author:
                  </label>
                  <input
                    type="text"
                    className="p-2 mt-[-2px] rounded-md border-2 border-grey"
                    id="Author"
                    name="Author"
                    value={UpdateformData.Author}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="pb-2 flex flex-col grow">
                  <label htmlFor="ISBN" className="col-form-label">
                  ISBN:
                  </label>
                  <input
                    type="text"
                    className="p-2 mt-[-2px] rounded-md border-2 border-grey"
                    id="ISBN"
                    name="ISBN"
                    value={UpdateformData.ISBN}
                    onChange={handleInputChange}
                  ></input>
                </div>
              </div>
              <div className="flex gap-4 pb-4">
                <div className="pb-2 flex flex-col grow">
                  <label htmlFor="Genre" className="col-form-label">
                  Genre:
                  </label>
                  <input
                    type="text"
                    className="p-2 mt-[-2px] rounded-md border-2 border-grey"
                    id="Genre"
                    name="Genre"
                    value={UpdateformData.Genre}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="pb-2 flex flex-col grow">
                  <label htmlFor="Publisher" className="col-form-label">
                  Publisher:
                  </label>
                  <input
                    type="text"
                    className="p-2 mt-[-2px] rounded-md border-2 border-grey"
                    id="Publisher"
                    name="Publisher"
                    value={UpdateformData.Publisher}
                    onChange={handleInputChange}
                  ></input>
                </div>
              </div>
              
              <div className="flex gap-4 pb-4">
              <div className="pb-2 flex flex-col grow">
                  <label htmlFor="PublicationDate" className="col-form-label">
                  Publication Date:
                  </label>
                  <input
                    type="text"
                    className="p-2 mt-[-2px] rounded-md border-2 border-grey"
                    id="PublicationDate"
                    name="PublicationDate"
                    value={UpdateformData.PublicationDate}
                    onChange={handleInputChange}
                  ></input>
                </div>
              <div className="pb-2 flex flex-col grow">
                <label htmlFor="BookShelveAddress" className="col-form-label">
                 Book Shelve Address:
                </label>
                <select
                  id="BookShelveAddress"
                  className="p-2 mt-[-2px] rounded-md border-2 border-grey"
                  name="BookShelveAddress"
                  value={selectedOption}
                  onChange={handleSelectChange}
                >
                  <option value=""></option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="A3">A3</option>
                  <option value="A4">A4</option>
                  <option value="A5">A5</option>
                  <option value="A6">A6</option>
                  <option value="A7">A7</option>
                  <option value="A8">A8</option>
                  <option value="A9">A9</option>
                  <option value="A10">A10</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="B3">B3</option>
                  <option value="B4">B4</option>
                  <option value="B5">B5</option>
                  <option value="B6">B6</option>
                  <option value="B7">B7</option>
                  <option value="B8">B8</option>
                  <option value="B9">B9</option>
                  <option value="B10">B10</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                  <option value="C3">C3</option>
                  <option value="C4">C4</option>
                  <option value="C5">C5</option>
                  <option value="C6">C6</option>
                  <option value="C7">C7</option>
                  <option value="C8">C8</option>
                  <option value="C9">C9</option>
                  <option value="C10">C10</option>
                </select>
                </div>
              </div>
              <div className="pb-2 flex flex-col grow">
              <label htmlFor="Description" className="col-form-label">
                  Description:
                  </label>
                  <input
                    type="text"
                    className="p-2 mt-[-2px] rounded-md border-2 border-grey"
                    id="Description"
                    name="Description"
                    value={UpdateformData.Description}
                    onChange={handleInputChange}
                  ></input>
              </div>
            </form>
          </Dialog>
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
  