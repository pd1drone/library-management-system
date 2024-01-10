"use client";
import Image from "next/image";
import axios from 'axios';
import md5 from 'crypto-js/md5';
import api_url from "../api_conf";
import React, { useEffect, useState } from 'react';


export default function page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Hash the password using MD5
    const hashedPassword = md5(password).toString();

    const response = await axios.post(api_url+'login', {
      username,
      password: hashedPassword,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { Success, Response: userData, message } = response.data;

    console.log(Success);
    console.log(userData);
    console.log(message);
    if (Success) {
      // Store user data in session storage
      // localStorage.setItem('ID', userData.ID);
      // localStorage.setItem('Username', userData.Username);
      // localStorage.setItem('fullName', userData.FullName);
      // localStorage.setItem('isAdmin', userData.IsAdmin);
      // Redirect to /dashboard (you can add this once you have the navigate component)
      window.location.href = '/dashboard';
      
    } else {
      // Handle unsuccessful login by displaying the error message
      setLoginError(message || 'An error occurred during login.');
      setTimeout(() => {
        setLoginError(null);
      }, 3000); // 3000 milliseconds = 3 second
    }

  };

  return (
    <main className="h-screen">
      <Image
        className="absolute -z-20"
        src={"/images/background_library.png"}
        fill={true}
        objectFit="cover"
        alt="bg-login"
      />
      <div className="flex flex-col md:flex-row items-center justify-center gap-36 h-screen">
        <div className="w-full max-w-sm ">
          <div className="aspect-square w-full max-w-[100px] md:max-w-[100px] relative m-auto mb-5">
            <Image src={"/images/LOA.png"} fill={true} alt="SjLogo" />
          </div>

          <div className="mb-5 text-center">
            <h1 className="font-bold text-3xl text-black">
              Library Management System
            </h1>
          </div>

          <div>
            <form onSubmit={(e) => handleLogin(e)} className="flex flex-col gap-4">
                {loginError && (
                <div role="alert" className="login-error">
                    <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Error:
                    </div>
                    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p className="error-message">{loginError}</p>
                    </div>
                </div>
                )}
                <input
                className="px-2 py-2 rounded-md"
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                className="px-2 py-2 rounded-md"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="uppercase px-2 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-800"
                  type="submit"
                >
                  Sign In
                </button>
            </form>
            </div>

        </div>
      </div>
    </main>
  );
}
