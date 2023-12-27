"use client";
import { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const currentPage = usePathname();
  console.log(currentPage);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // Check if the current page is "/login"
  const isLoginPage = currentPage === "/login";

  // If on the login page, don't render Sidebar and Navbar
  if (isLoginPage) {
    return null;
  }

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
    </>
  );
};

export default Navigation;
