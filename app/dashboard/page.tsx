
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUser, faExchangeAlt, faClock } from '@fortawesome/free-solid-svg-icons';


export default function Dashboard() {
  return (
    <main className="flex flex-col items-center pt-20">
      <div className='grid grid-cols-3 pt-5'>
        <div></div>
        <h1 className='flex items-center justify-center text-4xl font-bold pb-20 text-black'>DASHBOARD NAVIGATION</h1>
        <div></div>
      </div>

      <div className='grid grid-cols-9 pt-5'>
      <div></div>

      <div className='grid grid-cols-1'>
        <div className='justify-self-center'>
          <Link href="/books" className='text-center pb-6'>
            <FontAwesomeIcon 
            className='cursor-pointer hover:bg-red-400 rounded-3xl'
            icon={faBook}
            width={350}
            height={250}
            />
          </Link>
          <div className='text-center pt-10'>
            <h3 className='col-form-label text-2xl text-black pb-2'>Books</h3>
          </div>
        </div>
      </div>

      <div></div>

      <div className='grid grid-cols-1 '>
        <div className='justify-self-center'>
          <Link href="/students" className='text-center pb-6'>
          <FontAwesomeIcon 
            className='cursor-pointer hover:bg-red-400 rounded-3xl'
            icon={faUser}
            width={350}
            height={250}
            />
          </Link>
          <div className='text-center pt-10'>
            <h3 className='col-form-label text-2xl text-black pb-2'>Students</h3>
          </div>
        </div>
      </div>
      
      <div></div>

      <div className='grid grid-cols-1'>
        <div className='justify-self-center'>
          <Link href="/borrowed_books" className='text-center pb-6'>
            <FontAwesomeIcon 
            className='cursor-pointer hover:bg-red-400 rounded-3xl'
            icon={faExchangeAlt}
            width={350}
            height={250}
            />
          </Link>
          <div className='text-center pt-10'>
            <h3 className='col-form-label text-2xl text-black pb-2'>Borrowed Books</h3>
          </div>
        </div>
      </div>
      
      <div></div>

      <div className='grid grid-cols-1'>
        <div className='justify-self-center'>
          <Link href="/overdue_books" className='text-center pb-6'>
            <FontAwesomeIcon 
            className='cursor-pointer hover:bg-red-400 rounded-3xl'
            icon={faClock}
            width={350}
            height={250}
            />
          </Link>
          <div className='text-center pt-10'>
            <h3 className='col-form-label text-2xl text-black pb-2'>Overdue Books</h3>
          </div>
        </div>
      </div>

    </div>
    </main>
    
  );
}
