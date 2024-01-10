
"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUser, faExchangeAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { ProgressSpinner } from 'primereact/progressspinner';


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if there is data in local storage
    const username = localStorage.getItem('Username');

    if (username === null) {
      // No data in local storage, handle as needed (e.g., redirect to login)
      router.push('/login');
    } else {
      // Data exists in local storage, you can use it if needed
      router.push('/dashboard');
    }
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ProgressSpinner style={{width: '350px', height: '350px'}} strokeWidth="8" animationDuration=".5s"/>
    </div>
  );
}
